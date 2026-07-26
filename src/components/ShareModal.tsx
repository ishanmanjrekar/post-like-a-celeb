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
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

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
    if (!pngDataUrl || pngDataUrl === 'ERROR') return;
    const link = document.createElement('a');
    link.href = pngDataUrl;
    link.download = `fence-sitter-apathy-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Single Share Action (Native Web Share API if supported, clipboard + download fallback)
  const handleShare = async () => {
    const text = `"${postText}"\n\nGenerated via The Fence-Sitter 🕊️`;

    // Try native Web Share API (Mobile / supported browsers)
    if (navigator.share && pngDataUrl && pngDataUrl !== 'ERROR') {
      try {
        const blob = dataURLtoBlob(pngDataUrl);
        const file = new File([blob], 'fence-sitter-post.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'The Fence-Sitter',
            text: text,
            files: [file]
          });
          return;
        } else {
          await navigator.share({
            title: 'The Fence-Sitter',
            text: text
          });
          return;
        }
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
        console.warn('Native share cancelled or failed:', err);
      }
    }

    // Fallback: Copy post text to clipboard and trigger PNG download
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareFeedback('Post text copied to clipboard & image downloaded!');
      } else {
        setShareFeedback('Image downloaded!');
      }
    } catch {
      setShareFeedback('Image downloaded!');
    }

    handleDownload();
    setTimeout(() => setShareFeedback(null), 4500);
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

            {/* Clean Pop Art Title Fix */}
            <h3 style={{
              margin: '0',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '26px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              color: '#ff2a85',
              textShadow: '2px 2px 0px #181028',
              lineHeight: 1.2
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
              padding: '14px',
              border: '3.5px solid #181028',
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
                    maxHeight: '220px',
                    borderRadius: '0px',
                    objectFit: 'contain'
                  }}
                />
              ) : pngDataUrl === 'ERROR' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '10px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#ff1744' }}>warning</span>
                  <span style={{ fontSize: '13px', color: '#181028', fontWeight: 700 }}>
                    Image export failed. You can still share text below.
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

            {/* Direct Action Pipeline - 2 Buttons: Download PNG & Single Share Button */}
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

              {/* 2. Single Share Button (Replaces Share to Instagram & Share to X) */}
              <button
                disabled={!pngDataUrl || pngDataUrl === 'ERROR'}
                onClick={handleShare}
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
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
                Share
              </button>
            </div>

            {/* Informational Feedback */}
            <AnimatePresence>
              {shareFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    fontSize: '13px',
                    color: '#181028',
                    background: '#ffd600',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    lineHeight: '1.4',
                    border: '2px solid #181028',
                    boxShadow: '2px 2px 0px #181028'
                  }}
                >
                  ✨ {shareFeedback}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
