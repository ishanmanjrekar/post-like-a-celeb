import React from 'react';
import { TOPICS, type GeneratedPost } from '../utils/topics';

interface CelebrityCardProps {
  post: GeneratedPost | null;
  platform: 'x' | 'instagram';
  cardRef: React.RefObject<HTMLDivElement | null>;
  isDark?: boolean;
}

const getCaption = (topicId: string) => {
  const topic = TOPICS.find((t) => t.id === topicId);
  const icon = topic?.icon || '✨';
  
  const phrases = [
    'minimum effort',
    'bare minimum',
    'minimum vibes',
    'minimum energy',
    'minimum stance',
    'minimum take'
  ];
  
  const index = topicId.charCodeAt(0) % phrases.length;
  const phrase = phrases[index];
  
  const apathyEmojis = ['😑', '🤐', '🥱', '🤷', '🤍', '📉', '🔋', '🧱', '🕊️'];
  const emojiIndex = (topicId.charCodeAt(topicId.length - 1) || 0) % apathyEmojis.length;
  const secondaryEmoji = apathyEmojis[emojiIndex];
  
  return `${phrase} ${icon}${secondaryEmoji}`;
};

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

  const { content, likes } = post;

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
          flexShrink: 0
        }}>
          NV
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
            }}>Neutral Voice</span>
            <svg
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
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.94.1-1.348.27C14.825 2.515 13.512 1.5 12 1.5s-2.825 1.015-3.422 2.28c-.408-.17-.868-.27-1.348-.27-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .94-.1 1.348-.27.597 1.265 1.91 2.28 3.422 2.28s2.825-1.015 3.422-2.28c.408.17.868.27 1.348.27 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.43l-3.23-3.23 1.42-1.42 1.81 1.81 5.23-5.23 1.42 1.42-6.65 6.65z" />
            </svg>
          </div>
          <span style={{
            fontSize: '12px',
            color: themeColors.subText
          }}>@the_neutral_take</span>
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
          <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px', fill: 'currentColor' }}>
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
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
            <div style={{
              marginLeft: '-16px',
              marginRight: '-16px',
              marginBottom: '16px',
              aspectRatio: '1 / 1',
              backgroundColor: '#faf8f2', // Warm white/light yellow paper background
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: `1px solid ${themeColors.border}`,
              overflow: 'hidden',
              boxSizing: 'border-box',
              padding: '40px 30px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '48px',
                lineHeight: '1',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
                color: '#8b8678', // Muted gold/warm grey quote mark
                marginBottom: '8px',
                opacity: 0.8
              }}>
                “
              </span>
              <p style={{
                margin: 0,
                fontSize: '18px',
                lineHeight: 1.5,
                fontWeight: 600,
                fontFamily: "Georgia, 'Times New Roman', serif", // Elegant serif plain text
                color: '#2d2b27', // warm dark grey/brown-black
                wordBreak: 'break-word',
                maxWidth: '90%'
              }}>
                {content}
              </p>
              <div style={{
                marginTop: '16px',
                width: '32px',
                height: '1px',
                backgroundColor: '#dcd8cd', // thin minimal separator line
              }}></div>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.45,
              color: themeColors.subText,
              margin: '0 0 12px 0',
              fontStyle: 'italic'
            }}>
              {getCaption(post.topicId)}
            </p>
          </>
        ) : (
          <div style={{ margin: '6px 0 16px 0' }}>
            <p style={{
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: 1.35,
              color: themeColors.text,
              margin: 0
            }}>
              {content}
            </p>
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
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
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
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
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
          <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
