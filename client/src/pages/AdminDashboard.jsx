import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchQuestions, fetchAdminUsers, createAdminQuestion, deleteAdminQuestion } from '../services/api';
import { 
  Shield, Plus, Trash2, Users, BookOpen, CheckCircle2, Award, Zap, 
  Search, RefreshCw, AlertCircle, Sparkles, Filter 
} from 'lucide-react';

export default function AdminDashboard() {
  const { currentUser, setActiveTab } = useApp();
  
  const [usersList, setUsersList] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('questions'); // 'questions', 'users', 'addQuestion'

  // New Question Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Quantitative Aptitude');
  const [subCategory, setSubCategory] = useState('General Aptitude');
  const [difficulty, setDifficulty] = useState('Medium');
  const [examTags, setExamTags] = useState('TCS NQT, GATE CS');
  const [statement, setStatement] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [formula, setFormula] = useState('');

  const [formMsg, setFormMsg] = useState({ type: '', text: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const qData = await fetchQuestions({});
      setQuestionsList(qData.questions || []);

      const uData = await fetchAdminUsers();
      setUsersList(uData || []);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });
    setCreating(true);

    try {
      const tagsArray = examTags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await createAdminQuestion({
        title,
        category,
        subCategory,
        difficulty,
        examTags: tagsArray,
        statement,
        options: [opt0, opt1, opt2, opt3].filter(Boolean),
        correctAnswer: parseInt(correctAnswer),
        explanation,
        formula
      });

      setFormMsg({ type: 'success', text: 'Question added successfully to the Question Bank!' });
      // Reset form
      setTitle('');
      setStatement('');
      setOpt0('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setExplanation('');
      setFormula('');

      loadData();
    } catch (err) {
      setFormMsg({ type: 'error', text: err.message || 'Failed to add question' });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteAdminQuestion(id);
      setQuestionsList(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      alert("Failed to delete question.");
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/30">
          <Shield className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          You need an Administrator account to access the platform management panel.
        </p>
        <button
          onClick={() => setActiveTab('problems')}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          Return to Problems
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8">
      
      {/* Admin Top Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
              <Shield className="w-3.5 h-3.5" /> Administrator Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              CodeQuest Master Management Panel
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200">
              Manage aptitude question bank, create new exam problems, monitor registered user stats, & oversee platform health.
            </p>
          </div>

          <button
            onClick={() => setActiveAdminTab('addQuestion')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-xs text-white shadow-lg hover:scale-105 transition flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add New Problem
          </button>
        </div>

        {/* System Stats Overview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-indigo-800/50">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
            <div className="text-[11px] text-indigo-300 font-bold uppercase">Total Question Bank</div>
            <div className="text-xl font-black text-white">{questionsList.length} Qs</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
            <div className="text-[11px] text-indigo-300 font-bold uppercase">Registered Users</div>
            <div className="text-xl font-black text-cyan-300">{usersList.length} Accounts</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
            <div className="text-[11px] text-indigo-300 font-bold uppercase">Exam Tracks</div>
            <div className="text-xl font-black text-amber-300">6 Major Exams</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20">
            <div className="text-[11px] text-indigo-300 font-bold uppercase">Server Health</div>
            <div className="text-xl font-black text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span> 100% Online
            </div>
          </div>
        </div>
      </div>

      {/* Admin Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
        <button
          onClick={() => setActiveAdminTab('questions')}
          className={`px-5 py-3 rounded-t-2xl font-bold text-xs flex items-center gap-2 transition ${
            activeAdminTab === 'questions'
              ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border-t-2 border-cyan-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Manage Question Bank ({questionsList.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-5 py-3 rounded-t-2xl font-bold text-xs flex items-center gap-2 transition ${
            activeAdminTab === 'users'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Registered Users ({usersList.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('addQuestion')}
          className={`px-5 py-3 rounded-t-2xl font-bold text-xs flex items-center gap-2 transition ${
            activeAdminTab === 'addQuestion'
              ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-t-2 border-emerald-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" /> Add New Question Form
        </button>
      </div>

      {/* Admin Content Panels */}

      {/* 1. Manage Questions Panel */}
      {activeAdminTab === 'questions' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Question Repository</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Total {questionsList.length} items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Title & Category</th>
                  <th className="py-4 px-6">Target Exams</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {questionsList.slice(0, 50).map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500 dark:text-slate-400">#{q.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 dark:text-white">{q.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{q.category}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {q.examTags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        q.difficulty === 'Easy' ? 'badge-easy bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                        q.difficulty === 'Medium' ? 'badge-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                        'badge-hard bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Registered Users Panel */}
      {activeAdminTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Registered Accounts & User Directory</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">User / Email</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Rating & Solved</th>
                  <th className="py-4 px-6">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6 font-mono text-slate-400">#{u.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                      <div>{u.username}</div>
                      <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {u.role === 'admin' ? '👑 Admin' : '👤 Student'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 dark:text-slate-300">
                      Rating: {u.rating} • Solved: {u.solvedCount} Qs
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{u.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Add New Question Form */}
      {activeAdminTab === 'addQuestion' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-500" /> Create New Question for Question Bank
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fill in the details below to add a new aptitude/coding problem to the active user bank.</p>
          </div>

          {formMsg.text && (
            <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              formMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{formMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleCreateQuestion} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Question Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Work Efficiency of Pipes and Cisterns"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                  <option value="Verbal Ability">Verbal Ability</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Exam Tags (Comma Separated)</label>
              <input
                type="text"
                value={examTags}
                onChange={(e) => setExamTags(e.target.value)}
                placeholder="TCS NQT, GATE CS, SSC CGL"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Question Problem Statement</label>
              <textarea
                rows="4"
                required
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                placeholder="Write the full problem description..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-sans"
              />
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Option A</label>
                <input
                  type="text"
                  required
                  value={opt0}
                  onChange={(e) => setOpt0(e.target.value)}
                  placeholder="e.g. A) 15 Days"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Option B</label>
                <input
                  type="text"
                  required
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  placeholder="e.g. B) 20 Days"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Option C</label>
                <input
                  type="text"
                  required
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  placeholder="e.g. C) 25 Days"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Option D</label>
                <input
                  type="text"
                  required
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  placeholder="e.g. D) 30 Days"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Correct Option Index</label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value={0}>Option A (Index 0)</option>
                  <option value={1}>Option B (Index 1)</option>
                  <option value={2}>Option C (Index 2)</option>
                  <option value={3}>Option D (Index 3)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Key Formula / Trick</label>
                <input
                  type="text"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  placeholder="e.g. Net Work = A + B - C"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Detailed Step-by-Step Explanation</label>
              <textarea
                rows="3"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain the step-by-step solution derivation..."
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm hover:opacity-95 transition shadow-lg disabled:opacity-50"
            >
              {creating ? 'Adding Question...' : 'Publish Question to Platform'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
