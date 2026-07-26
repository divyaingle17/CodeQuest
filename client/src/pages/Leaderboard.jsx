import React from 'react';
import { Trophy, Flame, Award, Medal, Crown } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: "Aarav_Sharma", rating: 2450, solved: 182, streak: 34, badge: "Master of Quant" },
    { rank: 2, name: "Priya_Verma", rating: 2380, solved: 168, streak: 28, badge: "TCS Grandmaster" },
    { rank: 3, name: "Vikram_Singh", rating: 2290, solved: 154, streak: 21, badge: "Speed Demon" },
    { rank: 4, name: "Sneha_Kulkarni", rating: 2180, solved: 142, streak: 19, badge: "Bank PO Wizard" },
    { rank: 5, name: "Rohan_Gupta", rating: 2050, solved: 129, streak: 15, badge: "Reasoning Genius" },
    { rank: 1420, name: "Divya Ingle (You)", rating: 1845, solved: 48, streak: 7, badge: "7-Day Streak" }
  ];

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-amber-500" /> Global Aptitude Leaderboard
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Rankings updated in real-time based on speed, contest ratings, and problem submission accuracy across IT & Govt Aspirants.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Rank</th>
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Rating</th>
              <th className="py-4 px-6">Solved</th>
              <th className="py-4 px-6">Streak</th>
              <th className="py-4 px-6 text-right">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {leaders.map((u) => {
              const isCurrentUser = u.rank === 1420;
              return (
                <tr
                  key={u.rank}
                  className={`transition ${
                    isCurrentUser
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-l-4 border-l-cyan-500 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                    {u.rank === 1 ? <Crown className="w-5 h-5 text-amber-500" /> :
                     u.rank === 2 ? <Medal className="w-5 h-5 text-slate-400" /> :
                     u.rank === 3 ? <Medal className="w-5 h-5 text-amber-600" /> :
                     `#${u.rank}`}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {u.name}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {u.rating}
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                    {u.solved} Qs
                  </td>
                  <td className="py-4 px-6 text-amber-500 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {u.streak}d
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                      {u.badge}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
