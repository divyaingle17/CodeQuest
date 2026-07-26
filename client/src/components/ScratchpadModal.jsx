import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Edit3, Trash2, Download } from 'lucide-react';

export default function ScratchpadModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#38bdf8'); // cyan
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState('pen'); // pen or eraser

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 450;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = tool === 'eraser' ? '#0f172a' : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Digital Math Scratchpad</h3>
              <p className="text-xs text-slate-400">Write equations, rough work & LCM diagrams here</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Color Palette */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
              {['#38bdf8', '#10b981', '#f59e0b', '#f43f5e', '#ffffff'].map(c => (
                <button
                  key={c}
                  onClick={() => { setColor(c); setTool('pen'); }}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full transition-transform ${color === c && tool === 'pen' ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'}`}
                />
              ))}
            </div>

            {/* Tool Selection */}
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setTool('pen')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition ${tool === 'pen' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Pen
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition ${tool === 'eraser' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Eraser className="w-3.5 h-3.5" /> Eraser
              </button>
            </div>

            <button
              onClick={clearCanvas}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative bg-slate-950 p-2 cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full rounded-xl bg-slate-950 touch-none border border-slate-800/60"
          />
          <div className="absolute bottom-4 left-6 pointer-events-none text-xs text-slate-600 font-mono">
            Grid Scratch Mode • Click and drag to write calculations
          </div>
        </div>
      </div>
    </div>
  );
}
