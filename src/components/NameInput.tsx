import React from 'react';
import { User, CheckCircle2, Sparkles, X } from 'lucide-react';
import type { AutoFitResult } from '../types/certificate';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  autoFitResult: AutoFitResult;
}

const SAMPLE_NAMES = ['Neha Varma', 'Angel Arora'];

export const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  autoFitResult,
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="recipient-name-input"
          className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
        >
          <User className="w-3.5 h-3.5 text-amber-600" />
          Recipient Name
        </label>

        {/* Auto-fit reassuring status badge */}
        {autoFitResult.isReduced ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 animate-in fade-in">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Auto-fitted to certificate</span>
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 font-medium">
            Updates in real-time
          </span>
        )}
      </div>

      {/* Thumb-friendly high-contrast input */}
      <div className="relative flex items-center">
        <input
          id="recipient-name-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter recipient's name (e.g. Neha Varma)"
          autoComplete="off"
          spellCheck={false}
          className="w-full text-base sm:text-lg font-medium px-4 py-3.5 sm:py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-sm placeholder:text-slate-400 placeholder:font-normal"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear name"
            className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Name Pills: Neha Varma & Angel Arora only */}
      <div className="pt-0.5 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Suggested:
        </span>
        {SAMPLE_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
              value === name
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
