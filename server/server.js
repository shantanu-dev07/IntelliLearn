import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import pg from "pg";

dotenv.config();

const { Pool } = pg;
const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: "1mb" }));

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from server/.env");
}

if (!process.env.AUTH_TOKEN_SECRET ||
    process.env.AUTH_TOKEN_SECRET.length < 32) {
  throw new Error(
    "Set a strong AUTH_TOKEN_SECRET in server/.env (at least 32 characters)."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET;

// Verify a student's signed authentication token.
function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Please log in to continue.",
    });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, TOKEN_SECRET);

    if (!payload.sub) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.studentId = payload.sub;
    next();
  } catch {
    return res.status(401).json({
      error: "Your session is invalid or expired. Please log in again.",
    });
  }
}

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

// Student signup
app.post("/api/auth/signup", async (req, res) => {
  const { fullName, username, email, password } = req.body ?? {};

  if (
    typeof fullName !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      error: "Please provide your name, username, email, and password.",
    });
  }

  const name = fullName.trim();
  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      error: "Your name must be between 2 and 100 characters.",
    });
  }

  if (!/^[A-Za-z0-9_]{3,30}$/.test(cleanUsername)) {
    return res.status(400).json({
      error: "Username must be 3–30 characters using letters, numbers, or underscores.",
    });
  }

  if (
    cleanEmail.length > 255 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  if (
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      error: "Password must be at least 8 characters and at most 72 UTF-8 bytes.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO public.students
        (full_name, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, username, email, created_at`,
      [name, cleanUsername, cleanEmail, passwordHash]
    );

    const student = result.rows[0];

    const token = jwt.sign(
      { sub: String(student.id) },
      TOKEN_SECRET,
      { expiresIn: "1d", algorithm: "HS256" }
    );

    return res.status(201).json({
      message: "Account created successfully.",
      token,
      student,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "That username or email address is already registered.",
      });
    }

    console.error("Signup failed:", error.message);
    return res.status(500).json({
      error: "Could not create your account.",
    });
  }
});

// Student login using either email or username
app.post("/api/auth/login", async (req, res) => {
  const { identifier, password } = req.body ?? {};

  if (
    typeof identifier !== "string" ||
    typeof password !== "string" ||
    !identifier.trim() ||
    !password
  ) {
    return res.status(400).json({
      error: "Enter your email or username and password.",
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, full_name, username, email, password_hash
       FROM public.students
       WHERE LOWER(email) = LOWER($1)
          OR LOWER(username) = LOWER($1)
       LIMIT 2`,
      [identifier.trim()]
    );

    // Reject ambiguous identifiers rather than authenticating the wrong account.
    if (result.rows.length !== 1) {
      return res.status(401).json({
        error: "Invalid email/username or password.",
      });
    }

    const student = result.rows[0];
    const passwordMatches = await bcrypt.compare(
      password,
      student.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email/username or password.",
      });
    }

    const token = jwt.sign(
      { sub: String(student.id) },
      TOKEN_SECRET,
      { expiresIn: "1d", algorithm: "HS256" }
    );

    return res.json({
      message: "Login successful.",
      token,
      student: {
        id: student.id,
        full_name: student.full_name,
        username: student.username,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    return res.status(500).json({
      error: "Could not log in. Please try again.",
    });
  }
});

// Return the currently authenticated student
app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, username, email, created_at
       FROM public.students
       WHERE id = $1`,
      [req.studentId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Student account not found.",
      });
    }

    res.json({ student: result.rows[0] });
  } catch (error) {
    console.error("Could not load student:", error.message);
    res.status(500).json({
      error: "Could not load student account.",
    });
  }
});

// Save an assessment for the authenticated student only
app.post("/api/assessments", requireAuth, async (req, res) => {
  const {
    domainId,
    domainName,
    correct,
    total,
    percentage,
    answers,
    conceptAnalysis,
    gaps,
  } = req.body ?? {};

  if (
    typeof domainId !== "string" ||
    !domainId.trim() ||
    domainId.length > 50 ||
    typeof domainName !== "string" ||
    !domainName.trim() ||
    domainName.length > 100 ||
    !Number.isInteger(correct) ||
    !Number.isInteger(total) ||
    !Number.isInteger(percentage) ||
    total < 1 ||
    total > 500 ||
    correct < 0 ||
    correct > total ||
    percentage !== Math.round((correct / total) * 100) ||
    !answers ||
    typeof answers !== "object" ||
    Array.isArray(answers) ||
    !Array.isArray(conceptAnalysis) ||
    !Array.isArray(gaps)
  ) {
    return res.status(400).json({
      error: "Invalid assessment data.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO public.assessments (
        student_id, domain_id, domain_name, correct_answers,
        total_questions, percentage, answers, concept_analysis,
        learning_gaps
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, domain_name, percentage, created_at`,
      [
        req.studentId,
        domainId,
        domainName,
        correct,
        total,
        percentage,
        JSON.stringify(answers),
        JSON.stringify(conceptAnalysis),
        JSON.stringify(gaps),
      ]
    );

    res.status(201).json({
      message: "Assessment saved successfully.",
      assessment: result.rows[0],
    });
  } catch (error) {
    console.error("Could not save assessment:", error.message);
    res.status(500).json({
      error: "Could not save the assessment.",
    });
  }
});

// Return only the signed-in student's assessment history
app.get("/api/assessments", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      
`SELECT id, domain_id, domain_name, correct_answers,
        total_questions, percentage, concept_analysis,
        learning_gaps, created_at
 FROM public.assessments
 WHERE student_id = $1
 ORDER BY created_at DESC
 LIMIT 50`,

      [req.studentId]
    );
    

    res.json({ assessments: result.rows });
  } catch (error) {
    console.error("Could not load assessments:", error.message);
    res.status(500).json({
      error: "Could not load assessment history.",
    });
  }
});

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`IntelliLearn API running on http://localhost:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
