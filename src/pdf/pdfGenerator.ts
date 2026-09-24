import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

export interface GeneratePdfOptions {
  svgElement: SVGSVGElement;
  recipientName: string;
  templateName: string;
  backgroundUri?: string;
}

/**
 * Fires celebration confetti after successful download
 */
export function fireCelebrationConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#d4af37', '#aa771c', '#3b82f6', '#10b981'],
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}

/**
 * Helper to render the certificate (with background image and SVG text overlay)
 * onto a 300 DPI canvas (3508 x 2480 pixels or exact image resolution).
 */
async function renderCertificateToCanvas(
  svgElement: SVGSVGElement,
  backgroundUri?: string
): Promise<HTMLCanvasElement> {
  if (document.fonts) {
    await document.fonts.ready;
  }

  // Detect if there is a background image to draw directly
  const embeddedImage = svgElement.querySelector('image');
  const bgUrl = backgroundUri || embeddedImage?.getAttribute('href') || embeddedImage?.getAttribute('xlink:href');

  let targetWidth = 3508;
  let targetHeight = 2480;

  let loadedBgImg: HTMLImageElement | null = null;
  if (bgUrl) {
    loadedBgImg = await new Promise<HTMLImageElement | null>((resolve) => {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.onload = () => {
        if (bgImg.naturalWidth && bgImg.naturalHeight) {
          targetWidth = bgImg.naturalWidth;
          targetHeight = bgImg.naturalHeight;
        }
        resolve(bgImg);
      };
      bgImg.onerror = () => {
        resolve(null);
      };
      bgImg.src = bgUrl;
    });
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw background image full bleed
  if (loadedBgImg) {
    ctx.drawImage(loadedBgImg, 0, 0, targetWidth, targetHeight);
  } else if (!bgUrl) {
    // If no background image, fallback to clean white base
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else {
    // Fallback neutral parchment
    ctx.fillStyle = '#fdfaf3';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // 2. Clone SVG and prepare for clean vector text composite
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('width', `${targetWidth}`);
  clone.setAttribute('height', `${targetHeight}`);
  clone.setAttribute('preserveAspectRatio', 'none');

  // Strip background image if already drawn to canvas directly
  if (bgUrl) {
    const cloneImg = clone.querySelector('image');
    if (cloneImg) cloneImg.remove();
  }

  // DEFENSIVE FIX: Remove any bounding box rects or background rectangles in name group or guidelines
  const allRects = clone.querySelectorAll('rect');
  allRects.forEach((rect) => {
    const parentTag = rect.parentElement?.tagName?.toLowerCase();
    const fill = rect.getAttribute('fill') || '';
    const stroke = rect.getAttribute('stroke') || '';
    const className = rect.getAttribute('class') || '';

    // Remove bounding box / drag / hover rectangles
    if (
      fill.includes('rgba(217, 119, 6') ||
      stroke === '#d97706' ||
      fill === 'transparent' ||
      className.includes('opacity-0') ||
      parentTag === 'g' && rect.parentElement?.querySelector('text')
    ) {
      rect.remove();
    }
  });

  // Remove any active guide lines or circles
  const guides = clone.querySelectorAll('line, circle');
  guides.forEach((el) => {
    if (el.getAttribute('stroke') === '#d97706' || el.getAttribute('fill') === '#d97706') {
      el.remove();
    }
  });

  // Inline font declarations into SVG defs to ensure cross-context rendering
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allura&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..700&family=Cinzel:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Inter:wght@400;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Pinyon+Script&display=swap');
    
    .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-higuen { font-family: 'Bodoni Moda', 'Playfair Display', Didot, serif; }
    .font-montserrat { font-family: 'Montserrat', sans-serif; }
    .font-baskerville { font-family: 'Libre Baskerville', Georgia, serif; }
    .font-greatvibes { font-family: 'Great Vibes', cursive; }
    .font-allura { font-family: 'Allura', cursive; }
    .font-magnolia { font-family: 'Alex Brush', 'Pinyon Script', 'Great Vibes', cursive; }
    .font-pinyon { font-family: 'Pinyon Script', cursive; }
  `;

  let defs = clone.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    clone.insertBefore(defs, clone.firstChild);
  }
  defs.appendChild(styleEl);

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);
  if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    const svgImg = new Image();
    svgImg.crossOrigin = 'anonymous';
    svgImg.onload = () => {
      ctx.drawImage(svgImg, 0, 0, targetWidth, targetHeight);
      URL.revokeObjectURL(url);
      resolve();
    };
    svgImg.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    svgImg.src = url;
  });

  return canvas;
}

/**
 * Converts the live vector SVG into a 300 DPI print-ready canvas,
 * and exports an exact A4 Landscape PDF with zero margin sizing issues.
 */
export async function generateHighQualityPdf({
  svgElement,
  recipientName,
  templateName,
  backgroundUri,
}: GeneratePdfOptions): Promise<void> {
  const canvas = await renderCertificateToCanvas(svgElement, backgroundUri);

  // Convert to high-resolution JPEG
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // Create PDF: Exact A4 Landscape (297 x 210 mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Use internal page size dimensions to guarantee full-bleed coverage without white gaps
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Draw exactly edge-to-edge covering full page
  pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight, undefined, 'SLOW');

  // Document Metadata
  pdf.setProperties({
    title: `Certificate - ${recipientName}`,
    subject: templateName,
    author: 'CertiFast Certificate Generator',
    creator: 'CertiFast Engine',
  });

  // Clean filename
  const safeName = (recipientName || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_');
  pdf.save(`${safeName}-Certificate.pdf`);

  fireCelebrationConfetti();
}

/**
 * Exports high-resolution 300 DPI PNG image for instant social media or messaging sharing.
 */
export async function generateHighQualityImage({
  svgElement,
  recipientName,
  backgroundUri,
}: GeneratePdfOptions): Promise<void> {
  const canvas = await renderCertificateToCanvas(svgElement, backgroundUri);
  const imgData = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  const safeName = (recipientName || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `${safeName}-Certificate-300DPI.png`;
  link.href = imgData;
  link.click();

  fireCelebrationConfetti();
}
