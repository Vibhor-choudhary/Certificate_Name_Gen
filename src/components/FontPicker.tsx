import { useState } from 'react';
import type { CertificateFont, CertificateTemplate } from '../types/certificate';
import { FONT_CATALOG, FONT_CATEGORIES } from '../fonts/fontCatalog';
import { Type, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface FontPickerProps {
  selectedFont: CertificateFont;
  onSelectFont: (font: CertificateFont) => void;
  currentTemplate: CertificateTemplate;
  sampleName: string;
}

export const FontPicker = ({
  selectedFont,
  onSelectFont,
  currentTemplate,
  sampleName,
}: FontPickerProps) => {
  // Dropdown collapsed / shrunk by default
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFonts = FONT_CATALOG.filter((f) => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  const previewText = sampleName.trim() || 'Neha Varma';

  const handleSelectFontAndCollapse = (font: CertificateFont) => {
    onSelectFont(font);
    setIsExpanded(false);
  };

  return (
    <div className="w-full space-y-2">
      {/* Header and Toggle Button */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-amber-600" />
          Certificate Font
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{isExpanded ? 'Done' : 'Change Font'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Shrunk Dropdown Summary View */}
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="w-full p-2.5 rounded-xl border-2 border-slate-200 hover:border-amber-500/70 bg-slate-50/70 hover:bg-amber-50/20 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-xs"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-800 font-serif font-bold text-sm flex items-center justify-center shrink-0">
              Aa
            </div>
            <div className="overflow-hidden text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {selectedFont.name}
                </span>
                {selectedFont.styleBadge && (
                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700 shrink-0">
                    {selectedFont.styleBadge}
                  </span>
                )}
              </div>
              <div
                className={`text-sm text-slate-900 truncate ${selectedFont.className}`}
                style={{ fontFamily: selectedFont.fontFamily }}
              >
                {previewText}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-amber-600 font-medium shrink-0 pr-1">
            <span className="hidden sm:inline">Change</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </div>
        </div>
      ) : (
        /* Expanded Dropdown View with Category Filter & Font Cards */
        <div className="p-3 rounded-xl border-2 border-amber-600/30 bg-amber-50/15 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Categories:</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
              {FONT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Font Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
            {filteredFonts.map((font) => {
              const isSelected = selectedFont.id === font.id;
              const isRecommended =
                font.isRecommendedFor?.includes(currentTemplate.id) ||
                font.id === currentTemplate.recommendedFontId;

              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => handleSelectFontAndCollapse(font)}
                  className={`w-full text-left p-2.5 rounded-xl border-2 transition-all relative cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 tracking-tight">
                        {font.name}
                      </span>
                      {font.styleBadge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                          {font.styleBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {isRecommended && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-amber-800 bg-amber-100 border border-amber-300/80 px-1.5 py-0.2 rounded-full">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                          Recommended
                        </span>
                      )}
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`text-base sm:text-lg truncate text-slate-900 py-0.5 ${font.className}`}
                    style={{ fontFamily: font.fontFamily }}
                  >
                    {previewText}
                  </div>
                </button>
              );
            })}
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
