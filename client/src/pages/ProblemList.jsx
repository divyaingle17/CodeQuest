import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchQuestions } from '../services/api';
import QuickPreviewModal from '../components/QuickPreviewModal';
import { 
  Search, Filter, CheckCircle2, Circle, Flame, Tag, ArrowUpRight, Sparkles, Trophy, 
  Bookmark, Eye, Star, RefreshCw, X 
} from 'lucide-react';

export default function ProblemList() {
  const { openQuestion, bookmarks, toggleBookmark } = useApp();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);

  // Quick Preview Modal state
  const [previewQuestion, setPreviewQuestion] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, [selectedCategory, selectedDifficulty, selectedExam, search]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await fetchQuestions({
        category: selectedCategory,
        difficulty: selectedDifficulty,
        examTag: selectedExam,
        search
      });
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Failed to load questions", err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyBadge = (diff) => {
    if (diff === 'Easy') return 'badge-easy bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    if (diff === 'Medium') return 'badge-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
    return 'badge-hard bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
  };

  // Filter for bookmarked items if tab active
  const displayedQuestions = showOnlyBookmarked
    ? questions.filter(q => bookmarks.includes(q.slug))
    : questions;

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Banner / Hero Section */}
      <div className="hero-banner relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 p-6 sm:p-8 shadow-2xl transition-all">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[11px] sm:text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> High-Frequency Exam Aptitude Bank
          </div>
          <h1 className="hero-title text-2xl sm:text-4xl font-black text-white tracking-tight">
            Master Aptitude & Coding on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-300">CodeQuest</span>
          </h1>
          <p className="hero-subtitle text-xs sm:text-sm text-slate-200 leading-relaxed">
            Practice Quantitative Aptitude, Logical Reasoning & Data Interpretation with instant step-by-step solutions, shortcut formulas, digital scratchpad, & speed timer for TCS NQT, GATE, SSC CGL & Bank PO.
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-indigo-200 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 250+ Verified Problems
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Instant Step-by-Step AI Solutions
            </span>
          </div>
        </div>

        {/* Decorative ambient Glow */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none hidden sm:block" />
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-3xl space-y-4 sm:space-y-5 shadow-xl transition-all">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between items-stretch lg:items-center">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems, topics (e.g. Pipes, Trains)..."
              className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Exam Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Exam:
            </span>
            {['All', 'TCS NQT', 'GATE CS', 'SSC CGL', 'IBPS PO', 'UPSC CSAT'].map(exam => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedExam === exam
                    ? 'pill-exam-active bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md scale-105'
                    : 'pill-exam-inactive bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

        </div>

        {/* Secondary Category & Difficulty Tabs */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80 gap-3">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Data Interpretation', 'Verbal Ability'].map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setShowOnlyBookmarked(false); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat && !showOnlyBookmarked
                    ? 'pill-cat-active bg-indigo-100 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40 font-bold'
                    : 'pill-cat-inactive text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Bookmarked Filter Pill */}
            <button
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                showOnlyBookmarked
                  ? 'bg-amber-500 text-slate-950 border border-amber-400 shadow-sm'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${showOnlyBookmarked ? 'fill-current' : ''}`} />
              Bookmarked ({bookmarks.length})
            </button>
          </div>

          {/* Difficulty Pills & Count */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {displayedQuestions.length} Qs
            </span>
            <div className="flex items-center gap-1.5">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Problem Table Container */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3 text-center w-10">★</th>
                <th className="py-3.5 px-3 w-10">Status</th>
                <th className="py-3.5 px-5">Title & Category</th>
                <th className="py-3.5 px-5">Target Exams</th>
                <th className="py-3.5 px-5">Acceptance</th>
                <th className="py-3.5 px-5">Difficulty</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-cyan-500" />
                    Loading Question Bank...
                  </td>
                </tr>
              ) : displayedQuestions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 dark:text-slate-400">
                    No questions found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                displayedQuestions.map((q) => {
                  const isBookmarked = bookmarks.includes(q.slug);
                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition group cursor-pointer"
                      onClick={() => openQuestion(q.slug)}
                    >
                      {/* Bookmark Icon */}
                      <td className="py-4 px-3 text-center" onClick={(e) => { e.stopPropagation(); toggleBookmark(q.slug); }}>
                        <button className="p-1 rounded-md text-slate-400 hover:text-amber-500 transition">
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                      </td>

                      {/* Status Icon */}
                      <td className="py-4 px-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </td>

                      {/* Title & Category */}
                      <td className="py-4 px-5">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition flex items-center gap-2">
                          {q.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {q.category} • <span className="text-slate-400 dark:text-slate-500">{q.subCategory}</span>
                        </div>
                      </td>

                      {/* Exam Tags */}
                      <td className="py-4 px-5">
                        <div className="flex flex-wrap gap-1">
                          {q.examTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Acceptance Rate */}
                      <td className="py-4 px-5 text-slate-700 dark:text-slate-300 font-mono font-medium">
                        {q.acceptanceRate}
                      </td>

                      {/* Difficulty */}
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${getDifficultyBadge(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setPreviewQuestion(q); }}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                            title="Quick Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openQuestion(q.slug); }}
                            className="solve-btn px-3 py-1.5 rounded-xl bg-cyan-600 dark:bg-cyan-500/10 hover:bg-cyan-700 dark:hover:bg-cyan-500 text-white dark:text-cyan-400 dark:hover:text-slate-950 border border-transparent dark:border-cyan-500/30 font-bold text-xs inline-flex items-center gap-1 transition shadow-sm"
                          >
                            Solve <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Preview Modal */}
      <QuickPreviewModal
        isOpen={!!previewQuestion}
        onClose={() => setPreviewQuestion(null)}
        question={previewQuestion}
      />

    </div>
  );
}
