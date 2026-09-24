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
 * onto a 300 DPI canvas (3508 x 2480 pixels).
 */
async function renderCertificateToCanvas(
  svgElement: SVGSVGElement,
  backgroundUri?: string
): Promise<HTMLCanvasElement> {
  if (document.fonts) {
    await document.fonts.ready;
  }

  // A4 Landscape at 300 DPI: 3508 x 2480 pixels
  const targetWidth = 3508;
  const targetHeight = 2480;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Detect if there is a background image to draw directly
  const embeddedImage = svgElement.querySelector('image');
  const bgUrl = backgroundUri || embeddedImage?.getAttribute('href') || embeddedImage?.getAttribute('xlink:href');

  if (bgUrl) {
    await new Promise<void>((resolve) => {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, targetWidth, targetHeight);
        resolve();
      };
      bgImg.onerror = () => {
        // Fallback: draw neutral background if image fails
        ctx.fillStyle = '#fdfaf3';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        resolve();
      };
      bgImg.src = bgUrl;
    });
  }

  // 2. Clone SVG and strip background image if already drawn to avoid subresource blocking
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('width', `${targetWidth}`);
  clone.setAttribute('height', `${targetHeight}`);

  if (bgUrl) {
    const cloneImg = clone.querySelector('image');
    if (cloneImg) cloneImg.remove();
  }

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
 * and exports an A4 Landscape PDF.
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

  // Create PDF: A4 Landscape (297 x 210 mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Add 300 DPI rasterized certificate
  pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');

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
