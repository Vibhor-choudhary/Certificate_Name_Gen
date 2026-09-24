import type { CertificateTemplate } from '../types/certificate';
import { ModernGoldBackground } from '../templates/ModernGoldBackground';
import { ClassicalAcademyBackground } from '../templates/ClassicalAcademyBackground';
import { LayoutGrid, Plus, Check } from 'lucide-react';

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

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
          Certificate Templates
        </label>
        <span className="text-[11px] text-slate-600 font-medium">
          {templates.length} available
        </span>
      </div>

      {/* Templates Carousel / Grid */}
      <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 no-scrollbar snap-x">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate.id === tpl.id;

          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl)}
              className={`flex-none w-[170px] sm:w-auto text-left rounded-xl border-2 transition-all p-2 bg-white relative cursor-pointer group snap-start ${
                isSelected
                  ? 'border-amber-600 shadow-md ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Aspect Ratio Preview */}
              <div className="aspect-[1.414/1] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-100 relative mb-2">
                {renderThumbnail(tpl)}

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                )}

                {tpl.badge && (
                  <div className="absolute bottom-1 left-1 text-[9px] px-1.5 py-0.5 rounded bg-slate-900/80 text-white font-medium backdrop-blur-xs">
                    {tpl.badge}
                  </div>
                )}
              </div>

              {/* Title & subtitle */}
              <div className="px-0.5">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {tpl.name}
                </div>
                <div className="text-[10px] text-slate-600 truncate">
                  {tpl.subtitle}
                </div>
              </div>
            </button>
          );
        })}

        {/* + Add Your Certificate Button */}
        <button
          type="button"
          onClick={onOpenUploadModal}
          className="flex-none w-[170px] sm:w-auto rounded-xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 p-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center group snap-start min-h-[140px]"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 group-hover:bg-amber-200 text-amber-700 flex items-center justify-center mb-1.5 transition-colors">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold text-amber-900 group-hover:text-amber-950">
            + Add Your Certificate
          </span>
          <span className="text-[10px] text-amber-800/80 mt-0.5">
            Upload PDF or image
          </span>
        </button>
      </div>
    </div>
  );
};
