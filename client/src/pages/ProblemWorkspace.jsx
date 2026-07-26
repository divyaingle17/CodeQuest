import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchQuestionBySlug, submitQuestionAnswer } from '../services/api';
import ScratchpadModal from '../components/ScratchpadModal';
import FormulaSheetModal from '../components/FormulaSheetModal';
import AiExplainerModal from '../components/AiExplainerModal';
import { 
  ArrowLeft, Clock, Edit3, Zap, Sparkles, CheckCircle2, XCircle, 
  HelpCircle, BookOpen, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, Share2, Play, Sun, Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProblemWorkspace() {
  const { currentSlug, setActiveTab, theme, toggleTheme } = useApp();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive Workspace State
  const [selectedOption, setSelectedOption] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeLeftTab, setActiveLeftTab] = useState('description'); // description, solution, discussion
  const [openHintIdx, setOpenHintIdx] = useState(null);

  // Modals state
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const [showAiTutor, setShowAiTutor] = useState(false);

  // Submission Result State
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, [currentSlug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadQuestion = async () => {
    setLoading(true);
    try {
      const data = await fetchQuestionBySlug(currentSlug);
      setQuestion(data);
    } catch (err) {
      console.error("Failed to load question detail", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null || submitting) return;
    setSubmitting(true);
    try {
      const res = await submitQuestionAnswer(currentSlug, selectedOption, timerSeconds);
      setSubmissionResult(res);
      if (res.isCorrect) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      setActiveLeftTab('solution'); // Automatically switch left panel to step-by-step solution
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading || !question) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
        Loading Question Arena...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:h-screen bg-slate-50 dark:bg-slate-950 overflow-y-auto lg:overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Workspace Top Toolbar */}
      <div className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 flex items-center justify-between shrink-0 shadow-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setActiveTab('problems')}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition border border-slate-200 dark:border-slate-700 shrink-0"
            title="Back to Problem List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px] sm:max-w-xs">
            {question.title}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
            question.difficulty === 'Easy' ? 'badge-easy bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
            question.difficulty === 'Medium' ? 'badge-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
            'badge-hard bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
          }`}>
            {question.difficulty}
          </span>
        </div>

        {/* Action Tools & Timer */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Live Timer */}
          <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          {/* Digital Scratchpad Trigger */}
          <button
            onClick={() => setShowScratchpad(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Scratchpad"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden md:inline">Scratchpad</span>
          </button>

          {/* Formula Sheet Trigger */}
          <button
            onClick={() => setShowFormulaSheet(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Formulas"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden md:inline">Formulas</span>
          </button>

          {/* AI Explainer Trigger */}
          <button
            onClick={() => setShowAiTutor(true)}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition"
            title="Ask AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>

      {/* Main 2-Pane Split Workspace Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 lg:overflow-hidden">
        
        {/* Left Pane: Description, Solution & Discussion */}
        <div className="flex flex-col bg-white dark:bg-slate-900/60 lg:overflow-hidden">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 sm:px-4 pt-2 gap-1.5 sm:gap-2 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveLeftTab('description')}
              className={`px-3 sm:px-4 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition ${
                activeLeftTab === 'description'
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t-2 border-cyan-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Description
            </button>
            <button
              onClick={() => setActiveLeftTab('solution')}
              className={`px-3 sm:px-4 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition ${
                activeLeftTab === 'solution'
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t-2 border-emerald-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Solution & Formulas
            </button>
            <button
              onClick={() => setActiveLeftTab('discussion')}
              className={`px-3 sm:px-4 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition ${
                activeLeftTab === 'discussion'
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t-2 border-indigo-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500" /> Discussion ({question.discussion?.length || 0})
            </button>
          </div>

          {/* Left Panel Content Body */}
          <div className="flex-1 p-4 sm:p-6 lg:overflow-y-auto space-y-6">
            
            {activeLeftTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{question.title}</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {question.examTags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-sans whitespace-pre-line shadow-inner">
                  {question.statement}
                </div>

                {/* Progressive Hints Accordion */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progressive Hints</h4>
                  {question.hints.map((hint, idx) => (
                    <div key={idx} className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setOpenHintIdx(openHintIdx === idx ? null : idx)}
                        className="w-full px-4 py-3 text-left text-xs font-semibold text-amber-600 dark:text-amber-300 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-amber-500" /> Hint {idx + 1}
                        </span>
                        {openHintIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {openHintIdx === idx && (
                        <div className="px-4 pb-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 pt-2 bg-white dark:bg-slate-900/50">
                          {hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLeftTab === 'solution' && (
              <div className="space-y-6">
                {/* Shortcut Formula Box */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 space-y-1.5">
                  <h4 className="text-xs font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    <Zap className="w-4 h-4" /> Shortcut Math Trick / Key Formula
                  </h4>
                  <div className="font-mono text-xs bg-white dark:bg-slate-950 p-3 rounded-xl border border-amber-500/20 text-cyan-700 dark:text-cyan-300 font-bold shadow-inner">
                    {question.formula}
                  </div>
                </div>

                {/* Step-by-Step Derivation */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Detailed Step-by-Step Solution</h4>
                  {question.explanation}
                </div>
              </div>
            )}

            {activeLeftTab === 'discussion' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Community Discussion & Solutions</h4>
                {question.discussion.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{d.user}</span>
                      <span className="text-slate-400 text-[11px]">{d.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{d.comment}</p>
                    <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <button className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                        <ThumbsUp className="w-3.5 h-3.5" /> {d.upvotes} Upvotes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Right Pane: Option Selector & Submission Control */}
        <div className="flex flex-col bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 justify-between lg:overflow-y-auto space-y-6">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Select Your Answer:</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Single Choice (4 Options)</span>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let borderStyle = 'border-slate-200 dark:border-slate-800/90 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700';

                if (submissionResult) {
                  if (idx === question.correctAnswer) {
                    borderStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold';
                  } else if (isSelected && !submissionResult.isCorrect) {
                    borderStyle = 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold';
                  }
                } else if (isSelected) {
                  borderStyle = 'border-cyan-500 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200 font-semibold ring-2 ring-cyan-500/30';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between shadow-sm ${borderStyle}`}
                  >
                    <span>{opt}</span>
                    {isSelected && !submissionResult && <div className="w-4 h-4 rounded-full bg-cyan-500 shrink-0" />}
                    {submissionResult && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                    {submissionResult && isSelected && !submissionResult.isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Live Result Feedback Banner */}
            {submissionResult && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                submissionResult.isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="font-bold flex items-center gap-2 text-sm">
                  {submissionResult.isCorrect ? (
                    <> <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Accepted! +10 Coins Earned </>
                  ) : (
                    <> <XCircle className="w-5 h-5 text-rose-500" /> Incorrect Answer </>
                  )}
                </div>
                <p>
                  {submissionResult.isCorrect 
                    ? "Great job! You solved it efficiently. Check the solution tab for the shortcut derivation."
                    : `Correct option was: ${submissionResult.correctOptionText}. Switch to Solution tab for detailed derivation.`}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Submit Button */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || submitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition disabled:opacity-40 shadow-lg shadow-cyan-500/20 hover:scale-[1.01]"
            >
              {submitting ? 'Evaluating...' : submissionResult ? 'Resubmit Answer' : 'Submit & Check Answer'}
            </button>
          </div>

        </div>

      </div>

      {/* Modals */}
      <ScratchpadModal isOpen={showScratchpad} onClose={() => setShowScratchpad(false)} />
      <FormulaSheetModal isOpen={showFormulaSheet} onClose={() => setShowFormulaSheet(false)} />
      <AiExplainerModal isOpen={showAiTutor} onClose={() => setShowAiTutor(false)} question={question} />

    </div>
  );
}
