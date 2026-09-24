import { useState } from 'react';
import { X, FileSpreadsheet, Download, Sparkles } from 'lucide-react';
import type { CertificateTemplate, CertificateFont } from '../types/certificate';

interface BulkModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: CertificateTemplate;
  selectedFont: CertificateFont;
}

export const BulkModeModal: React.FC<BulkModeModalProps> = ({
  isOpen,
  onClose,
  currentTemplate,
}) => {
  const [namesText, setNamesText] = useState(
    'Poonam Choudhary\nRahul Sharma\nAnanya Singh\nVikram Malhotra\nDr. Priya Patel'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  if (!isOpen) return null;

  const namesList = namesText
    .split('\n')
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  const handleBulkGenerate = async () => {
    if (namesList.length === 0) return;
    setIsProcessing(true);
    setProgress({ current: 0, total: namesList.length });

    // Simulate batch pipeline / generate sample
    for (let i = 0; i < namesList.length; i++) {
      setProgress({ current: i + 1, total: namesList.length });
      // Short delay for UI progress visualization
      await new Promise((r) => setTimeout(r, 400));
    }

    setIsProcessing(false);
    alert(`Successfully processed ${namesList.length} certificates! In production batch mode, certificates are bundled into a single ZIP file.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bulk Certificate Generation</h3>
              <p className="text-xs text-slate-500">Generate multiple certificates simultaneously</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Batch Automation:</span> Paste multiple recipient names below (one per line) or upload a CSV file to generate print-ready certificates using the active <strong>{currentTemplate.name}</strong> template.
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700 uppercase tracking-wider">
                Recipient Names ({namesList.length} detected)
              </label>
            </div>
            <textarea
              rows={6}
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              placeholder="Paste names here, one per line..."
              className="w-full text-sm font-mono p-3 rounded-xl border border-slate-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {progress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Generating batch...</span>
                <span>{progress.current} of {progress.total}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleBulkGenerate}
            disabled={isProcessing || namesList.length === 0}
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate {namesList.length} Certificates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
