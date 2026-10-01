import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPage } from '../api/api.js';

// Suggestions shown until the search page data has loaded from MongoDB.
const FALLBACK = ['Why do we suffer?', 'What is happiness?', 'Who am I?', 'What is Sharanagati?'];

// 🔍 Search panel under the header.
export default function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate();
  const input = useRef(null);
  const [q, setQ] = useState('');
  const [box, setBox] = useState(null); // the searchBox block of the “search” page

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    if (box) return;
    const controller = new AbortController();
    getPage('search', { signal: controller.signal })
      .then((p) => setBox(p.blocks.find((b) => b.type === 'searchBox') || null))
      .catch(() => {});
    return () => controller.abort();
  }, [open, box]);

  if (!open) return null;

  const go = (query) => {
    const text = query.trim();
    if (!text) return;
    onClose();
    setQ('');
    navigate(`/search?q=${encodeURIComponent(text)}`);
  };

  const suggestions = box?.suggestions || FALLBACK;

  return (
    <>
      <div className="ov-backdrop" onClick={onClose} aria-hidden="true" />
      <div id="search-overlay" className="search-ov" role="dialog" aria-modal="true" aria-label="Search">
        <form
          className="search-form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            go(q);
          }}
        >
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            id="site-search"
            ref={input}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={box?.placeholder || 'What are you curious about?'}
            autoComplete="off"
          />
          <button type="submit" className="btn-dark">
            Search
          </button>
        </form>
        <div className="search-suggest">
          <span className="search-suggest-label">{box?.suggestionsLabel || 'Try asking'}</span>
          <div className="search-chips">
            {suggestions.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => go(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
