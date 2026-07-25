import { useState } from 'react';
import { BoundingBox } from './components/BoundingBox';
import { useGameLoop } from './hooks/useGameLoop';

function App() {
  const [ticks, setTicks] = useState(0);

  useGameLoop(() => {
    setTicks((prev) => prev + 1);
  });

  return (
    <BoundingBox width={450} height={800}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0c1b 0%, #201335 100%)',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 0
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        {/* Central Glassmorphic Card */}
        <div style={{
          padding: '40px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          maxWidth: '85%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '6px 16px',
            borderRadius: '999px',
            color: '#10b981',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite alternate'
            }} />
            SYSTEM READY
          </div>

          <h1 style={{
            fontSize: '36px',
            margin: '0',
            fontWeight: '800',
            background: 'linear-gradient(to right, #c084fc, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            Post Like a Celeb
          </h1>

          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            margin: '0',
            lineHeight: '1.5'
          }}>
            this is working
          </p>

          {/* Loop ticking metric */}
          <div style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              fontSize: '13px',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              Game Loop Diagnostic
            </span>
            <code style={{
              background: 'rgba(0, 0, 0, 0.2)',
              color: '#c084fc',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '15px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
            }}>
              Ticks: {ticks}
            </code>
          </div>
        </div>

        {/* Style block for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.6; }
            100% { transform: scale(1.2); opacity: 1; }
          }
        `}} />
      </div>
    </BoundingBox>
  );
}

export default App;
