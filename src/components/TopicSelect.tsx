import { useEffect, useRef, useState } from 'react';
import type { TopicDefinition } from '../utils/topics';

interface TopicSelectProps {
  topics: TopicDefinition[];
  value: string;
  onChange: (id: string) => void;
}

export function TopicSelect({ topics, value, onChange }: TopicSelectProps) {
  const selected = topics.find(t => t.id === value) ?? topics[0];

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div ref={containerRef} className="topic-select-root">
      {/* Trigger button */}
      <button
        type="button"
        className={`topic-select-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="topic-select-selected-label">
          {selected.icon}&nbsp;&nbsp;{selected.label}
        </span>
        <span className={`material-symbols-outlined topic-select-chevron ${open ? 'flipped' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul className="topic-select-panel" role="listbox">
          {topics.map(topic => (
            <li
              key={topic.id}
              role="option"
              aria-selected={topic.id === value}
              className={`topic-select-option ${topic.id === value ? 'active' : ''}`}
              onClick={() => {
                onChange(topic.id);
                setOpen(false);
              }}
            >
              <span className="topic-option-icon">{topic.icon}</span>
              <span className="topic-option-label">{topic.label}</span>
              {topic.id === value && (
                <span className="material-symbols-outlined topic-option-check">check</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
