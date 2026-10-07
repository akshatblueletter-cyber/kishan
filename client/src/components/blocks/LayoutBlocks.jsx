import { useState } from 'react';
import BlockRenderer from './BlockRenderer.jsx';
import Lightbox from '../Lightbox.jsx';

// Grid of cards (Foundation Words, Wisdom, Human Experience, Conversations, Works …).
export function CardGrid({ block }) {
  return (
    <div className={`b-cards cols-${block.columns || 2}`}>
      {block.cards.map((card, i) => (
        <article key={i} className="b-card">
          <div className="b-card-top">
            <span className="b-card-num">{String(i + 1).padStart(2, '0')}</span>
            {card.tag && <span className="b-tag">{card.tag}</span>}
          </div>
          <h3 className="b-card-title">{card.title}</h3>
          <BlockRenderer blocks={card.blocks} />
        </article>
      ))}
    </div>
  );
}

// Morning · During the day · Evening · Closing
export function Columns({ block }) {
  return (
    <div className="b-columns" style={{ '--cols': block.columns.length }}>
      {block.columns.map((col, i) => (
        <section key={i} className="b-col">
          <h4 className="b-col-title">{col.title}</h4>
          <BlockRenderer blocks={col.blocks} />
        </section>
      ))}
    </div>
  );
}

// 5 Parts · 22 Chapters · 22 Foundation Words · Practical Sadhana
export function Stats({ block }) {
  return (
    <dl className="b-stats">
      {block.items.map((s, i) => (
        <div key={i}>
          <dd>{s.value}</dd>
          <dt>{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

// About → Medicine (and the Pleasure/Joy/… definitions in Chapter 11).
export function Timeline({ block }) {
  return (
    <div className={`b-timeline${block.variant === 'definitions' ? ' is-definitions' : ''}`}>
      {block.items.map((item, i) => (
        <div key={i} className="b-timeline-item">
          <p className="b-timeline-title">{item.title}</p>
          <p className="b-timeline-text">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

// Book: front cover, with the back cover (if any) below it, + text.
// Clicking a cover opens it full-size so the back-cover text can be read.
export function Book({ block }) {
  const [zoom, setZoom] = useState(null); // the cover being viewed full-size
  const covers = [
    { side: 'front', src: block.image, alt: 'The Journey: From Suffering to Bliss — front cover' },
    { side: 'back', src: block.backImage, alt: 'The Journey: From Suffering to Bliss — back cover' },
  ].filter((c) => c.src);

  return (
    <div className="b-book">
      {covers.length > 0 && (
        <div className="b-book-figure">
          {covers.map((cover) => (
            <button key={cover.side} type="button" className="b-book-zoom" onClick={() => setZoom(cover)} aria-label={`Enlarge the ${cover.side} cover`}>
              <img className="b-book-cover" src={cover.src} alt={cover.alt} width="250" height="357" loading="lazy" />
              <span className="b-book-hint">Click to enlarge</span>
            </button>
          ))}
        </div>
      )}
      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
      <div className="b-book-body">
        <BlockRenderer blocks={block.blocks} />
      </div>
    </div>
  );
}

// Illustration (e.g. under a chapter title). Click to see it full-size.
export function ImageBlock({ block }) {
  const [zoom, setZoom] = useState(false);
  return (
    <figure className="b-image">
      <button type="button" className="b-image-btn" onClick={() => setZoom(true)} aria-label="Enlarge image">
        <img src={block.src} alt={block.alt || ''} width="800" height="1200" loading="lazy" decoding="async" />
        <span className="b-book-hint">Click to enlarge</span>
      </button>
      {zoom && <Lightbox src={block.src} alt={block.alt || ''} onClose={() => setZoom(false)} />}
    </figure>
  );
}

// About intro with photo (placeholder if no photo is set).
export function Photo({ block }) {
  return (
    <div className="b-photo">
      {block.image ? (
        <img className="b-photo-img" src={block.image} alt="Dr. Krishan Avtar" width="230" height="290" />
      ) : (
        <div className="b-photo-placeholder" role="img" aria-label="Photo of Dr. Krishan Avtar (coming soon)">
          Photo coming soon
        </div>
      )}
      <div className="b-photo-body">
        <BlockRenderer blocks={block.blocks} />
      </div>
    </div>
  );
}
