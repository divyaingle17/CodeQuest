import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Flag, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MockExamInterface({ contest, onExit }) {
  const { setActiveTab } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState((contest?.durationMins || 30) * 60);
  const [submitted, setSubmitted] = useState(false);

  // Mock Exam Question Set
  const questions = [
    {
      id: 1,
      section: "Quantitative Aptitude",
      question: "A and B working together can complete a job in 12 days. B alone can do it in 30 days. How many days will A alone take to finish the work?",
      options: ["A) 18 days", "B) 20 days", "C) 24 days", "D) 15 days"],
      correct: 1
    },
    {
      id: 2,
      section: "Quantitative Aptitude",
      question: "A train running at 54 km/h crosses a pole in 20 seconds. What is the length of the train in meters?",
      options: ["A) 250m", "B) 300m", "C) 350m", "D) 400m"],
      correct: 1
    },
    {
      id: 3,
      section: "Logical Reasoning",
      question: "Looking at a portrait, a man said: 'I have no brother or sister, but that man's father is my father's son.' Whose portrait was he looking at?",
      options: ["A) His own", "B) His son's", "C) His father's", "D) His nephew's"],
      correct: 1
    },
    {
      id: 4,
      section: "Logical Reasoning",
      question: "If 'TIGER' is coded as 'QDFHS', how is 'HORSE' coded in the same pattern?",
      options: ["A) GNQRD", "B) EDRQN", "C) FNRQD", "D) FNRQE"],
      correct: 2
    },
    {
      id: 5,
      section: "Data Interpretation",
      question: "If total sales in Q1 were $50,000 and Q2 saw a 20% increase followed by a 10% decrease in Q3, what were the Q3 total sales?",
      options: ["A) $54,000", "B) $52,000", "C) $50,000", "D) $58,000"],
      correct: 0
    }
  ];

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const handleSelectOption = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const toggleFlag = () => {
    setFlagged(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const handleSubmitExam = () => {
    setSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (idx) => {
    if (answers[idx] !== undefined && flagged[idx]) return 'bg-purple-600 text-white'; // Answered & Marked
    if (answers[idx] !== undefined) return 'bg-emerald-500 text-slate-950 font-bold'; // Answered
    if (flagged[idx]) return 'bg-amber-500 text-slate-950'; // Marked for review
    if (idx === currentIdx) return 'bg-slate-700 text-cyan-300 ring-2 ring-cyan-400';
    return 'bg-slate-800 text-slate-400 hover:bg-slate-700';
  };

  if (submitted) {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score += 10;
    });

    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Exam Completed!</h2>
            <p className="text-sm text-slate-400 mt-1">{contest?.title || 'Mock Aptitude Contest'}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400">{score} / {questions.length * 10}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Attempted</div>
              <div className="text-lg sm:text-xl font-bold text-cyan-400">{Object.keys(answers).length} / {questions.length}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Accuracy</div>
              <div className="text-lg sm:text-xl font-bold text-amber-400">
                {Object.keys(answers).length > 0 ? Math.round((score / (Object.keys(answers).length * 10)) * 100) : 0}%
              </div>
            </div>
          </div>

          <button
            onClick={() => { setActiveTab('contests'); if(onExit) onExit(); }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-sm text-white hover:opacity-90 transition"
          >
            Back to Contests & Analytics
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Test Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{contest?.title || 'TCS NQT / IBPS Live Exam Mode'}</h2>
            <span className="text-[11px] text-cyan-400 font-semibold">{q.section}</span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-amber-400 font-mono font-bold text-xs sm:text-sm">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
          <button
            onClick={handleSubmitExam}
            className="px-4 sm:px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Examination Split Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Question Pane (Col span 3) */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <button
                onClick={toggleFlag}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  flagged[currentIdx] ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{flagged[currentIdx] ? 'Marked for Review' : 'Mark for Review'}</span>
                <span className="sm:hidden">{flagged[currentIdx] ? 'Marked' : 'Mark'}</span>
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed mb-6">
              {q.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200 font-semibold ring-1 ring-cyan-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-8">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIdx === questions.length - 1}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 transition"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right TCS-Style Question Palette (Col span 1) */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Question Palette</h3>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center transition ${getStatusColor(idx)}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Status Legend */}
            <div className="space-y-2 text-xs text-slate-400 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-600"></span> Marked & Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-500"></span> Marked for Review
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-800"></span> Not Attempted
              </div>
            </div>
          </div>

          <button
            onClick={() => onExit && onExit()}
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
          >
            Exit Exam Mode
          </button>
        </div>

      </div>
    </div>
  );
}
