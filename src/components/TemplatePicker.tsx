import { useState } from 'react';
import type { CertificateTemplate } from '../types/certificate';
import { ModernGoldBackground } from '../templates/ModernGoldBackground';
import { ClassicalAcademyBackground } from '../templates/ClassicalAcademyBackground';
import { LayoutGrid, Plus, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface TemplatePickerProps {
  templates: CertificateTemplate[];
  selectedTemplate: CertificateTemplate;
  onSelectTemplate: (template: CertificateTemplate) => void;
  onOpenUploadModal: () => void;
}

export const TemplatePicker = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onOpenUploadModal,
}: TemplatePickerProps) => {
  // Shrunk / collapsed by default as requested
  const [isExpanded, setIsExpanded] = useState(false);

  const renderThumbnail = (t: CertificateTemplate) => {
    const bg = t.backgroundUri || t.customImageUri;
    if (bg) {
      return (
        <img
          src={bg}
          alt={t.name}
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <svg
        viewBox="0 0 1414 1000"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {t.id === 'modern-gold' && <ModernGoldBackground />}
        {t.id === 'classical-academy' && <ClassicalAcademyBackground />}
      </svg>
    );
  };

  const handleSelectAndShrink = (tpl: CertificateTemplate) => {
    onSelectTemplate(tpl);
    // Shrink automatically upon selection
    setIsExpanded(false);
  };

  return (
    <div className="w-full space-y-2">
      {/* Header with Title and Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
          Certificate Template
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{isExpanded ? 'Hide Options' : 'Change Template'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Shrunk State: Compact Summary Dropdown Trigger */}
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="w-full p-2.5 rounded-xl border-2 border-slate-200 hover:border-amber-500/70 bg-slate-50/70 hover:bg-amber-50/20 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-xs"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Mini thumbnail */}
            <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0 relative">
              {renderThumbnail(selectedTemplate)}
            </div>

            {/* Template Info */}
            <div className="overflow-hidden text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {selectedTemplate.name}
                </span>
                {selectedTemplate.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300/60 shrink-0">
                    {selectedTemplate.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {selectedTemplate.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-amber-600 font-medium shrink-0 pr-1">
            <span className="hidden sm:inline">Switch</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </div>
        </div>
      ) : (
        /* Expanded State: Full Template Grid */
        <div className="p-3 rounded-xl border-2 border-amber-600/30 bg-amber-50/15 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex sm:grid sm:grid-cols-4 gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 no-scrollbar snap-x">
            {templates.map((tpl) => {
              const isSelected = selectedTemplate.id === tpl.id;

              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectAndShrink(tpl)}
                  className={`flex-none w-[155px] sm:w-auto text-left rounded-xl border-2 transition-all p-2 bg-white relative cursor-pointer group snap-start ${
                    isSelected
                      ? 'border-amber-600 shadow-md ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="aspect-[1.414/1] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-100 relative mb-1.5">
                    {renderThumbnail(tpl)}

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}

                    {tpl.badge && (
                      <div className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded bg-slate-900/80 text-white font-medium backdrop-blur-xs">
                        {tpl.badge}
                      </div>
                    )}
                  </div>

                  <div className="px-0.5">
                    <div className="text-[11px] font-bold text-slate-900 truncate">
                      {tpl.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {tpl.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* + Add Your Certificate Button */}
            <button
              type="button"
              onClick={() => {
                onOpenUploadModal();
                setIsExpanded(false);
              }}
              className="flex-none w-[155px] sm:w-auto rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 p-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center group snap-start min-h-[130px]"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 group-hover:bg-amber-200 text-amber-700 flex items-center justify-center mb-1 transition-colors">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-amber-900 group-hover:text-amber-950">
                + Add Certificate
              </span>
              <span className="text-[9px] text-amber-700/80 mt-0.5">
                Upload PDF or image
              </span>
            </button>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Done (Collapse)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
