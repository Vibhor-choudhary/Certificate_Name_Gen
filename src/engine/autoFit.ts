import type { AutoFitResult, FieldPosition } from '../types/certificate';

// Cache canvas context for ultra-fast repeated measurements
let measurementCanvas: HTMLCanvasElement | null = null;
let measurementCtx: CanvasRenderingContext2D | null = null;

function getContext(): CanvasRenderingContext2D | null {
  if (typeof window === 'undefined') return null;
  if (!measurementCanvas) {
    measurementCanvas = document.createElement('canvas');
    measurementCtx = measurementCanvas.getContext('2d');
  }
  return measurementCtx;
}

/**
 * Calculates optimal font size for a text string so it never exceeds maxWidth.
 * Supports fallback calculation when canvas measurement is unavailable.
 */
export function calculateAutoFit(
  text: string,
  field: FieldPosition,
  fontFamily: string
): AutoFitResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      fontSize: field.defaultFontSize,
      isReduced: false,
      scaleRatio: 1,
    };
  }

  const ctx = getContext();
  let measuredWidth = 0;

  if (ctx) {
    ctx.font = `${field.fontWeight || 'normal'} ${field.defaultFontSize}px ${fontFamily}`;
    measuredWidth = ctx.measureText(trimmed).width;
  } else {
    // Heuristic estimation: average character width ratio ~ 0.58 of font size
    measuredWidth = trimmed.length * field.defaultFontSize * 0.58;
  }

  const maxWidth = field.maxWidth;

  if (measuredWidth <= maxWidth) {
    return {
      fontSize: field.defaultFontSize,
      isReduced: false,
      scaleRatio: 1,
    };
  }

  // Calculate needed scaling with a 4% protective margin to prevent edge collision
  const targetWidth = maxWidth * 0.96;
  const scale = targetWidth / measuredWidth;
  const calculatedSize = Math.floor(field.defaultFontSize * scale);
  const finalFontSize = Math.max(field.minFontSize, calculatedSize);

  return {
    fontSize: finalFontSize,
    isReduced: finalFontSize < field.defaultFontSize,
    scaleRatio: finalFontSize / field.defaultFontSize,
  };
}
