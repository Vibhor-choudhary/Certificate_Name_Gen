import { forwardRef, useState, useRef, useCallback, useImperativeHandle } from 'react';
import type { CertificateTemplate, CertificateValues, CertificateFont, AutoFitResult } from '../types/certificate';
import { ModernGoldBackground } from '../templates/ModernGoldBackground';
import { ClassicalAcademyBackground } from '../templates/ClassicalAcademyBackground';
import { Maximize2, X, Move } from 'lucide-react';

interface CertificatePreviewProps {
  template: CertificateTemplate;
  values: CertificateValues;
  selectedFont: CertificateFont;
  autoFitResult: AutoFitResult;
  namePosition?: { x: number; y: number };
  onPositionChange?: (pos: { x: number; y: number }) => void;
  showDate?: boolean;
}

export const CertificatePreview = forwardRef<SVGSVGElement, CertificatePreviewProps>(
  (
    {
      template,
      values,
      selectedFont,
      autoFitResult,
      namePosition,
      onPositionChange,
      showDate = true,
    },
    ref
  ) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const svgInternalRef = useRef<SVGSVGElement | null>(null);

    // Forward internal ref to parent
    useImperativeHandle(ref, () => svgInternalRef.current!);

    const { width, height } = template.viewBox;
    const nameField = template.fields.recipientName;
    const bgUri = template.backgroundUri || template.customImageUri;

    // Safe fallback coordinates
    const posX = namePosition?.x ?? nameField.x;
    const posY = namePosition?.y ?? nameField.y;

    // Convert screen coordinates to SVG viewBox coordinates
    const getSvgCoords = useCallback(
      (clientX: number, clientY: number) => {
        if (!svgInternalRef.current) return null;
        const rect = svgInternalRef.current.getBoundingClientRect();
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;
        const x = Math.round((clientX - rect.left) * scaleX);
        const y = Math.round((clientY - rect.top) * scaleY);
        return { x, y };
      },
      [width, height]
    );

    // Start dragging name
    const handlePointerDown = (e: React.PointerEvent) => {
      e.stopPropagation();
      (e.target as Element).setPointerCapture(e.pointerId);
      setIsDragging(true);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging || !onPositionChange) return;
      const coords = getSvgCoords(e.clientX, e.clientY);
      if (coords) {
        // Constrain within viewBox bounds
        const constrainedY = Math.max(100, Math.min(height - 100, coords.y));
        const constrainedX = Math.max(100, Math.min(width - 100, coords.x));
        onPositionChange({ x: constrainedX, y: constrainedY });
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        try {
          (e.target as Element).releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    // Clicking anywhere on preview lets user tap to place name vertically
    const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
      if (isDragging || !onPositionChange) return;
      const coords = getSvgCoords(e.clientX, e.clientY);
      if (coords) {
        const constrainedY = Math.max(150, Math.min(height - 150, coords.y));
        onPositionChange({ x: posX, y: constrainedY });
      }
    };

    // Render template background
    const renderBackground = () => {
      if (bgUri) {
        return (
          <image
            href={bgUri}
            xlinkHref={bgUri}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
          />
        );
      }

      switch (template.id) {
        case 'modern-gold':
          return <ModernGoldBackground />;
        case 'classical-academy':
          return <ClassicalAcademyBackground />;
        default:
          return <ModernGoldBackground />;
      }
    };

    const recipientDisplayName = values.recipientName.trim() || 'Recipient Name';

    // Filter out "NA" so it doesn't render unwanted text
    const shouldRender = (val?: string) => val && val.trim() !== '' && val.trim().toUpperCase() !== 'NA';

    return (
      <div className="relative group">
        {/* Main Certificate Card with realistic print shadow */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-xl shadow-slate-200/70 border border-slate-200/80 transition-all duration-300">
          <svg
            ref={svgInternalRef}
            onClick={handleSvgClick}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block select-none cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            {/* Background elements */}
            {renderBackground()}

            {/* Visual Guideline when dragging */}
            {isDragging && (
              <g pointerEvents="none">
                <line
                  x1="0"
                  y1={posY}
                  x2={width}
                  y2={posY}
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  opacity="0.8"
                />
                <circle cx={posX} cy={posY} r="6" fill="#d97706" />
              </g>
            )}

            {/* DYNAMIC RECIPIENT NAME (Draggable) */}
            <g
              transform={`translate(${posX}, ${posY})`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="cursor-grab active:cursor-grabbing group/name"
              style={{ touchAction: 'none' }}
            >
              {/* Invisible touch padding box for easy mobile dragging */}
              <rect
                x={-autoFitResult.fontSize * 5}
                y={-autoFitResult.fontSize * 1.2}
                width={autoFitResult.fontSize * 10}
                height={autoFitResult.fontSize * 2.2}
                fill="transparent"
              />

              {/* Hover / drag bounding box indicator */}
              <rect
                x={-autoFitResult.fontSize * 3.5}
                y={-autoFitResult.fontSize * 0.9}
                width={autoFitResult.fontSize * 7}
                height={autoFitResult.fontSize * 1.4}
                fill="rgba(217, 119, 6, 0.08)"
                stroke="#d97706"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                rx="6"
                className={`transition-opacity duration-150 ${
                  isDragging ? 'opacity-100' : 'opacity-0 group-hover/name:opacity-100'
                }`}
              />

              <text
                x="0"
                y="0"
                textAnchor={nameField.alignment}
                dominantBaseline="central"
                fill={nameField.color}
                fontSize={autoFitResult.fontSize}
                fontWeight={nameField.fontWeight || 'normal'}
                className={selectedFont.className}
                style={{
                  fontFamily: selectedFont.fontFamily,
                  letterSpacing: nameField.letterSpacing || 'normal',
                  userSelect: 'none',
                }}
              >
                {recipientDisplayName}
              </text>
            </g>

            {/* Dynamic Date - Rendered directly in the date blank area on line if enabled & not NA */}
            {showDate && template.fields.date && shouldRender(values.date) && (
              <text
                x={template.fields.date.x}
                y={template.fields.date.y}
                textAnchor={template.fields.date.alignment}
                fill={template.fields.date.color}
                fontSize={template.fields.date.defaultFontSize}
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {values.date}
              </text>
            )}

            {/* Dynamic Course Name (only for vector templates and not NA) */}
            {template.fields.courseName && shouldRender(values.courseName) && !bgUri && (
              <text
                x={template.fields.courseName.x}
                y={template.fields.courseName.y}
                textAnchor={template.fields.courseName.alignment}
                fill={template.fields.courseName.color}
                fontSize={template.fields.courseName.defaultFontSize}
                fontFamily="'Cinzel', serif"
                fontWeight="700"
                letterSpacing={template.fields.courseName.letterSpacing}
                style={{ pointerEvents: 'none' }}
              >
                {values.courseName}
              </text>
            )}

            {/* Dynamic Instructor Title (only for vector templates and not NA) */}
            {template.fields.instructorName && shouldRender(values.instructorName) && !bgUri && (
              <text
                x={template.fields.instructorName.x}
                y={template.fields.instructorName.y}
                textAnchor={template.fields.instructorName.alignment}
                fill={template.fields.instructorName.color}
                fontSize={template.fields.instructorName.defaultFontSize}
                fontFamily="'Montserrat', sans-serif"
                fontWeight="500"
                style={{ pointerEvents: 'none' }}
              >
                {values.instructorName}
              </text>
            )}

            {/* Dynamic Certificate ID (only for vector templates and not NA) */}
            {template.fields.certificateId && shouldRender(values.certificateId) && !bgUri && (
              <text
                x={template.fields.certificateId.x}
                y={template.fields.certificateId.y}
                textAnchor={template.fields.certificateId.alignment}
                fill={template.fields.certificateId.color}
                fontSize={template.fields.certificateId.defaultFontSize}
                fontFamily="'Montserrat', sans-serif"
                fontWeight="500"
                letterSpacing={template.fields.certificateId.letterSpacing}
                style={{ pointerEvents: 'none' }}
              >
                Certificate ID: {values.certificateId}
              </text>
            )}
          </svg>

          {/* Floating Reposition Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white backdrop-blur-md text-[11px] font-medium flex items-center gap-1.5 shadow pointer-events-none">
            <Move className="w-3 h-3 text-amber-400" />
            <span>Drag name or tap to reposition</span>
          </div>

          {/* Quick Zoom Trigger Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(true);
            }}
            aria-label="Enlarge Certificate Preview"
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>

        {/* Fullscreen Modal View */}
        {isZoomed && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200">
            <div className="w-full max-w-5xl flex items-center justify-between pb-3 text-white">
              <span className="text-sm font-medium opacity-80">Full Resolution Preview</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl bg-white">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto block"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                {renderBackground()}
                <text
                  x={posX}
                  y={posY}
                  textAnchor={nameField.alignment}
                  dominantBaseline="central"
                  fill={nameField.color}
                  fontSize={autoFitResult.fontSize}
                  className={selectedFont.className}
                  style={{
                    fontFamily: selectedFont.fontFamily,
                    letterSpacing: nameField.letterSpacing || 'normal',
                  }}
                >
                  {recipientDisplayName}
                </text>
                {showDate && template.fields.date && shouldRender(values.date) && (
                  <text
                    x={template.fields.date.x}
                    y={template.fields.date.y}
                    textAnchor={template.fields.date.alignment}
                    fill={template.fields.date.color}
                    fontSize={template.fields.date.defaultFontSize}
                    fontFamily="'Montserrat', 'Inter', sans-serif"
                    fontWeight="600"
                  >
                    {values.date}
                  </text>
                )}
              </svg>
            </div>
          </div>
        )}
      </div>
    );
  }
);
