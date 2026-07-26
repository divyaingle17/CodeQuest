import React from 'react';
import { X, ArrowUpRight, Bookmark, CheckCircle2, Zap, Clock, BookOpen, Tag, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuickPreviewModal({ isOpen, onClose, question }) {
  const { openQuestion, bookmarks, toggleBookmark } = useApp();

  if (!isOpen || !question) return null;

  const isBookmarked = bookmarks.includes(question.slug);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl transition-all">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Practice Preview</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{question.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(question.slug)}
              className={`p-2 rounded-xl border transition ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                  : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-500 border-slate-200 dark:border-slate-700'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-bold border ${
              question.difficulty === 'Easy' ? 'badge-easy bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
              question.difficulty === 'Medium' ? 'badge-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
              'badge-hard bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
            }`}>
              {question.difficulty}
            </span>

            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium">
              {question.category}
            </span>

            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-mono">
              Acceptance: {question.acceptanceRate}
            </span>
          </div>

          {/* Exam Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Target Exam Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {question.examTags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Problem Statement Preview */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Problem Statement Preview</h4>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans line-clamp-4">
              {question.statement}
            </div>
          </div>

          {/* Quick Shortcut Trick */}
          {question.formula && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Shortcut Math Trick
              </div>
              <p className="font-mono text-cyan-700 dark:text-cyan-300 font-semibold">{question.formula}</p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-xs transition"
          >
            Close Preview
          </button>

          <button
            onClick={() => { onClose(); openQuestion(question.slug); }}
            className="solve-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 transition hover:scale-105"
          >
            Solve Full Arena Question <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
