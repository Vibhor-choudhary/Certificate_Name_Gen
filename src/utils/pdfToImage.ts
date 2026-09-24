import * as pdfjsLib from 'pdfjs-dist';

// Configure worker for pdfjs in browser / Vite
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export interface ConvertedImageResult {
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Converts an uploaded File (Image or PDF) to a high-resolution PNG data URL
 * and extracts its natural dimensions.
 */
export async function convertFileToImageDataUrl(file: File): Promise<ConvertedImageResult> {
  // If it's already an image
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          resolve({
            dataUrl,
            width: img.naturalWidth || 1414,
            height: img.naturalHeight || 1000,
          });
        };
        img.onerror = () => reject(new Error('Failed to load image preview'));
        img.src = dataUrl;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  // If it's a PDF file
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      // Render at 2.5x scale for sharp preview & export
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas 2D context not available');
      }

      await page.render({
        canvas,
        canvasContext: ctx,
        viewport,
      }).promise;

      const dataUrl = canvas.toDataURL('image/png', 0.95);
      return {
        dataUrl,
        width: viewport.width,
        height: viewport.height,
      };
    } catch (err) {
      console.error('Error rendering PDF:', err);
      throw new Error('Could not convert PDF page. Please export as PNG/JPG or try another file.');
    }
  }

  throw new Error('Unsupported file format. Please upload a PDF, PNG, or JPG file.');
}
