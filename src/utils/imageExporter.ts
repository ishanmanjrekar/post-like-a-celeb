import html2canvas from 'html2canvas';

/**
 * Client-Side Image Export Engine
 * 
 * Uses html2canvas to render the target DOM element directly onto a high-DPI HTML5 canvas.
 * Resolves to a base64 PNG data URL.
 */
export async function exportElementAsPng(
  element: HTMLElement,
  _width?: number,
  _height?: number
): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  return canvas.toDataURL('image/png');
}
