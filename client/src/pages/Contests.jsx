import React, { useState, useEffect } from 'react';
import { fetchContests } from '../services/api';
import MockExamInterface from '../components/MockExamInterface';
import { Swords, Clock, Trophy, Users, Award, Play } from 'lucide-react';

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeContestMode, setActiveContestMode] = useState(null);

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    setLoading(true);
    try {
      const data = await fetchContests();
      setContests(data);
    } catch (err) {
      console.error("Failed to load contests", err);
    } finally {
      setLoading(false);
    }
  };

  if (activeContestMode) {
    return <MockExamInterface contest={activeContestMode} onExit={() => setActiveContestMode(null)} />;
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>CodeQuest Contests & Real Mock Exams</span>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-500/30">Live Test Mode</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Compete in timed weekly speed runs and national mock test series simulating actual TCS NQT and IBPS PO exam environments.
        </p>
      </div>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
            Loading Contests...
          </div>
        ) : (
          contests.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    c.status === 'active' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 animate-pulse' :
                    c.status === 'upcoming' ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/40' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {c.status === 'active' ? '🔥 LIVE NOW' : c.status === 'upcoming' ? '🗓 UPCOMING' : 'FINISHED'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                    {c.durationMins} Mins • {c.totalQuestions} Qs
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{c.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.banner}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>Participants:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {c.participantsCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>Reward Badge:</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> {c.badge}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveContestMode(c)}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                  c.status === 'active'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:opacity-90'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <Play className="w-4 h-4 fill-current" /> Enter Real Exam Mode
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
