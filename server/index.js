const express = require('express');
const cors = require('cors');
const generate400Questions = require('./data/questionGenerator');
let questions = generate400Questions();
const studyPlans = require('./data/studyplans');
const contests = require('./data/contests');
const { userProfile } = require('./data/userStats');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Registered Users Database
const users = [
  {
    id: 1,
    email: 'admin@codequest.com',
    password: 'admin123',
    username: 'Admin Lead',
    role: 'admin',
    rating: 2400,
    solvedCount: 142,
    coins: 1200,
    streakDays: 25,
    createdAt: '2026-01-01'
  },
  {
    id: 2,
    email: 'student@codequest.com',
    password: 'student123',
    username: 'Divya Ingle',
    role: 'user',
    rating: 1845,
    solvedCount: 48,
    coins: 450,
    streakDays: 7,
    createdAt: '2026-02-15'
  }
];

// --- AUTH ENDPOINTS ---

// Register New User
app.post('/api/auth/register', (req, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Email, password, and username are required." });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: "An account with this email already exists." });
  }

  const newUser = {
    id: users.length + 1,
    email: email.trim(),
    password: password.trim(),
    username: username.trim(),
    role: role || 'user',
    rating: 1500,
    solvedCount: 0,
    coins: 100,
    streakDays: 1,
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);

  // Return user session object (without password)
  const { password: _, ...userSession } = newUser;
  res.json({
    message: "Registration successful!",
    user: userSession
  });
});

// Login User
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter both email and password." });
  }

  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user || user.password !== password.trim()) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const { password: _, ...userSession } = user;
  res.json({
    message: "Login successful!",
    user: userSession
  });
});

// --- ADMIN ENDPOINTS ---

// Admin: Get all users
app.get('/api/admin/users', (req, res) => {
  const safeUsers = users.map(({ password, ...u }) => u);
  res.json(safeUsers);
});

// Admin: Create new question
app.post('/api/admin/questions', (req, res) => {
  const { title, category, subCategory, difficulty, examTags, statement, options, correctAnswer, explanation, formula } = req.body;

  if (!title || !statement || !options || options.length < 2) {
    return res.status(400).json({ error: "Question title, statement, and options are required." });
  }

  const newId = questions.length + 1;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `question-${newId}`;

  const newQuestion = {
    id: newId,
    slug,
    title: `${newId}. ${title}`,
    category: category || 'Quantitative Aptitude',
    subCategory: subCategory || 'General Aptitude',
    difficulty: difficulty || 'Medium',
    examTags: Array.isArray(examTags) ? examTags : ['TCS NQT', 'GATE CS'],
    acceptanceRate: '100.0%',
    statement,
    options: options || ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: parseInt(correctAnswer) || 0,
    explanation: explanation || "Detailed explanation provided by Admin.",
    formula: formula || "N/A",
    hints: ["Analyze the given values carefully.", "Use ratio simplification."],
    discussion: [],
    totalAttempts: 0
  };

  questions.unshift(newQuestion);
  res.json({ message: "Question created successfully!", question: newQuestion });
});

// Admin: Delete question
app.delete('/api/admin/questions/:id', (req, res) => {
  const { id } = req.params;
  const targetId = parseInt(id);

  questions = questions.filter(q => q.id !== targetId);
  res.json({ message: "Question deleted successfully." });
});

// --- QUESTION BANK & USER ENDPOINTS ---

// 1. Get Questions List with filtering & search
app.get('/api/questions', (req, res) => {
  let result = [...questions];
  const { category, subCategory, difficulty, examTag, search } = req.query;

  if (category) {
    result = result.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }
  if (subCategory) {
    result = result.filter(q => q.subCategory.toLowerCase() === subCategory.toLowerCase());
  }
  if (difficulty) {
    result = result.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (examTag) {
    result = result.filter(q => q.examTags.some(t => t.toLowerCase() === examTag.toLowerCase()));
  }
  if (search) {
    const qTerm = search.toLowerCase();
    result = result.filter(q => 
      q.title.toLowerCase().includes(qTerm) || 
      q.statement.toLowerCase().includes(qTerm) ||
      q.category.toLowerCase().includes(qTerm)
    );
  }

  res.json({
    total: result.length,
    questions: result
  });
});

// 2. Get Single Question by Slug or ID
app.get('/api/questions/:slug', (req, res) => {
  const { slug } = req.params;
  const question = questions.find(q => q.slug === slug || q.id === parseInt(slug));

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.json(question);
});

// 3. Submit Answer for a Question
app.post('/api/questions/:slug/submit', (req, res) => {
  const { slug } = req.params;
  const { selectedOption, timeSpentSeconds } = req.body;

  const question = questions.find(q => q.slug === slug || q.id === parseInt(slug));
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = parseInt(selectedOption) === question.correctAnswer;
  
  // Update total attempts & user stats mock
  question.totalAttempts += 1;
  if (isCorrect) {
    userProfile.solvedCounts.total += 1;
    if (question.difficulty === 'Easy') userProfile.solvedCounts.easy += 1;
    if (question.difficulty === 'Medium') userProfile.solvedCounts.medium += 1;
    if (question.difficulty === 'Hard') userProfile.solvedCounts.hard += 1;
    
    // Add to recent submissions
    userProfile.recentSubmissions.unshift({
      id: question.id,
      title: question.title,
      result: "Accepted",
      timeSpent: `${timeSpentSeconds || 60}s`,
      date: new Date().toISOString().split('T')[0],
      difficulty: question.difficulty
    });
  } else {
    userProfile.recentSubmissions.unshift({
      id: question.id,
      title: question.title,
      result: "Wrong Answer",
      timeSpent: `${timeSpentSeconds || 60}s`,
      date: new Date().toISOString().split('T')[0],
      difficulty: question.difficulty
    });
  }

  res.json({
    isCorrect,
    correctAnswer: question.correctAnswer,
    correctOptionText: question.options[question.correctAnswer],
    explanation: question.explanation,
    formula: question.formula,
    timeSpentSeconds,
    coinsEarned: isCorrect ? 10 : 0
  });
});

// 4. AI Explanation Generator endpoint
app.post('/api/ai/explain', (req, res) => {
  const { questionTitle, questionStatement, userQuery } = req.body;

  const explanation = `🤖 **CodeQuest AI Assistant Step-by-Step Breakdown:**

1. **Core Concept:** This problem tests **${questionTitle.split('.')[1] || questionTitle}**.
2. **Key Intuition:** ${userQuery ? `Addressing your question: "${userQuery}": ` : ''}Always look for normalized work units or speed conversions first.
3. **Shortcut Trick:** You don't need heavy arithmetic! Work with ratios or assumed base numbers (like 100 or LCM).
4. **Step-by-step verification:** Check the units (hours vs seconds, m/s vs km/h) before final calculation.`;

  res.json({ explanation });
});

// 5. Get Study Plans
app.get('/api/studyplans', (req, res) => {
  res.json(studyPlans);
});

// 6. Get Contests
app.get('/api/contests', (req, res) => {
  res.json(contests);
});

// 7. Get User Profile Stats
app.get('/api/user/profile', (req, res) => {
  res.json(userProfile);
});

// Export Express App for Vercel Serverless Deployments
module.exports = app;

if (process.env.NODE_ENV !== 'production' || require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`🚀 CodeQuest Server listening on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use by another process.`);
      console.error(`💡 Fix: Run 'npx kill-port ${PORT}' or 'fuser -k ${PORT}/tcp' then restart the server.`);
      process.exit(1);
    } else {
      console.error(`Server error:`, err);
    }
  });
}
