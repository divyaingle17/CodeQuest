import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, LogIn, UserPlus, Shield, Mail, Lock, User, AlertCircle, 
  CheckCircle2, Flame, Trophy, Zap, BookOpen, Sun, Moon 
} from 'lucide-react';

export default function AuthLandingPage() {
  const { handleLogin, handleRegister, theme, toggleTheme } = useApp();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await handleLogin(email, password);
      } else {
        await handleRegister(email, password, username, role);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = async (type) => {
    setError('');
    setLoading(true);
    try {
      if (type === 'student') {
        await handleLogin('student@codequest.com', 'student123');
      } else if (type === 'admin') {
        await handleLogin('admin@codequest.com', 'admin123');
      }
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      
      {/* Top Brand Header Bar */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
              Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">Quest</span>
            </span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase">Master Aptitude & Coding</span>
          </div>
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 shadow-sm transition"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
          )}
        </button>
      </header>

      {/* Main Landing & Auth Gateway Container */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Hero Value Proposition (Col 7) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-500/30 shadow-sm">
            <Sparkles className="w-4 h-4" /> Next-Gen Aptitude & Exam Practice Platform
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Master Aptitude & Tech Placements on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400">CodeQuest</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Sign in or create your account to practice 250+ high-frequency Quantitative, Logical & DI problems with instant step-by-step AI solutions, shortcut formulas, live exam mock series & national leaderboards.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
              <div className="text-cyan-600 dark:text-cyan-400 font-black text-lg">250+ Qs</div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Exam Question Bank</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
              <div className="text-indigo-600 dark:text-indigo-400 font-black text-lg">Instant AI</div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Step-by-Step Tutor</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1 col-span-2 sm:col-span-1">
              <div className="text-amber-600 dark:text-amber-400 font-black text-lg">Live Mocks</div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">TCS NQT & IBPS Tests</div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card (Col 5) */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
            
            {/* Auth Tab Switcher */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-1.5 gap-1">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm border border-slate-200 dark:border-slate-800'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" /> Log In
              </button>

              <button
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-800'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" /> Register New Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name / Username</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Divya Ingle"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition"
                  >
                    <option value="user">Student / Candidate</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : mode === 'login' ? 'Log In & Access Platform' : 'Register Account'}
              </button>

              {/* Quick Demo Login Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Instant Demo Accounts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('student')}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-xs text-slate-700 dark:text-slate-300 font-semibold transition text-center"
                  >
                    Student Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('admin')}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 text-xs text-slate-700 dark:text-slate-300 font-semibold transition text-center flex items-center justify-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5 text-indigo-500" /> Admin Demo
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-4 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-900">
        © 2026 CodeQuest Platform. All rights reserved. Master Quantitative, Logical & Coding Exams.
      </footer>

    </div>
  );
}
