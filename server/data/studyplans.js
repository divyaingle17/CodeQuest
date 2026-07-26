const studyPlans = [
  {
    id: "tcs-nqt-sprint",
    title: "TCS NQT 14-Day Aptitude Sprint",
    targetExam: "TCS NQT",
    category: "IT Placements",
    description: "Master the highest-frequency quantitative and logical reasoning topics tested in TCS NQT Foundation & Advanced rounds.",
    durationDays: 14,
    totalModules: 8,
    enrolledCount: 34200,
    bannerColor: "from-blue-600 to-indigo-700",
    modules: [
      { day: 1, title: "Time & Work + Pipes & Cisterns", questionCount: 15, status: "completed" },
      { day: 2, title: "Speed Distance Time & Train Problems", questionCount: 12, status: "in_progress" },
      { day: 3, title: "Permutations, Combinations & Probability", questionCount: 14, status: "locked" },
      { day: 4, title: "Profit, Loss & Successive Discounts", questionCount: 10, status: "locked" },
      { day: 5, title: "Data Interpretation (Pie Charts & Tables)", questionCount: 12, status: "locked" },
      { day: 6, title: "Blood Relations & Coded Family Trees", questionCount: 10, status: "locked" },
      { day: 7, title: "Syllogisms & Logical Deductions", questionCount: 15, status: "locked" }
    ]
  },
  {
    id: "ssc-cgl-quant-master",
    title: "SSC CGL Tier 1 & Tier 2 Quant Masterclass",
    targetExam: "SSC CGL",
    category: "Government Exams",
    description: "Comprehensive coverage of advanced arithmetic, algebra shortcuts, geometry theorems, and speed calculation techniques for SSC CGL.",
    durationDays: 30,
    totalModules: 15,
    enrolledCount: 52100,
    bannerColor: "from-emerald-600 to-teal-700",
    modules: [
      { day: 1, title: "Number Systems & Divisibility Rules", questionCount: 20, status: "completed" },
      { day: 2, title: "Ratio & Proportion + Mixtures", questionCount: 18, status: "in_progress" },
      { day: 3, title: "Algebraic Identities & Simplification", questionCount: 25, status: "locked" }
    ]
  },
  {
    id: "ibps-po-blitz",
    title: "Banking IBPS PO Speed & Accuracy Booster",
    targetExam: "IBPS PO / SBI PO",
    category: "Banking",
    description: "Crush high-level Data Interpretation, Seating Arrangement puzzles, and Syllogisms under strict exam timer conditions.",
    durationDays: 21,
    totalModules: 10,
    enrolledCount: 28900,
    bannerColor: "from-amber-500 to-orange-600",
    modules: [
      { day: 1, title: "High-level Circular & Linear Seating Puzzles", questionCount: 12, status: "completed" },
      { day: 2, title: "Complex DI: Radar & Caselet Analysis", questionCount: 10, status: "locked" }
    ]
  }
];

module.exports = studyPlans;
