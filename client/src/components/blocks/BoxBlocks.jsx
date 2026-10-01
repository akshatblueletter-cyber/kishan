import SmartLink from '../SmartLink.jsx';
import Icon from '../Icon.jsx';

// Pain → Suffering → Understanding …
export function Flow({ block }) {
  return (
    <div className="b-flow">
      {block.label && <span className="b-flow-label">{block.label}</span>}
      <ol className="b-flow-chips">
        {block.items.map((item, i) => (
          <li key={i} className={i === block.items.length - 1 ? 'is-last' : ''}>
            <span className="chip-flow">{item}</span>
            {i < block.items.length - 1 && (
              <span className="b-flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Reflection / Practice / Pause / Guiding principle box.
export function Reflection({ block }) {
  return (
    <div className="b-reflection">
      {block.label && <span className="b-box-label">{block.label}</span>}
      <div className="b-reflection-lines">
        {block.items.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </div>
  );
}

export function Quote({ block }) {
  return (
    <blockquote className="b-quote">
      <p>{block.text}</p>
      {block.note && <p className="b-quote-note">{block.note}</p>}
    </blockquote>
  );
}

// Stop · Breathe · Observe · Proceed
export function Steps({ block }) {
  return (
    <ol className="b-steps">
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

// “Not a substitute for medical care” / crisis notes.
export function Safety({ block }) {
  return (
    <aside className="b-safety">
      <span className="b-safety-icon">
        <Icon name="heart" size={16} />
      </span>
      <p>
        {block.text}
        {block.link && (
          <>
            {' '}
            <SmartLink href={block.link} className="b-safety-link">
              → Crisis Support
            </SmartLink>
          </>
        )}
      </p>
    </aside>
  );
}

// India – 112 (tap to call on phones).
export function Emergency({ block }) {
  const digits = (block.number.match(/\d+/g) || []).pop();
  return (
    <div className="b-emergency">
      <div>
        <span className="b-emergency-label">{block.label}</span>
        <strong className="b-emergency-number">{block.number}</strong>
      </div>
      {digits && (
        <a className="b-emergency-call" href={`tel:${digits}`}>
          <Icon name="phone" size={18} /> Call {digits}
        </a>
      )}
    </div>
  );
}

// “Reading about acceptance” is not the same as “practising acceptance”.
export function Contrast({ block }) {
  return (
    <div className={`b-contrast${block.connector === 'from' ? ' is-separate' : ''}`}>
      {block.items.map((item, i) => (
        <div key={i} className="b-contrast-row">
          <span className="b-contrast-left">{item.left}</span>
          <span className="b-contrast-connector">{block.connector}</span>
          <span className="b-contrast-right">{item.right}</span>
        </div>
      ))}
    </div>
  );
}
