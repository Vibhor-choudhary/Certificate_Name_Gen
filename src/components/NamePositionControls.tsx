import React from 'react';
import { ArrowUp, ArrowDown, RotateCcw, Move, AlignCenter, ArrowLeft, ArrowRight } from 'lucide-react';

interface NamePositionControlsProps {
  position: { x: number; y: number };
  onChangePosition: (pos: { x: number; y: number }) => void;
  defaultPosition: { x: number; y: number };
  viewBox: { width: number; height: number };
}

export const NamePositionControls: React.FC<NamePositionControlsProps> = ({
  position,
  onChangePosition,
  defaultPosition,
  viewBox,
}) => {
  const percentageY = Math.round((position.y / viewBox.height) * 100);

  const handleNudge = (deltaX: number, deltaY: number) => {
    const newX = Math.max(100, Math.min(viewBox.width - 100, position.x + deltaX));
    const newY = Math.max(150, Math.min(viewBox.height - 150, position.y + deltaY));
    onChangePosition({ x: newX, y: newY });
  };

  const handleReset = () => {
    onChangePosition({ x: defaultPosition.x, y: defaultPosition.y });
  };

  const handleCenter = () => {
    onChangePosition({ x: Math.round(viewBox.width / 2), y: position.y });
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Move className="w-3.5 h-3.5 text-amber-600" />
          Name Position
        </span>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500">
            Y: {percentageY}% ({position.y}px)
          </span>
          <button
            type="button"
            onClick={handleReset}
            title="Reset position to default"
            className="text-[11px] font-medium text-slate-500 hover:text-amber-700 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-1">
        <input
          type="range"
          min={Math.round(viewBox.height * 0.25)}
          max={Math.round(viewBox.height * 0.75)}
          step="2"
          value={position.y}
          onChange={(e) =>
            onChangePosition({ x: position.x, y: Number(e.target.value) })
          }
          className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>Higher (Up)</span>
          <span>Default Line</span>
          <span>Lower (Down)</span>
        </div>
      </div>

      {/* Nudge Buttons */}
      <div className="flex items-center justify-between gap-1.5 pt-0.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleNudge(0, -8)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-600" /> Up
          </button>
          <button
            type="button"
            onClick={() => handleNudge(0, 8)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 text-amber-600" /> Down
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleNudge(-15, 0)}
            title="Nudge Left"
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCenter}
            title="Center Horizontally"
            className="px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <AlignCenter className="w-3.5 h-3.5 text-amber-600" /> Center
          </button>
          <button
            type="button"
            onClick={() => handleNudge(15, 0)}
            title="Nudge Right"
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
        <span>💡 <em>Tip: You can also drag the name directly on the certificate above!</em></span>
      </div>
    </div>
  );
};
