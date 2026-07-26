import { useEffect, useRef, useState } from 'react';
import { BoundingBox } from './components/BoundingBox';
import { CelebrityCard } from './components/CelebrityCard';
import { ShareModal } from './components/ShareModal';
import { TopicSelect } from './components/TopicSelect';
import { useStore } from './store/useStore';
import { TOPICS, SHUFFLED_TOPICS } from './utils/topics';
import { exportElementAsPng } from './utils/imageExporter';
import penpencildrawImg from './assets/penpencildraw.jpg';
import './App.css';

function App() {
  const {
    selectedTopicId,
    currentPost,
    platform,
    setSelectedTopicId,
    setPlatform,
    setIsExporting,
    generateNewPost,
    randomizeTopic
  } = useStore();

  const cardRef = useRef<HTMLDivElement>(null);
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Navigation view state: 'home' | 'preview'
  const [view, setView] = useState<'home' | 'preview'>('home');



  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (localStorage.theme === 'dark') {
      return 'dark';
    }
    return 'light';
  });

  // Apply light/dark classes on mount and theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  // Toggle Theme helper
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Handle generation click
  const handleGenerate = () => {
    generateNewPost();
    setView('preview');
  };

  // Handle image export and sharing
  const handleShareClick = async () => {
    if (!cardRef.current || !currentPost) return;

    setPngDataUrl(null);
    setIsShareModalOpen(true);
    setIsExporting(true);

    try {
      // Small delay to ensure any active UI transitions settle
      await new Promise((resolve) => setTimeout(resolve, 200));

      const rect = cardRef.current.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 200);

      const dataUrl = await exportElementAsPng(cardRef.current, width, height);
      setPngDataUrl(dataUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      setPngDataUrl('ERROR');
    } finally {
      setIsExporting(false);
    }
  };

  const selectedTopic = TOPICS.find(t => t.id === (currentPost?.topicId || selectedTopicId)) || TOPICS[0];

  return (
    <BoundingBox width={450} height={850}>
      <div className="app-container">
        {/* Dynamic Glowing Accents */}
        <div className="glow-bubble glow-top" style={{ backgroundColor: 'rgba(186, 0, 53, 0.15)' }} />
        <div className="glow-bubble glow-bottom" style={{ backgroundColor: 'rgba(0, 105, 112, 0.15)' }} />

        {view === 'home' ? (
          /* HOME SCREEN VIEW */
          <>
            {/* Floating Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="icon-btn float-theme-btn"
              title="Toggle Theme"
            >
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <main className="scroll-view">
              <div className="pop-welcome-container">
                {/* Floating Pop Accents */}
                <div className="pop-floating-emoji emoji-top-left" title="Smirk">😏</div>
                <div className="pop-floating-emoji emoji-top-right" title="Unimpressed">😒</div>
                <div className="pop-floating-emoji emoji-bottom-left" title="Neutral">😑</div>
                <div className="pop-floating-emoji emoji-bottom-right" title="Smirk">😏</div>
                <div className="pop-floating-star star-left">⭐</div>
                <div className="pop-floating-star star-right">🌟</div>

                <div className="pop-main-title">
                  <span className="pop-title-line1">The</span>
                  <span className="pop-title-line2">Fence-Sitter</span>
                </div>
                <div className="pop-subtitle-badge">
                  Apathy as a Service
                </div>
                <p className="subtitle-desc">
                  Say everything. Mean nothing. Stay on brand.
                </p>
              </div>

              <div className="config-card">
                <div className="config-header">
                  <label className="config-label">
                    <span className="material-symbols-outlined">topic</span>
                    Select a Topic
                  </label>
                  <button
                    onClick={randomizeTopic}
                    className="shuffle-btn"
                    title="Randomise Topic"
                  >
                    <span className="material-symbols-outlined">casino</span>
                    Randomise
                  </button>
                </div>

                <TopicSelect
                  topics={SHUFFLED_TOPICS}
                  value={selectedTopicId}
                  onChange={setSelectedTopicId}
                />

                <button
                  onClick={handleGenerate}
                  className="manifest-btn"
                >
                  <span>Manifest Neutrality</span>
                  <span className="material-symbols-outlined">bolt</span>
                </button>
              </div>

              {/* Inspiration Section */}
              <div className="inspiration-section">
                <p className="inspiration-header">
                  Inspired by{' '}
                  <a
                    href="https://www.instagram.com/penpencildraw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inspiration-link"
                  >
                    @penpencildraw
                  </a>
                  's post
                </p>
                <img
                  src={penpencildrawImg}
                  alt="Inspiration post by @penpencildraw"
                  className="inspiration-img"
                />
              </div>
            </main>
          </>
        ) : (
          /* PREVIEW SCREEN VIEW */
          <>
            <header className="preview-header">
              <button
                onClick={() => setView('home')}
                className="icon-btn back-btn"
                title="Go Back"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h2 className="preview-title">Preview</h2>
              <button
                onClick={toggleTheme}
                className="icon-btn"
                title="Toggle Theme"
              >
                <span className="material-symbols-outlined">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            </header>

            <main className="scroll-view">
              {selectedTopic && (
                <div className="selected-topic-banner">
                  <span className="selected-topic-label">TOPIC</span>
                  <div className="selected-topic-content">
                    <span className="selected-topic-icon">{selectedTopic.icon}</span>
                    <span className="selected-topic-text">{selectedTopic.label}</span>
                  </div>
                </div>
              )}

              <div className="toggle-tabs-row">
                <button
                  onClick={() => setPlatform('x')}
                  className={`tab-btn ${platform === 'x' ? 'active' : ''}`}
                >
                  Text Post
                </button>
                <button
                  onClick={() => setPlatform('instagram')}
                  className={`tab-btn ${platform === 'instagram' ? 'active' : ''}`}
                >
                  Image Post
                </button>
              </div>

              <div className="card-display-wrapper">
                <CelebrityCard
                  post={currentPost}
                  platform={platform}
                  cardRef={cardRef}
                  isDark={theme === 'dark'}
                />
              </div>

              <div className="page-actions-container">
                <button
                  onClick={handleShareClick}
                  className="primary-action-btn"
                >
                  <span className="material-symbols-outlined">ios_share</span>
                  Share to the Void
                </button>

                <div className="secondary-actions-grid">
                  <button
                    onClick={() => {
                      generateNewPost();
                    }}
                    className="secondary-action-btn"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                    Try Again
                  </button>
                </div>
              </div>

              {currentPost && currentPost.activeStyles && (
                <div style={{
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: theme === 'dark' ? '#1e1233' : '#ffffff',
                  border: '3px solid #181028',
                  borderRadius: '16px',
                  boxShadow: '4px 4px 0px #181028'
                }}>
                  <span style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: theme === 'dark' ? '#ffd600' : '#181028',
                  }}>
                    Performative Apathy Blend
                  </span>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    justifyContent: 'center'
                  }}>
                    {currentPost.activeStyles.map((styleName, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          backgroundColor: '#ff2a85',
                          border: '2px solid #181028',
                          color: '#ffffff',
                          whiteSpace: 'normal',
                          textAlign: 'center',
                          boxShadow: '2px 2px 0px #181028'
                        }}
                      >
                        {styleName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </>
        )}

        {/* Share Modal Dialog */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          pngDataUrl={pngDataUrl}
          postText={currentPost ? currentPost.content : ''}
        />
      </div>
    </BoundingBox>
  );
}

export default App;
