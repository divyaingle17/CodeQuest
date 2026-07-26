import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DailyStreakModal from './DailyStreakModal';
import AuthModal from './AuthModal';
import { 
  Code2, Flame, Coins, Trophy, BookOpen, Swords, BarChart3, User, 
  Sparkles, Menu, X, LogIn, LogOut, Shield 
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, setActiveTab, userProfile,
    currentUser, setShowAuthModal, setAuthMode, handleLogout 
  } = useApp();

  const [showStreakModal, setShowStreakModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'problems', label: 'Problems', icon: Code2 },
    { id: 'studyplans', label: 'Study Plans', icon: BookOpen },
    { id: 'contests', label: 'Contests & Mocks', icon: Swords },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile Stats', icon: BarChart3 },
  ];

  if (currentUser?.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Control', icon: Shield });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16">
          
          {/* Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 md:hidden hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => { setActiveTab('problems'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
                  Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">Quest</span>
                </span>
                <span className="block text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase">Master Aptitude & Coding</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                      isActive
                        ? 'nav-link-active bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-indigo-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'nav-link-inactive text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Stats & Auth Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Streak Counter */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition"
              title="Click to view daily practice streak rewards"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span className="hidden sm:inline">{currentUser?.streakDays || userProfile?.streakDays || 7} Days</span>
              <span className="sm:hidden">{currentUser?.streakDays || userProfile?.streakDays || 7}d</span>
            </button>

            {/* Coins */}
            <button
              onClick={() => setShowStreakModal(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-300 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition"
              title="Click to view QuestCoins balance & rewards"
            >
              <Coins className="w-4 h-4 text-yellow-500" />
              <span>{currentUser?.coins || userProfile?.coins || 450}</span>
            </button>

            {/* Auth Control: Log In / Profile Avatar */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition flex items-center gap-2"
                  title={`Logged in as ${currentUser.username} (${currentUser.role})`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow ${
                    currentUser.role === 'admin' ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-cyan-500 to-indigo-600'
                  }`}>
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden xl:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {currentUser.username}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500 transition"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-700 shadow-md flex items-center gap-1.5 transition"
              >
                <LogIn className="w-3.5 h-3.5" /> Log In
              </button>
            )}

          </div>

        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-3 transition ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Auth Modal & Streak Modal */}
      <AuthModal />
      <DailyStreakModal isOpen={showStreakModal} onClose={() => setShowStreakModal(false)} />
    </>
  );
}
