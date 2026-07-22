// Configure PDF.js Worker
if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
  (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

export interface OCRResult {
  success: boolean;
  extractedText: string;
  isScanned: boolean;
  checks: {
    nameMatches: boolean;
    nimMatches: boolean;
    prodiMatches: boolean;
    yearMatches: boolean;
  };
  details: {
    nameTokensFound: number;
    totalNameTokens: number;
  };
}

/**
 * Extracts digital text directly from a PDF file using PDF.js.
 */
export async function extractTextFromDigitalPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = (window as any).pdfjsLib;
  if (!pdfjsLib) {
    throw new Error('PDF.js library not loaded. Check index.html CDNs.');
  }

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  // Extract from the first page (PMB letters are usually 1 page)
  const numPages = Math.min(pdf.numPages, 1);
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText.trim();
}

/**
 * Renders the first page of a PDF to an offscreen canvas.
 */
export async function renderPDFPageToCanvas(file: File, pageNum: number = 1): Promise<HTMLCanvasElement> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = (window as any).pdfjsLib;
  if (!pdfjsLib) {
    throw new Error('PDF.js library not loaded.');
  }

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(pageNum);
  
  // Render at 2.0x scale for high OCR accuracy
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    throw new Error('Could not get 2D canvas context.');
  }
  
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas;
}

/**
 * Scans an HTML5 Canvas using Tesseract.js.
 */
export async function scanCanvasWithTesseract(
  canvas: HTMLCanvasElement, 
  onProgress?: (progress: number) => void
): Promise<string> {
  const Tesseract = (window as any).Tesseract;
  if (!Tesseract) {
    throw new Error('Tesseract.js library not loaded. Check index.html CDNs.');
  }

  const result = await Tesseract.recognize(canvas, 'eng', {
    logger: (m: any) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    }
  });

  return result.data.text || '';
}

/**
 * Evaluates the extracted text against the input form parameters.
 */
export function verifyExtractedText(
  text: string, 
  inputName: string, 
  inputNIM: string
): Omit<OCRResult, 'extractedText' | 'isScanned'> {
  const cleanText = text.toLowerCase();
  const cleanInputName = inputName.toLowerCase().trim();
  const cleanInputNIM = inputNIM.replace(/\s+/g, '').trim(); // Remove all spaces

  // 1. NIM Match Check
  const textWithoutSpaces = cleanText.replace(/\s+/g, '');
  const nimMatches = textWithoutSpaces.includes(cleanInputNIM);

  // 2. Name Match Check (Fuzzy Check)
  const nameWords = cleanInputName
    .split(/\s+/)
    .filter(w => w.length > 2); // only words with length > 2

  let nameTokensFound = 0;
  nameWords.forEach(word => {
    if (cleanText.includes(word)) {
      nameTokensFound++;
    }
  });

  // Approved if at least 60% of name tokens are found
  const nameMatches = nameWords.length > 0 
    ? (nameTokensFound / nameWords.length) >= 0.6 
    : true;

  // 3. Prodi Check (Teknik Informatika)
  const prodiMatches = cleanText.includes('teknik') && (cleanText.includes('informatika') || cleanText.includes('inf'));

  // 4. Year Check (2026 or 26)
  const yearMatches = cleanText.includes('2026') || cleanText.includes('26');

  const success = nameMatches && nimMatches && prodiMatches && yearMatches;

  return {
    success,
    checks: {
      nameMatches,
      nimMatches,
      prodiMatches,
      yearMatches
    },
    details: {
      nameTokensFound,
      totalNameTokens: nameWords.length
    }
  };
}
