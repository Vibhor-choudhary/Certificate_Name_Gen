import { useState, useRef } from 'react';
import type { CertificateTemplate } from '../types/certificate';
import { Upload, X, AlertCircle, FileCheck, Sliders, Loader2, Sparkles } from 'lucide-react';
import { convertFileToImageDataUrl } from '../utils/pdfToImage';

interface UploadTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTemplate: (newTemplate: CertificateTemplate) => void;
}

export const UploadTemplateModal = ({
  isOpen,
  onClose,
  onAddTemplate,
}: UploadTemplateModalProps) => {
  const [templateName, setTemplateName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1414,
    height: 1000,
  });
  const [namePosY, setNamePosY] = useState(480);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const svgPreviewRef = useRef<SVGSVGElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setIsConverting(true);

    try {
      const result = await convertFileToImageDataUrl(file);
      setImageUri(result.dataUrl);
      setDimensions({ width: result.width, height: result.height });

      // Default name position to around 48% height
      setNamePosY(Math.round(result.height * 0.48));

      if (!templateName) {
        setTemplateName(file.name.replace(/\.[^/.]+$/, ''));
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Failed to process file';
      setError(msg);
    } finally {
      setIsConverting(false);
    }
  };

  // Allow clicking directly on the preview to place the name
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgPreviewRef.current) return;
    const rect = svgPreviewRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = clickY / rect.height;
    const newY = Math.round(dimensions.height * ratio);
    setNamePosY(newY);
  };

  const handleSave = () => {
    if (!imageUri) {
      setError('Please choose a certificate image or PDF background.');
      return;
    }

    const newTemplate: CertificateTemplate = {
      id: `custom-${Date.now()}`,
      name: templateName.trim() || 'Custom Certificate',
      subtitle: 'Uploaded custom certificate',
      badge: 'Custom',
      recommendedFontId: 'magnolia',
      backgroundUri: imageUri,
      viewBox: {
        width: dimensions.width,
        height: dimensions.height,
      },
      defaultValues: {
        recipientName: 'Poonam Choudhary',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      },
      fields: {
        recipientName: {
          x: Math.round(dimensions.width / 2),
          y: namePosY,
          maxWidth: Math.round(dimensions.width * 0.75),
          defaultFontSize: Math.round(dimensions.height * 0.062),
          minFontSize: 24,
          color: '#1a1814',
          alignment: 'middle',
        },
      },
      customImageUri: imageUri,
    };

    onAddTemplate(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Add Your Certificate</h3>
            <p className="text-xs text-slate-500">Upload a certificate PDF or image to use as a template</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Template Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Template Title
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. My Studio Certificate"
              className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 outline-none"
            />
          </div>

          {/* Upload Area / Live Interactive Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Certificate Preview &amp; Name Alignment
              </label>
              {imageUri && (
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Tap image to place name
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, application/pdf, .pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {isConverting ? (
              <div className="w-full py-16 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/40 flex flex-col items-center justify-center text-center p-4">
                <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-2" />
                <span className="text-sm font-semibold text-amber-900">
                  Processing certificate file...
                </span>
                <span className="text-xs text-amber-700 mt-1">
                  Rendering high-resolution preview
                </span>
              </div>
            ) : !imageUri ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-12 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl bg-slate-50/50 hover:bg-amber-50/30 transition-all flex flex-col items-center justify-center cursor-pointer text-center px-4"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  Upload Certificate File
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Supports PDF, PNG, JPG (A4 Landscape recommended)
                </span>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border-2 border-amber-600/30 shadow-md bg-slate-100">
                {/* SVG interactive preview */}
                <svg
                  ref={svgPreviewRef}
                  onClick={handleSvgClick}
                  viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                  className="w-full h-auto block cursor-crosshair select-none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <image
                    href={imageUri}
                    xlinkHref={imageUri}
                    x="0"
                    y="0"
                    width={dimensions.width}
                    height={dimensions.height}
                    preserveAspectRatio="none"
                  />

                  {/* Horizontal Guide Line */}
                  <line
                    x1="0"
                    y1={namePosY}
                    x2={dimensions.width}
                    y2={namePosY}
                    stroke="#d97706"
                    strokeWidth={dimensions.height * 0.003}
                    strokeDasharray="6 4"
                  />

                  {/* Sample Name Overlay */}
                  <text
                    x={dimensions.width / 2}
                    y={namePosY}
                    textAnchor="middle"
                    fill="#1e1b18"
                    fontSize={dimensions.height * 0.062}
                    fontFamily="'Alex Brush', 'Playfair Display', serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    Recipient Name
                  </text>
                </svg>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-xs rounded-lg backdrop-blur-xs cursor-pointer flex items-center gap-1 shadow"
                >
                  <FileCheck className="w-3.5 h-3.5" /> Change File
                </button>
              </div>
            )}
          </div>

          {/* Name Position Y Slider */}
          {imageUri && (
            <div className="space-y-1.5 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  Vertical Position (Y)
                </span>
                <span className="text-slate-600 font-mono text-[11px]">
                  {Math.round((namePosY / dimensions.height) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={Math.round(dimensions.height * 0.15)}
                max={Math.round(dimensions.height * 0.85)}
                step="2"
                value={namePosY}
                onChange={(e) => setNamePosY(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block">
                Drag slider or tap directly on the certificate to place the recipient name.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!imageUri || isConverting}
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Save &amp; Use Template
          </button>
        </div>
      </div>
    </div>
  );
};
