import { useState } from "react";
import "./App.css";

const domains = [
  {
    id: "math",
    icon: "∑",
    title: "Mathematics",
    subtitle: "Concept mastery and problem solving",
    color: "violet",
    questions: [
      {
        id: "m1",
        concept: "Fractions",
        prerequisite: "Number sense",
        prompt: "Which fraction is equivalent to 2/3?",
        options: ["3/5", "4/6", "5/6", "6/8"],
        answer: 1,
        explanation: "Multiplying the numerator and denominator of 2/3 by 2 gives 4/6.",
      },
      {
        id: "m2",
        concept: "Linear equations",
        prerequisite: "Inverse operations",
        prompt: "Solve: 3x + 4 = 19",
        options: ["x = 3", "x = 5", "x = 7", "x = 15"],
        answer: 1,
        explanation: "Subtract 4 from both sides to get 3x = 15, then divide by 3.",
      },
      {
        id: "m3",
        concept: "Algebraic expressions",
        prerequisite: "Like terms",
        prompt: "Simplify: 4a + 2a − a",
        options: ["5", "5a", "7a", "6a²"],
        answer: 1,
        explanation: "Combine the coefficients: 4 + 2 − 1 = 5, so the result is 5a.",
      },
      {
        id: "m4",
        concept: "Coordinate geometry",
        prerequisite: "Ordered pairs",
        prompt: "In the point (−2, 4), what is the x-coordinate?",
        options: ["−2", "2", "4", "−4"],
        answer: 0,
        explanation: "The first value in an ordered pair (x, y) is the x-coordinate.",
      },
    ],
    resources: {
      "Fractions": "Review equivalent fractions with visual fraction bars, then solve five short practice questions.",
      "Linear equations": "Practice inverse operations one step at a time before solving two-step equations.",
      "Algebraic expressions": "Review like terms and coefficients, then practise simplifying expressions.",
      "Coordinate geometry": "Revise how x- and y-coordinates are read from ordered pairs.",
    },
  },
  {
    id: "physics",
    icon: "⚛",
    title: "Physics",
    subtitle: "Conceptual understanding and numericals",
    color: "blue",
    questions: [
      {
        id: "p1",
        concept: "Speed",
        prerequisite: "Distance and time",
        prompt: "A cyclist travels 60 km in 2 hours. What is the average speed?",
        options: ["20 km/h", "30 km/h", "60 km/h", "120 km/h"],
        answer: 1,
        explanation: "Average speed = distance ÷ time = 60 ÷ 2 = 30 km/h.",
      },
      {
        id: "p2",
        concept: "Force",
        prerequisite: "Mass and acceleration",
        prompt: "Which formula represents Newton's second law?",
        options: ["F = m/a", "F = ma", "F = a/m", "F = m + a"],
        answer: 1,
        explanation: "Newton's second law states that the net force is mass multiplied by acceleration.",
      },
      {
        id: "p3",
        concept: "Electric circuits",
        prerequisite: "Voltage and resistance",
        prompt: "Using Ohm's law, what current flows at 12 V through 4 Ω?",
        options: ["0.33 A", "3 A", "8 A", "48 A"],
        answer: 1,
        explanation: "I = V/R = 12/4 = 3 A.",
      },
      {
        id: "p4",
        concept: "Energy",
        prerequisite: "Work and force",
        prompt: "What is the SI unit of energy?",
        options: ["Newton", "Watt", "Joule", "Pascal"],
        answer: 2,
        explanation: "Energy is measured in joules (J) in the SI system.",
      },
    ],
    resources: {
      "Speed": "Revise distance, time, and their units. Practise choosing the correct formula before substituting values.",
      "Force": "Review mass and acceleration, then apply F = ma to simple examples.",
      "Electric circuits": "Revisit voltage, current, resistance, and Ohm's law with worked examples.",
      "Energy": "Make a short unit sheet for energy, power, force, and pressure.",
    },
  },
  {
    id: "network",
    icon: "⌁",
    title: "Computer Networking",
    subtitle: "Protocols, addressing and architecture",
    color: "teal",
    questions: [
      {
        id: "n1",
        concept: "IP addressing",
        prerequisite: "Binary numbers",
        prompt: "What is the main purpose of an IP address?",
        options: ["To identify a network interface logically", "To encrypt every packet", "To increase CPU speed", "To store web pages"],
        answer: 0,
        explanation: "An IP address provides logical addressing used to deliver packets across networks.",
      },
      {
        id: "n2",
        concept: "Transport protocols",
        prerequisite: "Ports and end-to-end communication",
        prompt: "Which protocol provides reliable, ordered delivery?",
        options: ["UDP", "ARP", "TCP", "ICMP"],
        answer: 2,
        explanation: "TCP provides reliable, ordered byte-stream delivery using acknowledgements and retransmissions.",
      },
      {
        id: "n3",
        concept: "DNS",
        prerequisite: "Client-server model",
        prompt: "What does DNS commonly help a device do?",
        options: ["Convert domain names to IP addresses", "Assign screen resolution", "Compress all files", "Replace the operating system"],
        answer: 0,
        explanation: "DNS resolves domain names, such as example.com, to records including IP addresses.",
      },
      {
        id: "n4",
        concept: "Subnet masks",
        prerequisite: "Binary numbers and IP addressing",
        prompt: "What does a subnet mask help identify?",
        options: ["The network and host portions of an IPv4 address", "The Wi-Fi password", "The browser version", "The packet's file type"],
        answer: 0,
        explanation: "A subnet mask indicates which bits belong to the network prefix and which to the host portion.",
      },
    ],
    resources: {
      "IP addressing": "Review logical vs physical addresses and practise reading IPv4 address examples.",
      "Transport protocols": "Compare TCP and UDP using reliability, ordering, overhead, and common use cases.",
      "DNS": "Trace a browser request from domain name lookup to connecting to a server.",
      "Subnet masks": "Practise binary conversion and identify network prefixes using simple subnet examples.",
    },
  },
  {
    id: "ai",
    icon: "◈",
    title: "AI & Neural Networks",
    subtitle: "AI/ML fundamentals and neural computation",
    color: "amber",
    questions: [
      {
        id: "a1",
        concept: "Supervised learning",
        prerequisite: "Features and labels",
        prompt: "What is typically provided in supervised learning?",
        options: ["Only unlabelled data", "Examples with known target labels", "No training data", "Only random numbers"],
        answer: 1,
        explanation: "Supervised learning uses examples paired with known target labels or values.",
      },
      {
        id: "a2",
        concept: "Neural network weights",
        prerequisite: "Weighted sums",
        prompt: "What is a key role of weights in a neural network?",
        options: ["Store the computer's files", "Control the influence of inputs", "Replace training data", "Guarantee perfect predictions"],
        answer: 1,
        explanation: "Weights scale input signals and are adjusted during training to improve predictions.",
      },
      {
        id: "a3",
        concept: "Overfitting",
        prerequisite: "Training and test data",
        prompt: "What does overfitting usually mean?",
        options: ["The model performs well on training data but poorly on new data", "The model has no parameters", "The dataset contains no examples", "The model always predicts the mean"],
        answer: 0,
        explanation: "Overfitting occurs when a model learns training-specific patterns that do not generalize well.",
      },
      {
        id: "a4",
        concept: "Activation functions",
        prerequisite: "Weighted sums and non-linearity",
        prompt: "Why are nonlinear activation functions useful in neural networks?",
        options: ["They make all data correct", "They allow networks to model nonlinear relationships", "They remove the need for data", "They always reduce model size to zero"],
        answer: 1,
        explanation: "Nonlinear activations let stacked layers represent more complex relationships than a purely linear model.",
      },
    ],
    resources: {
      "Supervised learning": "Practise identifying features, labels, classification, and regression in everyday examples.",
      "Neural network weights": "Review weighted sums with small numerical examples before exploring training.",
      "Overfitting": "Compare training and test performance and learn about validation, regularization, and data quality.",
      "Activation functions": "Compare ReLU and sigmoid graphs and learn why nonlinearity matters.",
    },
  },
];

