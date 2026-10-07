import { useId, useState } from 'react';
import BlockRenderer from './BlockRenderer.jsx';
import Icon from '../Icon.jsx';
import { useAccordion } from './accordionState.js';

// Numbered click-to-open row (01, 02 …). Only one is open at a time on a page.
export function Accordion({ block }) {
  const { openId, toggle } = useAccordion();
  const open = openId === block._id;
  const btnId = `${block._id}-btn`;
  const panelId = `${block._id}-panel`;

  return (
    <div className={`acc${open ? ' is-open' : ''}`}>
      <h3 className="acc-head">
        <button
          id={btnId}
          type="button"
          className="acc-btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => toggle(block._id)}
        >
          <span className="acc-num">{String(block._n).padStart(2, '0')}</span>
          <span className="acc-q">{block.question}</span>
          <span className="acc-chev">
            <Icon name="chevron" size={16} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} className={`acc-panel${block.image ? ' has-image' : ''}`} hidden={!open}>
        {block.image ? (
          <>
            {/* text on the left, illustration on the right */}
            <div className="acc-text">
              <BlockRenderer blocks={block.blocks} />
            </div>
            <BlockRenderer blocks={[{ type: 'image', ...block.image }]} />
          </>
        ) : (
          <BlockRenderer blocks={block.blocks} />
        )}
      </div>
    </div>
  );
}

// Page 4: an “I am …” label with its accordion.
export function Group({ block }) {
  return (
    <section className="b-group">
      <p className="b-group-label">{block.label}</p>
      <BlockRenderer blocks={block.blocks} />
    </section>
  );
}

// “Explore” / “This leads towards” button inside an accordion.
export function Reveal({ block }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="b-reveal">
      <button
        type="button"
        className={`b-reveal-btn${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {block.label}
        <Icon name="chevron" size={14} strokeWidth={2.2} />
      </button>
      <div id={id} className="b-reveal-panel" hidden={!open}>
        <BlockRenderer blocks={block.blocks} />
      </div>
    </div>
  );
}
