INTELLILEARN — FRONTEND PROTOTYPE
=================================

Features
- Academic university-style responsive interface
- Four domains: Mathematics, Physics, Computer Networking, AI & Neural Networks
- Interactive diagnostic quiz
- Concept-level scoring and sample prerequisite-gap analysis
- Personalized learning recommendations
- Reassessment flow
- Demo-only data; no backend or real trained AI model is connected yet

SETUP IN YOUR EXISTING VITE PROJECT
1. Open your existing IntelliLearn folder in VS Code.
2. Make sure you have already created a React + Vite project.
   If not, from an EMPTY IntelliLearn folder run:
       npm create vite@latest . -- --template react
       npm install
3. Replace these files in your project with the files in this package:
       src/App.jsx
       src/App.css
       src/index.css
4. Keep your existing package.json and index.html.
5. Run in VS Code Terminal:
       npm run dev
6. Open the local URL shown in the terminal (usually http://localhost:5173).

If your project is not a Vite React project yet, do not paste these files into a plain folder; create the Vite app first.

PROJECT NOTE
The assessment questions, scoring rules, mastery levels, and recommendations are illustrative prototype logic. They demonstrate the workflow and are not a validated educational assessment or production-grade AI model.
