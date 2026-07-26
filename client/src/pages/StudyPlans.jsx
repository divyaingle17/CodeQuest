import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { fetchStudyPlans } from '../services/api';
import { BookOpen, Calendar, CheckCircle2, Lock, Sparkles, Users, ArrowRight } from 'lucide-react';

export default function StudyPlans() {
  const { openQuestion } = useApp();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await fetchStudyPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to load study plans", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Targeted Study Plans</span>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 text-xs font-bold border border-cyan-500/30">Company & Exam Tracks</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Structured 14-day to 30-day crash courses designed to master high-frequency aptitude questions for IT campus placements & Government competitive exams.
        </p>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
            Loading Study Plans...
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              {/* Plan Banner */}
              <div className={`p-6 bg-gradient-to-r ${plan.bannerColor} space-y-3`}>
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
                    {plan.targetExam}
                  </span>
                  <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md">
                    <Calendar className="w-3.5 h-3.5" /> {plan.durationDays} Days
                  </span>
                </div>
                <h3 className="text-xl font-black text-white leading-tight">{plan.title}</h3>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{plan.description}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-cyan-500" /> {plan.enrolledCount.toLocaleString()} Enrolled
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free Access</span>
                </div>

                {/* Day Modules Sample */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Curriculum Preview</h4>
                  {plan.modules.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {m.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {m.status === 'in_progress' && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />}
                        {m.status === 'locked' && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                        <span className={`truncate font-medium ${m.status === 'locked' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                          Day {m.day}: {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.questionCount} Qs</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openQuestion('time-and-work-pipes-cisterns-efficiency')}
                  className="solve-btn w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 font-bold text-xs text-white hover:opacity-90 transition flex items-center justify-center gap-1.5 shadow-lg"
                >
                  Start Track <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
