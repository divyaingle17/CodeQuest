import React from 'react';

export default function Heatmap({ data = [] }) {
  // Color scale mapping for 0, 1, 2, 3+ submissions
  const getColor = (count) => {
    if (!count || count === 0) return 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800';
    if (count === 1) return 'bg-emerald-200 dark:bg-emerald-900/80 border-emerald-300 dark:border-emerald-700/50';
    if (count === 2) return 'bg-emerald-400 dark:bg-emerald-600 border-emerald-500';
    if (count >= 3) return 'bg-emerald-500 dark:bg-emerald-400 border-emerald-600 dark:border-emerald-300 shadow-sm shadow-emerald-400/50';
    return 'bg-slate-200 dark:bg-slate-800';
  };

  return (
    <div className="p-5 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>📅 Submissions Activity</span>
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({data.reduce((acc, curr) => acc + curr.count, 0)} solved in last 60 days)</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/80"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-600"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-400"></div>
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-start">
        {data.map((item, idx) => (
          <div
            key={idx}
            title={`${item.date}: ${item.count} questions solved`}
            className={`w-3.5 h-3.5 rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getColor(item.count)}`}
          />
        ))}
      </div>
    </div>
  );
}
