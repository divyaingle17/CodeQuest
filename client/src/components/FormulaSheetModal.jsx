import React, { useState } from 'react';
import { X, BookOpen, Zap, Calculator, Compass, Book } from 'lucide-react';

export default function FormulaSheetModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('quant');

  if (!isOpen) return null;

  const formulas = {
    quant: [
      {
        title: "Time & Work (LCM Method)",
        rule: "Total Work = Efficiency × Time",
        details: "Assume Total Work = LCM of individual times. Pipe filling is (+), Pipe emptying is (-)."
      },
      {
        title: "Speed, Distance & Time Conversion",
        rule: "1 km/h = 5/18 m/s  |  1 m/s = 18/5 km/h",
        details: "Relative Speed: Same direction = (S1 - S2), Opposite direction = (S1 + S2)."
      },
      {
        title: "Successive Discount Formula",
        rule: "Net Discount % = (d1 + d2 - (d1 × d2 / 100))%",
        details: "Apply on Marked Price: Selling Price = MP × (1 - d1/100) × (1 - d2/100)."
      },
      {
        title: "Permutations with Repetition",
        rule: "Ways = n! / (p1! × p2! ... pk!)",
        details: "Where n is total letters, and p1, p2 are frequencies of repeated items."
      }
    ],
    reasoning: [
      {
        title: "Coded Blood Relations Symbols",
        rule: "Male = (+), Female = (-), Married Pair = (⇔), Siblings = (-)",
        details: "Work backwards from the target node or sketch a quick family tree."
      },
      {
        title: "Syllogism Possibility Rule",
        rule: "Possibility holds if no direct statement contradicts it.",
        details: "'Some' doesn't mean 'All not'. Check non-overlapping regions in Venn diagram."
      },
      {
        title: "Clock Angles Formula",
        rule: "Angle θ = | 30H - (11/2)M |",
        details: "H is hours, M is minutes. Use absolute value."
      }
    ],
    di: [
      {
        title: "Pie Chart Degree Conversion",
        rule: "100% = 360°  =>  1% = 3.6°",
        details: "Value = (Angle / 360°) × Total Total Amount."
      },
      {
        title: "Percentage Change Shortcut",
        rule: "Net % Change = (New Value - Old Value) / Old Value × 100",
        details: "Use ratio simplification to avoid calculating large numbers!"
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Aptitude Cheat Sheet & Formulae</h3>
              <p className="text-xs text-slate-400">Quick tricks & high-frequency shortcuts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveCategory('quant')}
            className={`px-4 py-2.5 rounded-t-xl font-medium text-xs flex items-center gap-2 transition ${activeCategory === 'quant' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Calculator className="w-4 h-4" /> Quantitative Aptitude
          </button>
          <button
            onClick={() => setActiveCategory('reasoning')}
            className={`px-4 py-2.5 rounded-t-xl font-medium text-xs flex items-center gap-2 transition ${activeCategory === 'reasoning' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Compass className="w-4 h-4" /> Logical Reasoning
          </button>
          <button
            onClick={() => setActiveCategory('di')}
            className={`px-4 py-2.5 rounded-t-xl font-medium text-xs flex items-center gap-2 transition ${activeCategory === 'di' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Book className="w-4 h-4" /> Data Interpretation
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {formulas[activeCategory].map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 transition">
              <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                {f.title}
              </h4>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                {f.rule}
              </div>
              <p className="mt-2 text-xs text-slate-400">{f.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
