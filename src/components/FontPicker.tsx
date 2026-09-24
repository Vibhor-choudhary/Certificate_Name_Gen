import React, { useState } from 'react';
import type { CertificateFont, CertificateTemplate } from '../types/certificate';
import { FONT_CATALOG, FONT_CATEGORIES } from '../fonts/fontCatalog';
import { Type, Sparkles, Check } from 'lucide-react';

interface FontPickerProps {
  selectedFont: CertificateFont;
  onSelectFont: (font: CertificateFont) => void;
  currentTemplate: CertificateTemplate;
  sampleName: string;
}

export const FontPicker: React.FC<FontPickerProps> = ({
  selectedFont,
  onSelectFont,
  currentTemplate,
  sampleName,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFonts = FONT_CATALOG.filter((f) => {
    if (activeCategory === 'All') return true;
    return f.category === activeCategory;
  });

  const previewText = sampleName.trim() || 'Poonam Choudhary';

  return (
    <div className="w-full space-y-3">
      {/* Header and Category Filters */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-amber-600" />
          Certificate Font
        </label>

        {/* Category Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          {FONT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Font Cards Grid / Mobile Scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
        {filteredFonts.map((font) => {
          const isSelected = selectedFont.id === font.id;
          const isRecommended =
            font.isRecommendedFor?.includes(currentTemplate.id) ||
            font.id === currentTemplate.recommendedFontId;

          return (
            <button
              key={font.id}
              type="button"
              onClick={() => onSelectFont(font)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all relative cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80'
              }`}
            >
              {/* Top Row: Font Name & Badges */}
              <div className="flex items-center justify-between gap-1 w-full mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800 tracking-tight">
                    {font.name}
                  </span>
                  {font.styleBadge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {font.styleBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {isRecommended && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-300/80 px-1.5 py-0.5 rounded-full">
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

              {/* Bottom Row: Live Preview in this font */}
              <div
                className={`text-lg sm:text-xl truncate text-slate-900 py-0.5 ${font.className}`}
                style={{ fontFamily: font.fontFamily }}
              >
                {previewText}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
