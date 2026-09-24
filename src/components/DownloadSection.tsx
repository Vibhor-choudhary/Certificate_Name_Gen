import React, { useState } from 'react';
import { Download, Image as ImageIcon, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { generateHighQualityPdf, generateHighQualityImage } from '../pdf/pdfGenerator';
import type { CertificateTemplate } from '../types/certificate';

interface DownloadSectionProps {
  svgRef: React.RefObject<SVGSVGElement | null>;
  recipientName: string;
  currentTemplate: CertificateTemplate;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  svgRef,
  recipientName,
  currentTemplate,
}) => {
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cleanName = recipientName.trim() || 'Certificate';

  const handleDownloadPdf = async () => {
    if (!svgRef.current) return;
    setErrorMsg(null);
    setIsPdfLoading(true);
    setDownloadSuccess(false);

    try {
      await generateHighQualityPdf({
        svgElement: svgRef.current,
        recipientName: cleanName,
        templateName: currentTemplate.name,
        backgroundUri: currentTemplate.backgroundUri || currentTemplate.customImageUri,
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong while generating your certificate PDF. Please try again.');
    } finally {
      setIsPdfLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!svgRef.current) return;
    setErrorMsg(null);
    setIsImgLoading(true);

    try {
      await generateHighQualityImage({
        svgElement: svgRef.current,
        recipientName: cleanName,
        templateName: currentTemplate.name,
        backgroundUri: currentTemplate.backgroundUri || currentTemplate.customImageUri,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong while exporting image. Please try again.');
    } finally {
      setIsImgLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2.5">
      {/* Error notice if any */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success Notice */}
      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Certificate downloaded successfully! Ready to print at 300 DPI.
            </span>
          </div>
        </div>
      )}

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Main PDF Download Button */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isPdfLoading || isImgLoading}
          className="sm:col-span-2 w-full py-4 sm:py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 active:scale-[0.99] disabled:opacity-60 transition-all shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2.5 cursor-pointer text-base sm:text-lg"
        >
          {isPdfLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Rendering 300 DPI PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download High-Quality PDF</span>
            </>
          )}
        </button>

        {/* Secondary PNG Image Download */}
        <button
          type="button"
          onClick={handleDownloadImage}
          disabled={isPdfLoading || isImgLoading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          {isImgLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
          ) : (
            <ImageIcon className="w-4 h-4 text-slate-600" />
          )}
          <span>Save as PNG</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 pt-0.5">
        <span>Standard: A4 Landscape (297 × 210 mm)</span>
        <span>Print resolution: 300 DPI Vector</span>
      </div>
    </div>
  );
};
