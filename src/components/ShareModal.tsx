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
    const text = `"${postText}"\n\nGenerated via The Fence-Sitter 🕊️`;
    
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

  // Keyboard Escape key support to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(12, 8, 20, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              cursor: 'pointer'
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
              background: '#ffffff',
              border: '3.5px solid #181028',
              borderRadius: '24px',
              padding: '28px 24px',
              maxWidth: '380px',
              width: '100%',
              boxSizing: 'border-box',
              boxShadow: '8px 8px 0px #181028',
              color: '#181028',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '90vh',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              fontFamily: "'Outfit', 'Fredoka', sans-serif"
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 50,
                background: '#ffd600',
                border: '2.5px solid #181028',
                boxShadow: '2px 2px 0px #181028',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#181028',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 900,
                transition: 'transform 0.1s',
                pointerEvents: 'auto'
              }}
            >
              ✕
            </button>

            <h3 style={{
              margin: '0 0 4px 0',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.3px',
              color: '#ff2a85',
              WebkitTextStroke: '1px #ffffff',
              filter: 'drop-shadow(2px 2px 0px #181028)'
            }}>
              Share Apathy
            </h3>

            {/* Thumbnail Preview Box */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#ffedf6',
              borderRadius: '20px',
              padding: '12px',
              border: '3px solid #181028',
              boxShadow: '3px 3px 0px #181028',
              minHeight: '160px',
              boxSizing: 'border-box'
            }}>
              {pngDataUrl && pngDataUrl !== 'ERROR' ? (
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
              ) : pngDataUrl === 'ERROR' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '10px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ff1744' }}>warning</span>
                  <span style={{ fontSize: '13px', color: '#181028', fontWeight: 700 }}>
                    Image export failed. You can still share text to X below.
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <span 
                    className="material-symbols-outlined animate-spin" 
                    style={{
                      fontSize: '32px',
                      color: '#ff2a85'
                    }}
                  >
                    refresh
                  </span>
                  <span style={{ fontSize: '13px', color: '#181028', fontWeight: 700 }}>
                    Rasterizing Canvas...
                  </span>
                </div>
              )}
            </div>

            {/* Direct Action Pipeline - Pill Styled Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* 1. Download PNG */}
              <button
                disabled={!pngDataUrl || pngDataUrl === 'ERROR'}
                onClick={handleDownload}
                style={{
                  background: '#ff2a85',
                  color: '#ffffff',
                  border: '3px solid #181028',
                  borderRadius: '16px',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: (pngDataUrl && pngDataUrl !== 'ERROR') ? 'pointer' : 'not-allowed',
                  opacity: (pngDataUrl && pngDataUrl !== 'ERROR') ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  boxShadow: '4px 4px 0px #181028',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                Download PNG
              </button>

              {/* 2. Share to Instagram */}
              <button
                disabled={!pngDataUrl || pngDataUrl === 'ERROR'}
                onClick={handleShareInstagram}
                style={{
                  background: '#ffd600',
                  color: '#181028',
                  border: '3px solid #181028',
                  borderRadius: '16px',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: (pngDataUrl && pngDataUrl !== 'ERROR') ? 'pointer' : 'not-allowed',
                  opacity: (pngDataUrl && pngDataUrl !== 'ERROR') ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  boxShadow: '4px 4px 0px #181028',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>photo_camera</span>
                Share to Instagram
              </button>

              {/* 3. Share to X */}
              <button
                onClick={handleShareX}
                style={{
                  background: '#ffffff',
                  color: '#181028',
                  border: '3px solid #181028',
                  borderRadius: '16px',
                  fontFamily: 'Fredoka, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  opacity: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  boxShadow: '4px 4px 0px #181028',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
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
