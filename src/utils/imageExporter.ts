/**
 * Client-Side Image Export Engine
 * 
 * Serializes a React DOM element into an SVG `<foreignObject>` block,
 * loads it into an HTML Image, and draws it onto a high-resolution canvas.
 * Resolves to a base64 PNG data URL that can be downloaded or shared.
 */
export async function exportElementAsPng(
  element: HTMLElement,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const padding = 24;
    const canvasWidth = width + padding * 2;
    const canvasHeight = height + padding * 2;

    // 1. Extract the outer HTML of the element and ensure all inner SVGs declare the SVG namespace
    let outerHtml = element.outerHTML;
    outerHtml = outerHtml.replace(/<svg(?![^>]*xmlns=)/gi, '<svg xmlns="http://www.w3.org/2000/svg"');

    // 2. Construct valid XHTML wrapping the element
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            box-sizing: border-box;
            padding: ${padding}px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          ">
            <div style="width: ${width}px; height: ${height}px;">
              ${outerHtml}
            </div>
          </div>
        </foreignObject>
      </svg>
    `;

    // 3. Base64 encode the SVG content
    const base64Svg = window.btoa(unescape(encodeURIComponent(svgContent)));
    const imgSource = `data:image/svg+xml;base64,${base64Svg}`;

    // 4. Load SVG data URL into an HTML Image element
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSource;

    img.onload = () => {
      // 5. Draw the image onto a Canvas element with 2x resolution scaling for high-DPI clarity
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth * scale;
      canvas.height = canvasHeight * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to obtain 2D canvas context.'));
        return;
      }

      // Ensure canvas starts clean and transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render the loaded SVG image to the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        // 6. Generate the PNG data URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      reject(new Error('Failed to rasterize the SVG layout: ' + err));
    };
  });
}
