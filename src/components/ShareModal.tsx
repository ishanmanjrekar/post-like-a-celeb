import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  pngDataUrl: string | null;
  postText: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  pngDataUrl,
  postText
}) => {
  const [showInstaTip, setShowInstaTip] = useState(false);

  // Helper to convert base64 data URL to blob
  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // 1. Download PNG
  const handleDownload = () => {
    if (!pngDataUrl) return;
    const link = document.createElement('a');
    link.href = pngDataUrl;
    link.download = `fence-sitter-apathy-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Share to X (Twitter Intent or Native Share if available)
  const handleShareX = async () => {
    const text = `"${postText}"\n\nGenerated via Fence Sitter 🕊️`;
    
    // Try native share first on mobile
    if (navigator.share && pngDataUrl) {
      try {
        const blob = dataURLtoBlob(pngDataUrl);
        const file = new File([blob], 'fence-sitter-post.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Share to X',
            text: text
          });
          return;
        }
      } catch (err) {
        console.warn('Native share failed, falling back to URL intent:', err);
      }
    }

    // Fallback/Desktop: Open intent link
    const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(xShareUrl, '_blank', 'noopener,noreferrer');
  };

  // 3. Share to Instagram (Native share with file on mobile, or download + show instructions on desktop)
  const handleShareInstagram = async () => {
    if (!pngDataUrl) return;

    // Mobile: Try to share image file natively
    if (navigator.share) {
      try {
        const blob = dataURLtoBlob(pngDataUrl);
        const file = new File([blob], 'instagram-post.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Share to Instagram',
            text: '#ApathyVibes'
          });
          return;
        }
      } catch (err) {
        console.warn('Native Instagram share failed:', err);
      }
    }

    // Desktop/Fallback: Trigger download and display a helpful tooltip tip
    handleDownload();
    setShowInstaTip(true);
    setTimeout(() => setShowInstaTip(false), 5000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Backdrop Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(12, 8, 20, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            style={{
              position: 'relative',
              background: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: '24px',
              padding: '28px 24px',
              maxWidth: '380px',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: 'var(--shadow-diffused)',
              color: 'var(--color-on-surface)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '90vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--color-outline-variant)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-on-surface-variant)',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface-container-high)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
            >
              ✕
            </button>

            <h3 style={{
              margin: '0 0 4px 0',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--color-primary)'
            }}>
              Share Apathy
            </h3>

            {/* Thumbnail Preview Box */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'var(--color-surface-container-low)',
              borderRadius: '20px',
              padding: '12px',
              border: '1px solid var(--color-outline-variant)',
              minHeight: '160px',
              boxSizing: 'border-box'
            }}>
              {pngDataUrl ? (
                <img
                  src={pngDataUrl}
                  alt="Post Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <span 
                    className="material-symbols-outlined animate-spin" 
                    style={{
                      fontSize: '32px',
                      color: 'var(--color-primary)'
                    }}
                  >
                    refresh
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                    Rasterizing Canvas...
                  </span>
                </div>
              )}
            </div>

            {/* Direct Action Pipeline - Pill Styled Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* 1. Download PNG */}
              <button
                disabled={!pngDataUrl}
                onClick={handleDownload}
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: pngDataUrl ? 'pointer' : 'not-allowed',
                  opacity: pngDataUrl ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-vivid)',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                onMouseDown={(e) => { if (pngDataUrl) { e.currentTarget.style.transform = 'translate(4px, 4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-active)'; } }}
                onMouseUp={(e) => { if (pngDataUrl) { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = 'var(--shadow-vivid)'; } }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                Download PNG
              </button>

              {/* 2. Share to Instagram */}
              <button
                disabled={!pngDataUrl}
                onClick={handleShareInstagram}
                style={{
                  background: 'var(--color-secondary-container)',
                  color: 'var(--color-on-secondary-container)',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: pngDataUrl ? 'pointer' : 'not-allowed',
                  opacity: pngDataUrl ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'transform 0.1s, filter 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
                onMouseDown={(e) => { if (pngDataUrl) e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { if (pngDataUrl) e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>photo_camera</span>
                Share to Instagram
              </button>

              {/* 3. Share to X */}
              <button
                disabled={!pngDataUrl}
                onClick={handleShareX}
                style={{
                  background: '#000000',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '14px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: pngDataUrl ? 'pointer' : 'not-allowed',
                  opacity: pngDataUrl ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'transform 0.1s, background-color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#151515'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
                onMouseDown={(e) => { if (pngDataUrl) e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { if (pngDataUrl) e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <span style={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif', 
                  fontSize: '15px', 
                  fontWeight: 900 
                }}>𝕏</span>
                Share to X
              </button>
            </div>

            {/* Informational tip for Instagram sharing on desktop */}
            <AnimatePresence>
              {showInstaTip && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-on-secondary-container)',
                    background: 'var(--color-secondary-container)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    lineHeight: '1.4',
                    border: '1px solid var(--color-outline-variant)'
                  }}
                >
                  📸 Image downloaded! Open Instagram and choose the image from your gallery to share.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
