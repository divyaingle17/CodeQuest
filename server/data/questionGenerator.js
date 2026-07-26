const initialQuestions = require('./questions');

// Subcategories per subject
const subCategoriesMap = {
  "Quantitative Aptitude": [
    "Time & Work", "Speed Distance Time", "Profit & Loss", "Permutation & Combination", 
    "Probability", "Ages & Averages", "Ratio & Proportion", "Simple & Compound Interest", 
    "Number Systems", "Percentages & Mixtures"
  ],
  "Logical Reasoning": [
    "Blood Relations", "Syllogisms", "Seating Arrangement", "Coding-Decoding", 
    "Clocks & Calendars", "Direction Sense", "Series & Analogies", "Statement & Assumptions"
  ],
  "Data Interpretation": [
    "Pie Charts", "Bar Graphs", "Line Charts", "Table Interpretation", 
    "Caselets & Radar DI", "Data Sufficiency"
  ],
  "Verbal Ability": [
    "Reading Comprehension", "Para Jumbles", "Sentence Correction", 
    "Synonyms & Antonyms", "Idioms & Phrases", "Critical Reasoning"
  ]
};

const examTagPool = ["TCS NQT", "GATE CS", "SSC CGL", "IBPS PO", "UPSC CSAT", "Accenture", "Wipro", "Infosys"];

function generate400Questions() {
  const subjects = ["Quantitative Aptitude", "Logical Reasoning", "Data Interpretation", "Verbal Ability"];
  const result = [...initialQuestions];

  let idCounter = initialQuestions.length + 1;

  subjects.forEach(subject => {
    const subCats = subCategoriesMap[subject];

    // We want 100 questions per subject: 35 Easy, 45 Medium, 20 Hard
    const difficulties = [
      ...Array(35).fill("Easy"),
      ...Array(45).fill("Medium"),
      ...Array(20).fill("Hard")
    ];

    difficulties.forEach((difficulty, idx) => {
      const qNum = idx + 1;
      const subCat = subCats[idx % subCats.length];

      let acceptanceRate = "72.4%";
      let avgTimeSec = 60;
      if (difficulty === "Easy") { acceptanceRate = (75 + (idx % 15)).toFixed(1) + "%"; avgTimeSec = 45; }
      else if (difficulty === "Medium") { acceptanceRate = (58 + (idx % 18)).toFixed(1) + "%"; avgTimeSec = 75; }
      else { acceptanceRate = (40 + (idx % 15)).toFixed(1) + "%"; avgTimeSec = 110; }

      // Assign exam tags
      const tags = [
        examTagPool[idx % examTagPool.length],
        examTagPool[(idx + 3) % examTagPool.length]
      ];

      // Question template details depending on subject
      let title = `${subject} #${qNum} (${difficulty}): ${subCat} Special`;
      let slug = `${subject.toLowerCase().replace(/\s+/g, '-')}-${subCat.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${difficulty.toLowerCase()}-${qNum}`;
      
      let statement = "";
      let options = [];
      let correctAnswer = (idx % 4);
      let formula = "";
      let explanation = "";
      let hints = [];

      if (subject === "Quantitative Aptitude") {
        const v1 = 10 + (idx * 3) % 40;
        const v2 = 15 + (idx * 5) % 60;
        statement = `**Question:** Two quantities A and B are in the ratio **${v1}:${v2}**. If their sum is increased by **20%**, what is the new value of A assuming the total sum was originally **${(v1 + v2) * 10}**?`;
        options = [
          `A) ${v1 * 12}`,
          `B) ${v1 * 10}`,
          `C) ${v2 * 12}`,
          `D) ${(v1 + v2) * 6}`
        ];
        formula = `Ratio Multiplier = Total Original / Sum of Ratio Terms`;
        explanation = `**Step 1:** Original Sum = ${(v1 + v2) * 10}.\n**Step 2:** Value of A = (${v1} / ${v1 + v2}) × ${(v1 + v2) * 10} = ${v1 * 10}.\n**Step 3:** 20% increase on A = ${v1 * 10} × 1.2 = **${v1 * 12}**.`;
        hints = [`Calculate original share of A first using basic ratio formulas.`, `Then apply 20% increase: multiply by 1.2.`];
      } else if (subject === "Logical Reasoning") {
        statement = `**Question (${subCat}):** Point A is **${10 + idx * 2} meters** North of Point B. Point C is **${15 + idx} meters** East of Point B. In which direction is Point A with respect to Point C?`;
        options = [
          "A) North-West",
          "B) South-East",
          "C) North-East",
          "D) South-West"
        ];
        correctAnswer = 0; // A
        formula = `Direction Compass Grid: North is top (+Y), East is right (+X).`;
        explanation = `**Step 1:** B is origin (0,0).\n**Step 2:** A is at (0, +Y) and C is at (+X, 0).\n**Step 3:** Vector from C to A is (-X, +Y) which corresponds to **North-West**.`;
        hints = [`Draw a simple 2D X-Y axis with B at the center origin (0,0).`];
      } else if (subject === "Data Interpretation") {
        statement = `**Data Set (${subCat}):** In a quarterly financial survey, Company X recorded revenue of **$${20 + idx * 5} Million** in Q1, **$${30 + idx * 4} Million** in Q2, and **$${25 + idx * 6} Million** in Q3.\n\nWhat is the percentage growth/decline from Q2 to Q3?`;
        const q2 = 30 + idx * 4;
        const q3 = 25 + idx * 6;
        const diff = (q3 - q2);
        const pChange = ((diff / q2) * 100).toFixed(2);
        statement += `\n\nCalculate the percentage change from Q2 to Q3.`;
        options = [
          `A) ${pChange}%`,
          `B) ${(parseFloat(pChange) + 5).toFixed(2)}%`,
          `C) ${(parseFloat(pChange) - 3.5).toFixed(2)}%`,
          `D) 10.00%`
        ];
        correctAnswer = 0;
        formula = `% Change = (New Value - Old Value) / Old Value × 100`;
        explanation = `**Step 1:** Change = Q3 - Q2 = ${q3} - ${q2} = ${diff}.\n**Step 2:** % Change = (${diff} / ${q2}) × 100 = **${pChange}%**.`;
        hints = [`Always divide by the initial base value (Q2).`];
      } else {
        // Verbal Ability
        statement = `**Verbal Concept (${subCat}):** Select the word that is most nearly **opposite** in meaning (Antonym) to: **'TRANSIENT'**.`;
        options = [
          "A) Permanent",
          "B) Fleeting",
          "C) Ephemeral",
          "D) Impermanent"
        ];
        correctAnswer = 0;
        formula = `Transient means lasting for a short time; opposite is Permanent.`;
        explanation = `'Transient' means temporary or short-lived. 'Fleeting' and 'Ephemeral' are synonyms. The antonym is **Permanent**.`;
        hints = [`Look for a word indicating long-lasting or eternal duration.`];
      }

      result.push({
        id: idCounter++,
        slug,
        title,
        category: subject,
        subCategory: subCat,
        difficulty,
        examTags: tags,
        acceptanceRate,
        totalAttempts: 2500 + (idx * 340),
        avgTimeInSec: avgTimeSec,
        statement,
        options,
        correctAnswer,
        formula,
        explanation,
        hints,
        discussion: [
          { id: idCounter * 10, user: "Divya Ingle", comment: "Great practice question for competitive exam speed!", upvotes: 14, timeAgo: "1 day ago" }
        ]
      });
    });
  });

  return result;
}

module.exports = generate400Questions;
