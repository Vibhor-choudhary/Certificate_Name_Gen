import { useState, useRef, useMemo } from 'react';
import type {
  CertificateTemplate,
  CertificateValues,
  CertificateFont,
} from './types/certificate';
import { TEMPLATES } from './templates/templateData';
import { FONT_CATALOG } from './fonts/fontCatalog';
import { calculateAutoFit } from './engine/autoFit';
import { Header } from './components/Header';
import { CertificatePreview } from './components/CertificatePreview';
import { NameInput } from './components/NameInput';
import { NamePositionControls } from './components/NamePositionControls';
import { FontPicker } from './components/FontPicker';
import { TemplatePicker } from './components/TemplatePicker';
import { DownloadSection } from './components/DownloadSection';
import { UploadTemplateModal } from './components/UploadTemplateModal';
import { BulkModeModal } from './components/BulkModeModal';
import { ChevronDown, ChevronUp, Calendar, BookOpen, Hash, Check } from 'lucide-react';

export function App() {
  const [templates, setTemplates] = useState<CertificateTemplate[]>(TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate>(TEMPLATES[0]);

  // Recipient name position state (Y: 50% / 498px default for Rising Yoga)
  const [namePosition, setNamePosition] = useState({
    x: TEMPLATES[0].fields.recipientName.x,
    y: TEMPLATES[0].fields.recipientName.y, // 498px (50%)
  });

  // Custom font size override (or auto-fit default)
  const [customFontSize, setCustomFontSize] = useState<number | null>(null);

  // Certificate dynamic values (Default other fields as 'NA')
  const [values, setValues] = useState<CertificateValues>({
    recipientName: TEMPLATES[0].defaultValues.recipientName,
    date: TEMPLATES[0].defaultValues.date,
    courseName: TEMPLATES[0].defaultValues.courseName || 'NA',
    instructorName: TEMPLATES[0].defaultValues.instructorName || 'NA',
    certificateId: TEMPLATES[0].defaultValues.certificateId || 'NA',
  });

  // Date visibility toggle (unchecked by default)
  const [includeDate, setIncludeDate] = useState(false);

  // Selected Font
  const defaultFont =
    FONT_CATALOG.find((f) => f.id === selectedTemplate.recommendedFontId) ||
    FONT_CATALOG[0];
  const [selectedFont, setSelectedFont] = useState<CertificateFont>(defaultFont);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // SVG ref for high-resolution PDF generation
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Switch template handler
  const handleSelectTemplate = (tpl: CertificateTemplate) => {
    setSelectedTemplate(tpl);
    setNamePosition({
      x: tpl.fields.recipientName.x,
      y: tpl.fields.recipientName.y,
    });
    setCustomFontSize(null);
    const recFont = FONT_CATALOG.find((f) => f.id === tpl.recommendedFontId);
    if (recFont) {
      setSelectedFont(recFont);
    }
  };

  // Add custom user-uploaded template
  const handleAddTemplate = (newTemplate: CertificateTemplate) => {
    setTemplates((prev) => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    setNamePosition({
      x: newTemplate.fields.recipientName.x,
      y: newTemplate.fields.recipientName.y,
    });
    setCustomFontSize(null);
    const recFont = FONT_CATALOG.find((f) => f.id === newTemplate.recommendedFontId);
    if (recFont) setSelectedFont(recFont);
  };

  // Automatic Name Fitting Calculation with manual override support
  const autoFitResult = useMemo(() => {
    const base = calculateAutoFit(
      values.recipientName,
      selectedTemplate.fields.recipientName,
      selectedFont.fontFamily
    );

    if (customFontSize !== null) {
      return {
        ...base,
        fontSize: customFontSize,
        isReduced: customFontSize < selectedTemplate.fields.recipientName.defaultFontSize,
      };
    }

    return base;
  }, [values.recipientName, selectedTemplate, selectedFont, customFontSize]);

  // Quick date helper: set today's formatted date
  const setTodayDate = () => {
    const formatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setValues((prev) => ({ ...prev, date: formatted }));
    setIncludeDate(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-12">
      {/* App Header */}
      <Header onOpenBulkModal={() => setIsBulkModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: LIVE PREVIEW (Mobile First: Placed on Top for quick visual feedback) */}
          <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-3">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Certificate Preview
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Live Updates
              </span>
            </div>

            {/* Certificate Preview Card with completely clean view */}
            <CertificatePreview
              ref={svgRef}
              template={selectedTemplate}
              values={values}
              selectedFont={selectedFont}
              autoFitResult={autoFitResult}
              namePosition={namePosition}
              onPositionChange={setNamePosition}
              showDate={includeDate}
            />

            {/* Print Quality Assurance Note */}
            <div className="hidden sm:flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1 text-center">
              <span>Ready for high-resolution print &amp; digital export. A4 Landscape at 300 DPI.</span>
            </div>
          </div>

          {/* RIGHT COLUMN: WORKFLOW CONTROLS */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-4.5 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            
            {/* Step 1: Choose Template (Collapsible Dropdown, Shrunk by default) */}
            <TemplatePicker
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
            />

            <hr className="border-slate-100" />

            {/* Step 2: Enter Recipient Name (Auto-fitting) */}
            <NameInput
              value={values.recipientName}
              onChange={(name) => {
                setValues((prev) => ({ ...prev, recipientName: name }));
                // Reset manual font size override when name changes so auto-fit recalculates naturally
                setCustomFontSize(null);
              }}
              autoFitResult={autoFitResult}
            />

            <hr className="border-slate-100" />

            {/* Step 3: FIRST - Font Selection (Collapsible Dropdown) */}
            <FontPicker
              selectedFont={selectedFont}
              onSelectFont={setSelectedFont}
              currentTemplate={selectedTemplate}
              sampleName={values.recipientName}
            />

            <hr className="border-slate-100" />

            {/* Step 4: THEN - Name Position & Small Font Size Selection */}
            <NamePositionControls
              position={namePosition}
              onChangePosition={setNamePosition}
              defaultPosition={{
                x: selectedTemplate.fields.recipientName.x,
                y: selectedTemplate.fields.recipientName.y, // 498px (50%)
              }}
              viewBox={selectedTemplate.viewBox}
              fontSize={autoFitResult.fontSize}
              onChangeFontSize={setCustomFontSize}
              defaultFontSize={selectedTemplate.fields.recipientName.defaultFontSize}
            />

            <hr className="border-slate-100" />

            {/* Step 5: Certificate Date Option (Unchecked by default) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Certificate Date Option
              </label>

              {/* Date Box */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={includeDate}
                      onChange={(e) => setIncludeDate(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                    />
                    <span>Show Date in Certificate Date Area</span>
                  </label>
                  {includeDate && (
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Visible on blank line
                    </span>
                  )}
                </div>

                {includeDate && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={values.date || ''}
                        onChange={(e) => setValues((prev) => ({ ...prev, date: e.target.value }))}
                        placeholder="e.g. September 24, 2026"
                        className="flex-1 text-xs px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-amber-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={setTodayDate}
                        className="px-2.5 py-2 text-[11px] font-semibold text-amber-800 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Today
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      Rendered on the blank line directly above &quot;Date&quot; on the certificate.
                    </span>
                  </div>
                )}
              </div>

              {/* Other Fields Accordion (Defaulted to NA) */}
              <div className="border border-slate-200/70 rounded-xl overflow-hidden bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="w-full px-3 py-2 flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Other Fields</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      (Defaults to NA)
                    </span>
                  </span>
                  {showOptionalFields ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {showOptionalFields && (
                  <div className="p-3 pt-1 space-y-2 border-t border-slate-200/60 bg-white">
                    <p className="text-[10px] text-slate-500">
                      Other than the recipient name and date, all other fields default to <strong>NA</strong> so they do not overwrite pre-printed certificate details.
                    </p>

                    {/* Course Name */}
                    <div className="space-y-0.5">
                      <label className="text-[10px] font-semibold text-slate-600 uppercase flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-600" /> Course Name
                      </label>
                      <input
                        type="text"
                        value={values.courseName || 'NA'}
                        onChange={(e) => setValues((prev) => ({ ...prev, courseName: e.target.value }))}
                        placeholder="NA"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-amber-600 outline-none"
                      />
                    </div>

                    {/* Instructor / Signatory */}
                    <div className="space-y-0.5">
                      <label className="text-[10px] font-semibold text-slate-600 uppercase flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-600" /> Instructor
                      </label>
                      <input
                        type="text"
                        value={values.instructorName || 'NA'}
                        onChange={(e) => setValues((prev) => ({ ...prev, instructorName: e.target.value }))}
                        placeholder="NA"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-amber-600 outline-none"
                      />
                    </div>

                    {/* Certificate ID */}
                    <div className="space-y-0.5">
                      <label className="text-[10px] font-semibold text-slate-600 uppercase flex items-center gap-1">
                        <Hash className="w-3 h-3 text-amber-600" /> Certificate ID
                      </label>
                      <input
                        type="text"
                        value={values.certificateId || 'NA'}
                        onChange={(e) => setValues((prev) => ({ ...prev, certificateId: e.target.value }))}
                        placeholder="NA"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-amber-600 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Step 6: Download Section */}
            <DownloadSection
              svgRef={svgRef}
              recipientName={values.recipientName}
              currentTemplate={selectedTemplate}
            />

          </div>
        </div>
      </main>

      {/* Upload Custom Certificate Modal (+ Add Your Certificate) */}
      <UploadTemplateModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddTemplate={handleAddTemplate}
      />

      {/* Bulk Generator Modal */}
      <BulkModeModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        currentTemplate={selectedTemplate}
        selectedFont={selectedFont}
      />
    </div>
  );
}

export default App;
