const contests = [
  {
    id: "weekly-apti-42",
    title: "Weekly Aptitude Speed Challenge #42",
    status: "active", // active, upcoming, ended
    startTime: "2026-07-27T10:00:00Z",
    durationMins: 45,
    totalQuestions: 15,
    maxScore: 150,
    participantsCount: 4120,
    banner: "Speed & Accuracy Blitz",
    badge: "Speedster Badge",
    prizes: ["1st Prize: 500 Coins + AptiPro Badge", "Top 10: Elite Crown Icon"]
  },
  {
    id: "tcs-national-mock-2026",
    title: "TCS NQT National Grand Mock Exam",
    status: "upcoming",
    startTime: "2026-07-30T14:00:00Z",
    durationMins: 90,
    totalQuestions: 30,
    maxScore: 300,
    participantsCount: 18900,
    banner: "Real TCS NQT Exam Simulator",
    badge: "TCS National Ranker",
    prizes: ["Certificate of Merit", "Direct Interview Preparation Access"]
  },
  {
    id: "bank-po-speed-quant",
    title: "IBPS PO Quant DI Special Contest",
    status: "ended",
    startTime: "2026-07-20T18:00:00Z",
    durationMins: 30,
    totalQuestions: 10,
    maxScore: 100,
    participantsCount: 8400,
    banner: "DI & Speed Maths Focus",
    badge: "Quant DI Specialist"
  }
];

module.exports = contests;