const flowSteps = [
  "Diagnostic assessment",
  "Response analysis",
  "Concept mapping",
  "Gap detection",
  "Prerequisite trace",
  "Personalized path",
  "Reassessment",
  "Measured improvement",
];

function Icon({ children }) {
  return <span className="icon-mark" aria-hidden="true">{children}</span>;
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedDomain, setSelectedDomain] = useState("math");
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [reassessMode, setReassessMode] = useState(false);

  const domain = domains.find((item) => item.id === selectedDomain) || domains[0];
  const questionSet = domain.questions;
  const currentQuestion = questionSet[questionIndex];
  const answeredCount = questionSet.filter((q) => answers[q.id] !== undefined).length;
  const score = questionSet.reduce(
  (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
  0
);
  <p>Your assessment score: {score}%</p>

  const startAssessment = (domainId) => {
    setSelectedDomain(domainId);
    setAnswers({});
    setQuestionIndex(0);
    setResult(null);
    setReassessMode(false);
    setPage("assessment");
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((previous) => ({ ...previous, [currentQuestion.id]: optionIndex }));
  };

  const finishAssessment = () => {
    const correct = questionSet.filter((q) => answers[q.id] === q.answer).length;
    const percentage = Math.round((correct / questionSet.length) * 100);
    const weakQuestions = questionSet.filter((q) => answers[q.id] !== q.answer);
    const strengths = questionSet.filter((q) => answers[q.id] === q.answer).map((q) => q.concept);
    const gaps = weakQuestions.map((q) => ({
      concept: q.concept,
      prerequisite: q.prerequisite,
      explanation: q.explanation,
      recommendation: domain.resources[q.concept] || "Review this concept with a worked example and a short practice set.",
    }));
    setResult({ correct, total: questionSet.length, percentage, gaps, strengths, answers: { ...answers } });
    setPage("results");
  };

  const beginReassessment = () => {
    setAnswers({});
    setQuestionIndex(0);
    setReassessMode(true);
    setPage("assessment");
  };

  const nav = (target) => {
    setPage(target);
    if (target === "home") setResult(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => nav("home")} aria-label="IntelliLearn home">
          <span className="brand-symbol"><Icon>i</Icon></span>
          <span className="brand-copy">
            <strong>IntelliLearn</strong>
            <small>PERSONALIZED LEARNING INTELLIGENCE</small>
          </span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={page === "home" ? "nav-link active" : "nav-link"} onClick={() => nav("home")}>Overview</button>
          <button className={page === "domains" ? "nav-link active" : "nav-link"} onClick={() => nav("domains")}>Learning domains</button>
          <button className={page === "how" ? "nav-link active" : "nav-link"} onClick={() => nav("how")}>How it works</button>
        </nav>
        <button className="header-cta" onClick={() => nav("domains")}>Start assessment <span>↗</span></button>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero section-wrap">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-dot" /> A more thoughtful way to learn</div>
                <h1>Every learner has a path.<br /><em>Find yours.</em></h1>
                <p className="hero-description">
                  IntelliLearn looks beyond marks to help identify concepts that need attention,
                  uncover possible prerequisite gaps, and create a focused path toward mastery.
                </p>
                <div className="hero-actions">
                  <button className="button button-primary" onClick={() => nav("domains")}>Explore learning domains <span>→</span></button>
                  <button className="button button-secondary" onClick={() => nav("how")}>How it works</button>
                </div>
                <div className="hero-note"><span className="note-check">✓</span> Concept-level feedback · Personalized practice · Progress checks</div>
              </div>
              <div className="hero-visual" aria-label="Illustration of a learning progress dashboard">
                <div className="visual-orbit orbit-one" />
                <div className="visual-orbit orbit-two" />
                <div className="visual-center"><span>i</span><small>LEARNER<br />PROFILE</small></div>
                <div className="floating-card card-top">
                  <span className="mini-icon violet-bg">∑</span>
                  <div><strong>Concept mastery</strong><small>Build understanding step by step</small></div>
                  <span className="tiny-check">✓</span>
                </div>
                <div className="floating-card card-right">
                  <span className="mini-icon teal-bg">↗</span>
                  <div><strong>Learning path</strong><small>Recommended next step</small></div>
                </div>
                <div className="floating-card card-bottom">
                  <div className="progress-ring"><span>4</span></div>
                  <div><strong>Keep progressing</strong><small>Small steps, measurable growth</small></div>
                </div>
                <div className="visual-caption">A clearer picture of what to learn next.</div>
              </div>
            </section>

            <section className="trust-strip">
              <div className="trust-inner">
                <div><strong>01</strong><span>Understand the learner</span></div>
                <div><strong>02</strong><span>Locate concept gaps</span></div>
                <div><strong>03</strong><span>Personalize the next step</span></div>
                <div><strong>04</strong><span>Check for improvement</span></div>
              </div>
            </section>

            <section className="section-wrap section-block">
              <div className="section-heading">
                <div><div className="eyebrow">LEARNING, MADE PERSONAL</div><h2>Marks tell part of the story.<br /><em>Understanding tells the rest.</em></h2></div>
                <p>Move from a score to a practical next step. Start with a short diagnostic assessment and explore sample concept-level feedback.</p>
              </div>
              <div className="comparison-grid">
                <article className="comparison-card traditional">
                  <div className="comparison-label"><span className="label-dot grey-dot" /> Traditional approach</div>
                  <h3>A score without a roadmap</h3>
                  <div className="score-display"><strong>62%</strong><span>Assessment score</span></div>
                  <ul className="plain-list">
                    <li><span>—</span> A total score hides individual concept gaps</li>
                    <li><span>—</span> Students may not know what to revise first</li>
                    <li><span>—</span> Improvement can be difficult to measure</li>
                  </ul>
                </article>
                <article className="comparison-card intelligent">
                  <div className="comparison-label"><span className="label-dot green-dot" /> IntelliLearn approach</div>
                  <h3>A diagnosis with a next step</h3>
                  <div className="concept-preview">
                    <div className="concept-row"><span className="concept-state good">✓</span><div><strong>Concepts understood</strong><small>Build on existing strengths</small></div><b>2</b></div>
                    <div className="concept-row"><span className="concept-state needs">!</span><div><strong>Concepts to revisit</strong><small>Targeted revision recommended</small></div><b>2</b></div>
                    <div className="concept-row"><span className="concept-state next">↗</span><div><strong>Next learning step</strong><small>Review a prerequisite first</small></div><b>→</b></div>
                  </div>
                  <button className="text-link" onClick={() => nav("domains")}>Try a diagnostic assessment <span>→</span></button>
                </article>
              </div>
            </section>

            <section className="section-wrap section-block domain-section">
              <div className="section-heading">
                <div><div className="eyebrow">EXPLORE A SUBJECT</div><h2>One learning engine.<br /><em>Four domains to explore.</em></h2></div>
                <button className="text-link desktop-link" onClick={() => nav("domains")}>View all domains <span>→</span></button>
              </div>
              <DomainGrid onSelect={startAssessment} />
            </section>

            <section className="section-wrap workflow-band">
              <div className="workflow-heading"><div className="eyebrow">THE LEARNING CYCLE</div><h2>From confusion to clarity.</h2><p>A repeatable process designed around understanding, not just scores.</p></div>
              <div className="workflow-steps">{flowSteps.map((step, i) => <div className="workflow-step" key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong>{i < flowSteps.length - 1 && <i>→</i>}</div>)}</div>
            </section>
          </>
        )}

        {page === "domains" && (
          <section className="section-wrap page-section">
            <div className="page-intro"><div className="eyebrow">YOUR LEARNING JOURNEY</div><h1>Choose a domain.<br /><em>Discover your next step.</em></h1><p>Select a subject to begin a short diagnostic assessment. Your sample report will connect answers to concepts and suggested revisions.</p></div>
            <DomainGrid onSelect={startAssessment} large />
            <div className="notice-box"><span>i</span><p><strong>About this prototype</strong><br />Questions and recommendations are illustrative. Results demonstrate a sample learning-gap workflow and should not be treated as a validated academic diagnosis.</p></div>
          </section>
        )}

        {page === "how" && (
          <section className="section-wrap page-section">
            <div className="page-intro"><div className="eyebrow">OUR APPROACH</div><h1>Understand the gap.<br /><em>Support the learner.</em></h1><p>IntelliLearn demonstrates a structured workflow for turning assessment responses into a practical learning plan.</p></div>
            <div className="process-list">
              {[
                ["01", "Diagnostic assessment", "A short set of questions samples the learner's current understanding."],
                ["02", "Response analysis", "Each response is compared with the expected answer and linked to a concept."],
                ["03", "Concept and prerequisite mapping", "Concept relationships help suggest which foundational knowledge may need review."],
                ["04", "Personalized intervention", "The report recommends focused explanations and practice activities for missed concepts."],
                ["05", "Reassessment and improvement", "A follow-up attempt can help the learner check whether understanding has improved."],
              ].map(([number, title, description]) => <article className="process-row" key={number}><span className="process-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="process-arrow">↗</span></article>)}
            </div>
            <div className="notice-box"><span>!</span><p><strong>Responsible use</strong><br />The current version uses sample questions and transparent rules. It does not use a trained model, infer a learner's intelligence, or replace a teacher's judgement.</p></div>
          </section>
        )}

        {page === "assessment" && currentQuestion && (
          <section className="section-wrap assessment-page">
            <button className="back-link" onClick={() => nav("domains")}>← Back to learning domains</button>
            <div className="assessment-layout">
              <aside className="assessment-sidebar">
                <div className={`domain-icon large-icon ${domain.color}`}>{domain.icon}</div>
                <div className="eyebrow">DIAGNOSTIC ASSESSMENT</div>
                <h2>{domain.title}</h2>
                <p>{domain.subtitle}.</p>
                <div className="sidebar-divider" />
                <div className="assessment-meta"><span>Questions</span><strong>{questionSet.length}</strong></div>
                <div className="assessment-meta"><span>Answered</span><strong>{answeredCount} of {questionSet.length}</strong></div>
                <div className="progress-track"><span style={{ width: `${(answeredCount / questionSet.length) * 100}%` }} /></div>
                <p className="sidebar-hint">Take your time. Choose the answer that best reflects your current understanding.</p>
              </aside>
              <div className="question-panel">
                <div className="question-topline"><span>QUESTION {questionIndex + 1} OF {questionSet.length}</span><span className="question-tag">{reassessMode ? "REASSESSMENT" : "INITIAL CHECK"}</span></div>
                <div className="question-progress">{questionSet.map((q, i) => <button key={q.id} aria-label={`Go to question ${i + 1}`} className={`${i === questionIndex ? "current" : ""} ${answers[q.id] !== undefined ? "answered" : ""}`} onClick={() => setQuestionIndex(i)} />)}</div>
                <div className="question-concept">CONCEPT SAMPLE · {currentQuestion.concept.toUpperCase()}</div>
                <h1>{currentQuestion.prompt}</h1>
                <p className="question-instruction">Select one answer below.</p>
                <div className="answer-options">
                  {currentQuestion.options.map((option, index) => (
                    <button key={option} className={`answer-option ${answers[currentQuestion.id] === index ? "selected" : ""}`} onClick={() => selectAnswer(index)}>
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="option-radio">{answers[currentQuestion.id] === index ? "✓" : ""}</span>
                    </button>
                  ))}
                </div>
                <div className="question-footer">
                  <button className="button button-secondary" disabled={questionIndex === 0} onClick={() => setQuestionIndex((i) => i - 1)}>← Previous</button>
                  {questionIndex < questionSet.length - 1 ? (
                    <button className="button button-primary" onClick={() => setQuestionIndex((i) => i + 1)}>Next question <span>→</span></button>
                  ) : (
                    <button className="button button-primary" disabled={answeredCount !== questionSet.length} onClick={finishAssessment}>Analyze my answers <span>→</span></button>
                  )}
                </div>
                {questionIndex === questionSet.length - 1 && answeredCount !== questionSet.length && <p className="validation-note">Answer all questions to generate your sample report.</p>}
              </div>
            </div>
          </section>
        )}

        {page === "results" && result && (
          <section className="section-wrap results-page">
            <div className="results-header">
              <div><div className="eyebrow">YOUR LEARNING REPORT</div><h1>A clearer view of<br /><em>what to learn next.</em></h1><p>Here is a sample concept-level analysis based on your {domain.title} responses.</p></div>
              <div className="result-score-card"><span>DIAGNOSTIC SCORE</span><strong>{result.percentage}<small>%</small></strong><div className="score-track"><span style={{ width: `${result.percentage}%` }} /></div><small>{result.correct} correct out of {result.total} questions</small></div>
            </div>
            <div className="result-stat-grid">
              <div className="result-stat"><span className="stat-icon good">✓</span><div><small>Concepts answered correctly</small><strong>{result.strengths.length}</strong></div></div>
              <div className="result-stat"><span className="stat-icon needs">!</span><div><small>Concepts to review</small><strong>{result.gaps.length}</strong></div></div>
              <div className="result-stat"><span className="stat-icon next">↗</span><div><small>Suggested learning actions</small><strong>{result.gaps.length}</strong></div></div>
            </div>
            <div className="report-grid">
              <div className="report-main">
                <div className="report-section-heading"><div><div className="eyebrow">CONCEPT BREAKDOWN</div><h2>What your answers suggest</h2></div><span className="small-muted">Based on this quiz only</span></div>
                {questionSet.map((q) => {
                  const correct = answers[q.id] === q.answer;
                  return <article className="breakdown-row" key={q.id}><span className={`breakdown-status ${correct ? "status-good" : "status-needs"}`}>{correct ? "✓" : "!"}</span><div className="breakdown-copy"><strong>{q.concept}</strong><small>{correct ? "Correct response on this sample item" : `Review prerequisite: ${q.prerequisite}`}</small>{!correct && <p>{q.explanation}</p>}</div><span className={`mastery-label ${correct ? "mastery-good" : "mastery-needs"}`}>{correct ? "On track" : "Review"}</span></article>;
                })}
                {result.gaps.length === 0 && <div className="success-note">Excellent work on this sample quiz. Try a more advanced assessment to explore your understanding further.</div>}
              </div>
              <aside className="learning-plan">
                <div className="plan-top"><span className="plan-icon">✦</span><div><div className="eyebrow">PERSONALIZED NEXT STEPS</div><h2>Your learning plan</h2></div></div>
                {result.gaps.length > 0 ? result.gaps.map((gap, index) => <div className="plan-item" key={gap.concept}><span className="plan-step">{String(index + 1).padStart(2, "0")}</span><div><strong>Review {gap.concept}</strong><small>Possible prerequisite: {gap.prerequisite}</small><p>{gap.recommendation}</p></div></div>) : <p className="empty-plan">No gaps were identified in this small sample. Continue with a more challenging set to verify mastery.</p>}
                <div className="plan-disclaimer">Recommendations are based on fixed demo rules and this short sample, not a trained AI model.</div>
              </aside>
            </div>
            <div className="results-actions"><button className="button button-secondary" onClick={() => startAssessment(selectedDomain)}>Retake assessment</button><button className="button button-primary" onClick={beginReassessment}>Try reassessment <span>→</span></button><button className="text-link" onClick={() => nav("domains")}>Choose another domain</button></div>
            <div className="notice-box"><span>i</span><p><strong>Interpret results carefully</strong><br />This is a prototype demonstration. A correct or incorrect response on a small quiz is only a limited signal of understanding. The concept links and recommendations are illustrative and should be validated with educators and larger question banks.</p></div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner"><button className="brand footer-brand" onClick={() => nav("home")}><span className="brand-symbol"><Icon>i</Icon></span><span className="brand-copy"><strong>IntelliLearn</strong><small>LEARNING WITH CLARITY</small></span></button><p>Helping learners understand what to learn next.</p><span className="footer-copy">© {new Date().getFullYear()} IntelliLearn · Educational prototype</span></div>
      </footer>
    </div>
  );
}

function DomainGrid({ onSelect, large = false }) {
  return (
    <div className={`domain-grid ${large ? "domain-grid-large" : ""}`}>
      {domains.map((domain, index) => (
        <article className="domain-card" key={domain.id}>
          <div className="domain-card-top"><span className={`domain-icon ${domain.color}`}>{domain.icon}</span><span className="domain-index">0{index + 1}</span></div>
          <h3>{domain.title}</h3><p>{domain.subtitle}.</p>
          <div className="domain-card-bottom"><span>Short diagnostic</span><button onClick={() => onSelect(domain.id)} aria-label={`Start ${domain.title} assessment`}>→</button></div>
        </article>
      ))}
    </div>
  );
}

export default App;
