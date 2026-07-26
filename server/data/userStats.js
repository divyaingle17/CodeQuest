let userProfile = {
  username: "Divya Ingle",
  rank: 1420,
  rating: 1845,
  streakDays: 7,
  coins: 450,
  avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=DivyaIngle",
  solvedCounts: {
    total: 48,
    easy: 24,
    medium: 18,
    hard: 6
  },
  totalAvailable: {
    easy: 140,
    medium: 180,
    hard: 80
  },
  categoryScores: [
    { subject: "Quantitative Aptitude", score: 85, fullMark: 100 },
    { subject: "Logical Reasoning", score: 92, fullMark: 100 },
    { subject: "Data Interpretation", score: 70, fullMark: 100 },
    { subject: "Verbal Ability", score: 78, fullMark: 100 },
    { subject: "Speed Maths", score: 88, fullMark: 100 }
  ],
  recentSubmissions: [
    { id: 1, title: "1. Pipe Efficiency & Joint Work", result: "Accepted", timeSpent: "68s", date: "2026-07-26", difficulty: "Medium" },
    { id: 2, title: "2. Relative Speed & Train Crossings", result: "Accepted", timeSpent: "42s", date: "2026-07-26", difficulty: "Easy" },
    { id: 3, title: "3. Coded Blood Relations & Family Tree", result: "Accepted", timeSpent: "85s", date: "2026-07-25", difficulty: "Medium" },
    { id: 5, title: "5. Marked Price, Successive Discount", result: "Accepted", timeSpent: "75s", date: "2026-07-24", difficulty: "Medium" },
    { id: 6, title: "6. Permutations - Word Arrangement", result: "Wrong Answer", timeSpent: "120s", date: "2026-07-23", difficulty: "Hard" }
  ],
  earnedBadges: [
    { title: "7-Day Streak", icon: "🔥", desc: "Practiced 7 days continuously", date: "Jul 2026" },
    { title: "Speed Demon", icon: "⚡", desc: "Solved 10 questions under 45s", date: "Jul 2026" },
    { title: "TCS NQT Ready", icon: "🎓", desc: "Completed TCS Aptitude Track", date: "Jun 2026" },
    { title: "Quant Master", icon: "🏆", desc: "Solved 25 Quantitative Aptitude problems", date: "Jun 2026" }
  ],
  activityGraph: generateActivityData()
};

function generateActivityData() {
  const data = [];
  const today = new Date("2026-07-27");
  for (let i = 60; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    let count = 0;
    if (i < 7) count = Math.floor(Math.random() * 4) + 2;
    else if (Math.random() > 0.4) count = Math.floor(Math.random() * 5);
    data.push({ date: dateStr, count });
  }
  return data;
}

module.exports = { userProfile, generateActivityData };
