import React from 'react';
import { Award, Zap, FileSpreadsheet } from 'lucide-react';

interface HeaderProps {
  onOpenBulkModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBulkModal }) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                CertiFast
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300/80 px-2 py-0.5 rounded-full">
                <Zap className="w-3 h-3 text-amber-600 fill-amber-600" /> &lt; 30s Workflow
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Print-ready professional certificates in seconds
            </p>
          </div>
        </div>

        {/* Action Button: Future Expansion Feature Preview */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBulkModal}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden xs:inline">Bulk CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
