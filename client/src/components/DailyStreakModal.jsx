import React, { useState } from 'react';
import { X, Flame, Coins, Trophy, Calendar, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function DailyStreakModal({ isOpen, onClose }) {
  const { userProfile, setUserProfile } = useApp();
  const [claimedToday, setClaimedToday] = useState(false);

  if (!isOpen) return null;

  const streakDays = userProfile?.streakDays || 7;
  const coins = userProfile?.coins || 450;

  const weekDays = [
    { day: 'Mon', count: 5, status: 'done', label: 'Day 1' },
    { day: 'Tue', count: 8, status: 'done', label: 'Day 2' },
    { day: 'Wed', count: 12, status: 'done', label: 'Day 3' },
    { day: 'Thu', count: 6, status: 'done', label: 'Day 4' },
    { day: 'Fri', count: 10, status: 'done', label: 'Day 5' },
    { day: 'Sat', count: 7, status: 'done', label: 'Day 6' },
    { day: 'Sun', count: 0, status: claimedToday ? 'done' : 'today', label: 'Day 7' },
  ];

  const handleClaimBonus = () => {
    if (claimedToday) return;
    setClaimedToday(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    if (setUserProfile) {
      setUserProfile(prev => prev ? {
        ...prev,
        coins: prev.coins + 20,
        streakDays: prev.streakDays + (claimedToday ? 0 : 1)
      } : prev);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl transition-all">
        
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border-b border-amber-500/20 text-center space-y-2">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30 animate-bounce">
            <Flame className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {streakDays} Day Practice Streak!
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Keep your streak alive by completing at least 1 problem every single day.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Week Streak Tracker */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>This Week's Activity</span>
              <span className="text-amber-500 font-bold">{claimedToday ? '7/7 Completed' : '6/7 Completed'}</span>
            </h4>

            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-between ${
                    d.status === 'done'
                      ? 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400'
                      : 'bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-semibold">{d.day}</span>
                  <div className="my-1">
                    {d.status === 'done' ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                    ) : (
                      <Flame className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-bold">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Bonus Claim Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-yellow-500" /> Daily Practice Reward
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {claimedToday ? 'Bonus claimed for today!' : 'Claim +20 AptiCoins for keeping up your streak.'}
              </p>
            </div>

            <button
              onClick={handleClaimBonus}
              disabled={claimedToday}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-1.5 ${
                claimedToday
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 hover:scale-105'
              }`}
            >
              {claimedToday ? (
                <> <CheckCircle2 className="w-4 h-4" /> Claimed! </>
              ) : (
                <> <Sparkles className="w-4 h-4" /> Claim +20 Coins </>
              )}
            </button>
          </div>

          {/* Streak Benefits */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-500" /> Streak Rewards Milestones
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
              <li className="flex items-center justify-between">
                <span>🔥 7 Days Streak:</span>
                <span className="font-bold text-amber-500">Unlocked ("7-Day Streak" Badge)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>⚡ 14 Days Streak:</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">+100 Bonus Coins & Silver Crown</span>
              </li>
              <li className="flex items-center justify-between">
                <span>👑 30 Days Streak:</span>
                <span className="font-medium text-slate-500 dark:text-slate-400">Exclusive "Grandmaster" Title</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
