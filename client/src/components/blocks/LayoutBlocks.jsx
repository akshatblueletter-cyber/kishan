import BlockRenderer from './BlockRenderer.jsx';

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

// Book cover + text.
export function Book({ block }) {
  return (
    <div className="b-book">
      {block.image && (
        <img
          className="b-book-cover"
          src={block.image}
          alt="The Journey: From Suffering to Bliss — book cover"
          width="250"
          height="354"
          loading="lazy"
        />
      )}
      <div className="b-book-body">
        <BlockRenderer blocks={block.blocks} />
      </div>
    </div>
  );
}

// About intro with photo (placeholder until the client sends one).
export function Photo({ block }) {
  return (
    <div className="b-photo">
      {block.image ? (
        <img className="b-photo-img" src={block.image} alt="Dr. Krishan Avtar" width="230" height="290" loading="lazy" />
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
