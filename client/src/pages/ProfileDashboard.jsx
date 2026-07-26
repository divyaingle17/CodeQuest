import React from 'react';
import { useApp } from '../context/AppContext';
import Heatmap from '../components/Heatmap';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Trophy, Flame, Coins, CheckCircle2, Award, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function ProfileDashboard() {
  const { userProfile, theme } = useApp();

  if (!userProfile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
        Loading User Analytics Profile...
      </div>
    );
  }

  const { solvedCounts, totalAvailable, categoryScores, earnedBadges, recentSubmissions, activityGraph } = userProfile;

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Profile Top Hero Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl transition-all">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-cyan-500/20 border-2 border-slate-200 dark:border-slate-700">
            D
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              {userProfile.username}
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-500/30">
                Rating: {userProfile.rating}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Exam Target: TCS NQT & SSC CGL 2026</p>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
          <div className="px-4">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Streak</div>
            <div className="text-xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" /> {userProfile.streakDays}d
            </div>
          </div>
          <div className="px-4 border-x border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Global Rank</div>
            <div className="text-xl font-black text-cyan-600 dark:text-cyan-400">#{userProfile.rank}</div>
          </div>
          <div className="px-4">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Coins</div>
            <div className="text-xl font-black text-yellow-600 dark:text-yellow-300 flex items-center justify-center gap-1">
              <Coins className="w-4 h-4 text-yellow-500" /> {userProfile.coins}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Solved Breakdown + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Solved Problems Breakdown Card (Col 1) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between transition-all">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Problems Solved</span>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{solvedCounts.total} Total</span>
          </h3>

          {/* Difficulty Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-600 dark:text-emerald-400">Easy</span>
                <span className="text-slate-500 dark:text-slate-400">{solvedCounts.easy} / {totalAvailable.easy}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${(solvedCounts.easy / totalAvailable.easy) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-amber-600 dark:text-amber-400">Medium</span>
                <span className="text-slate-500 dark:text-slate-400">{solvedCounts.medium} / {totalAvailable.medium}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${(solvedCounts.medium / totalAvailable.medium) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-rose-600 dark:text-rose-400">Hard</span>
                <span className="text-slate-500 dark:text-slate-400">{solvedCounts.hard} / {totalAvailable.hard}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${(solvedCounts.hard / totalAvailable.hard) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 text-center">
            Speed vs Accuracy index: <span className="font-bold text-emerald-600 dark:text-emerald-400">Top 8% in Quant</span>
          </div>
        </div>

        {/* Skill Mastery Radar Chart (Col 2 & 3) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-4 transition-all">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Aptitude Subject Mastery Radar</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={categoryScores}>
                <PolarGrid stroke={theme === 'light' ? '#cbd5e1' : '#334155'} />
                <PolarAngleAxis dataKey="subject" stroke={theme === 'light' ? '#475569' : '#94a3b8'} tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={theme === 'light' ? '#94a3b8' : '#475569'} />
                <Radar name="User Mastery" dataKey="score" stroke="#0284c7" fill="#0284c7" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Heatmap Calendar Section */}
      <Heatmap data={activityGraph} />

      {/* Badges & Recent Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Earned Badges */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 transition-all">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> Earned Badges & Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map((b, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="text-2xl">{b.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 transition-all">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Recent Submissions
          </h3>
          <div className="space-y-2">
            {recentSubmissions.map((sub, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-white">{sub.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{sub.date} • Spent {sub.timeSpent}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                  sub.result === 'Accepted'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                }`}>
                  {sub.result}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
