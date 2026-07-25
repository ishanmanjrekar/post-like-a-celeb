import React from 'react';
import { type GeneratedPost } from '../utils/topics';

interface CelebrityCardProps {
  post: GeneratedPost | null;
  platform: 'x' | 'instagram';
  cardRef: React.RefObject<HTMLDivElement | null>;
  isDark?: boolean;
}


/**
 * Renders content that may contain \n\n paragraph breaks as separate <p> elements.
 */
function renderParagraphs(
  text: string,
  style: React.CSSProperties
): React.ReactNode {
  const paras = text.split('\n\n').filter(Boolean);
  if (paras.length === 1) {
    return <p style={{ ...style, margin: 0 }}>{text}</p>;
  }
  return (
    <>
      {paras.map((para, i) => (
        <p
          key={i}
          style={{
            ...style,
            margin: i < paras.length - 1 ? '0 0 12px 0' : '0',
          }}
        >
          {para}
        </p>
      ))}
    </>
  );
}

export const CelebrityCard: React.FC<CelebrityCardProps> = ({
  post,
  platform,
  cardRef,
  isDark = false
}) => {
  if (!post) {
    return (
      <div style={{
        padding: '30px',
        textAlign: 'center',
        color: isDark ? '#e5bdbe' : '#5c3f41',
        fontStyle: 'italic',
        background: isDark ? '#1a1523' : '#f4f3f8',
        border: `1px dashed ${isDark ? '#906f70' : '#e5bdbe'}`,
        borderRadius: '16px',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        Manifest neutrality to view the post.
      </div>
    );
  }

  const { content, likes, authorName, authorHandle, avatarUrl, avatarText } = post;

  // Vivid Satire Color Tokens based on Theme
  const themeColors = {
    background: isDark ? '#0c0814' : '#ffffff',
    border: isDark ? '#906f70' : '#e5bdbe',
    text: isDark ? '#f1f0f5' : '#1a1b1f',
    subText: isDark ? '#e5bdbe' : '#5c3f41',
    primary: '#ba0035',
    secondary: '#006970',
    glassBg: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.2)',
    glassText: isDark ? '#f1f0f5' : '#1a1b1f',
    glassBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.35)',
  };

  // Card element inline styles for reliable SVG foreignObject image export
  const cardStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: themeColors.background,
    border: `1px solid ${themeColors.border}`,
    borderRadius: '16px',
    boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(186, 0, 53, 0.04)',
    overflow: 'hidden',
    boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div
      ref={cardRef}
      id="export-card"
      style={cardStyle}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `1px solid ${themeColors.border}`,
          background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '14px',
          letterSpacing: '0.5px',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={authorName || 'Profile Icon'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          ) : (
            avatarText || 'NV'
          )}
        </div>
        <div style={{
          marginLeft: '12px',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: themeColors.text
            }}>{authorName || 'Neutral Voice'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                width: '14px',
                height: '14px',
                fill: themeColors.primary,
                flexShrink: 0,
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
            >
              <path fill={themeColors.primary} d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.94.1-1.348.27C14.825 2.515 13.512 1.5 12 1.5s-2.825 1.015-3.422 2.28c-.408-.17-.868-.27-1.348-.27-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .94-.1 1.348-.27.597 1.265 1.91 2.28 3.422 2.28s2.825-1.015 3.422-2.28c.408.17.868.27 1.348.27 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.43l-3.23-3.23 1.42-1.42 1.81 1.81 5.23-5.23 1.42 1.42-6.65 6.65z" />
            </svg>
          </div>
          <span style={{
            fontSize: '12px',
            color: themeColors.subText
          }}>{authorHandle || '@the_neutral_take'}</span>
        </div>
        <button style={{
          marginLeft: 'auto',
          color: themeColors.subText,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: 0
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: themeColors.subText }}>
            <path fill={themeColors.subText} d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        padding: '0 16px 16px 16px',
        boxSizing: 'border-box'
      }}>
        {platform === 'instagram' ? (
          <>
            {/* Compute layout properties based on content length */}
            {(() => {
              const len = content.length;
              // Font size: scales from 17px (short) down to 10px (very long)
              const fontSize = len <= 100 ? 17
                : len <= 200 ? 15
                : len <= 300 ? 13
                : len <= 450 ? 11.5
                : 10.5;
              // Padding: tighter for longer text
              const padV = len <= 150 ? 36 : len <= 300 ? 26 : 18;
              const padH = len <= 150 ? 28 : len <= 350 ? 22 : 18;
              // Hide decorative " and _ framing when text is long
              const showFrame = len <= 200;

              const textStyle: React.CSSProperties = {
                margin: 0,
                fontSize: `${fontSize}px`,
                lineHeight: 1.6,
                fontWeight: showFrame ? 600 : 500,
                fontFamily: showFrame
                  ? "Georgia, 'Times New Roman', serif"
                  : "'Plus Jakarta Sans', Inter, sans-serif",
                color: showFrame ? '#2d2b27' : '#f0ece4',
                wordBreak: 'break-word',
                width: '100%',
                letterSpacing: showFrame ? '0' : '0.01em',
              };

              return (
                <div style={{
                  marginLeft: '-16px',
                  marginRight: '-16px',
                  marginBottom: '16px',
                  aspectRatio: '1 / 1',
                  background: showFrame
                    ? '#faf8f2'
                    : 'linear-gradient(145deg, #1a0a10 0%, #0a1a1c 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  borderBottom: `1px solid ${themeColors.border}`,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  padding: `${padV}px ${padH}px`,
                  textAlign: 'left',
                }}>
                  {showFrame && (
                    <span style={{
                      fontSize: '44px',
                      lineHeight: '1',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 'bold',
                      color: '#8b8678',
                      marginBottom: '6px',
                      opacity: 0.8,
                    }}>
                      "
                    </span>
                  )}
                  {renderParagraphs(content, textStyle)}
                  {showFrame && (
                    <div style={{
                      marginTop: '14px',
                      width: '32px',
                      height: '1px',
                      backgroundColor: '#dcd8cd',
                    }} />
                  )}
                </div>
              );
            })()}
            <p style={{
              fontSize: '14px',
              lineHeight: 1.45,
              color: themeColors.subText,
              margin: '0 0 12px 0',
              fontStyle: 'italic'
            }}>
              {post.caption}
            </p>
          </>
        ) : (
          <div style={{ margin: '6px 0 16px 0' }}>
            {renderParagraphs(content, {
              fontSize: content.length <= 150 ? '20px'
                : content.length <= 300 ? '17px'
                : content.length <= 450 ? '15px'
                : '13px',
              fontWeight: 700,
              lineHeight: 1.45,
              color: themeColors.text,
            })}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderTop: `1px solid ${themeColors.border}`,
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            padding: 0,
            color: themeColors.text,
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: themeColors.text }}>
              <path fill={themeColors.text} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>{likes}</span>
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: themeColors.text,
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: themeColors.text }}>
              <path fill={themeColors.text} d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
            </svg>
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            color: themeColors.text,
            cursor: 'pointer'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: themeColors.text }}>
              <path fill={themeColors.text} d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          padding: 0,
          color: themeColors.text,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: themeColors.text }}>
            <path fill={themeColors.text} d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
