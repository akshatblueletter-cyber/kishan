// Simple text blocks.

export function Heading({ block }) {
  const Tag = block.level === 3 ? 'h3' : 'h2';
  return (
    <Tag id={block.anchor} className={`b-h${block.level === 3 ? 3 : 2}`}>
      {block.text}
    </Tag>
  );
}

export function Paragraph({ block }) {
  return <p className="b-p">{block.text}</p>;
}

export function Lines({ block }) {
  return (
    <div className="b-lines">
      {block.items.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </div>
  );
}

export function List({ block }) {
  return (
    <ul className="b-list">
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Emphasis({ block }) {
  return <p className="b-em">{block.text}</p>;
}

export function Pills({ block }) {
  return (
    <div className="b-pills">
      {block.items.map((item, i) => (
        <span key={i} className={`pill pill-${i % 3}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

// Awaiting client input — visible only while developing, never on the live site.
export function Pending({ block }) {
  if (!import.meta.env.DEV) return null;
  return <p className="b-pending">⏳ {block.text}</p>;
}
