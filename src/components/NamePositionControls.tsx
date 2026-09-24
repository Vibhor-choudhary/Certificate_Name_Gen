import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Move,
  AlignCenter,
  ArrowLeft,
  ArrowRight,
  Type,
  Minus,
  Plus,
} from 'lucide-react';

interface NamePositionControlsProps {
  position: { x: number; y: number };
  onChangePosition: (pos: { x: number; y: number }) => void;
  defaultPosition: { x: number; y: number };
  viewBox: { width: number; height: number };
  fontSize?: number;
  onChangeFontSize?: (size: number) => void;
  defaultFontSize?: number;
}

export const NamePositionControls: React.FC<NamePositionControlsProps> = ({
  position,
  onChangePosition,
  defaultPosition,
  viewBox,
  fontSize = 64,
  onChangeFontSize,
  defaultFontSize = 64,
}) => {
  const percentageY = Math.round((position.y / viewBox.height) * 100);

  const handleNudge = (deltaX: number, deltaY: number) => {
    const newX = Math.max(100, Math.min(viewBox.width - 100, position.x + deltaX));
    const newY = Math.max(150, Math.min(viewBox.height - 150, position.y + deltaY));
    onChangePosition({ x: newX, y: newY });
  };

  const handleResetPosition = () => {
    onChangePosition({ x: defaultPosition.x, y: defaultPosition.y });
  };

  const handleCenter = () => {
    onChangePosition({ x: Math.round(viewBox.width / 2), y: position.y });
  };

  const handleNudgeFontSize = (delta: number) => {
    const newSize = Math.max(24, Math.min(88, fontSize + delta));
    onChangeFontSize?.(newSize);
  };

  const handleResetFontSize = () => {
    onChangeFontSize?.(defaultFontSize);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-3 sm:p-3.5 border border-slate-200/80 space-y-3">
      {/* 1. POSITION SELECTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-amber-600" />
            Name Position
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-600 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
              Y: {percentageY}% ({position.y}px)
            </span>
            <button
              type="button"
              onClick={handleResetPosition}
              title="Reset position to default (50%)"
              className="text-[11px] font-medium text-slate-500 hover:text-amber-700 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Position Slider */}
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
            <span>Default Center (50%)</span>
            <span>Lower (Down)</span>
          </div>
        </div>

        {/* Nudge Buttons */}
        <div className="flex items-center justify-between gap-1.5 pt-0.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleNudge(0, -6)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-600" /> Up
            </button>
            <button
              type="button"
              onClick={() => handleNudge(0, 6)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5 text-amber-600" /> Down
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleNudge(-12, 0)}
              title="Nudge Left"
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCenter}
              title="Center Horizontally"
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <AlignCenter className="w-3.5 h-3.5 text-amber-600" /> Center
            </button>
            <button
              type="button"
              onClick={() => handleNudge(12, 0)}
              title="Nudge Right"
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-200/60" />

      {/* 2. SMALL FONT SIZE SELECTION */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-600" />
            Font Size
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-600 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
              {fontSize}px
            </span>
            {fontSize !== defaultFontSize && (
              <button
                type="button"
                onClick={handleResetFontSize}
                title="Reset font size to auto-fit default"
                className="text-[11px] font-medium text-slate-500 hover:text-amber-700 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Auto
              </button>
            )}
          </div>
        </div>

        {/* Font Size Slider and Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleNudgeFontSize(-2)}
            title="Make font smaller"
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <input
            type="range"
            min="26"
            max="86"
            step="1"
            value={fontSize}
            onChange={(e) => onChangeFontSize?.(Number(e.target.value))}
            className="flex-1 accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          <button
            type="button"
            onClick={() => handleNudgeFontSize(2)}
            title="Make font larger"
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
