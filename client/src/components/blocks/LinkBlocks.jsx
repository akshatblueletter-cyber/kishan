import SmartLink from '../SmartLink.jsx';
import Icon from '../Icon.jsx';

// Numbered list of question links (page 2), or the Reflection questions box (page 5).
export function QuestionLinks({ block }) {
  const list = (
    <ol className="b-ql">
      {block.items.map((item, i) => (
        <li key={i}>
          <SmartLink href={item.href} className="b-ql-item">
            <span className="b-ql-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="b-ql-text">{item.text}</span>
            <span className="b-ql-arrow">
              <Icon name="arrow" size={16} />
            </span>
          </SmartLink>
        </li>
      ))}
    </ol>
  );

  if (block.variant === 'reflection') {
    return (
      <div className="b-reflection b-ql-reflection">
        {block.label && <span className="b-box-label">{block.label}</span>}
        {list}
      </div>
    );
  }
  return list;
}

// Row of link buttons (Go deeper, Explore, Start with …).
export function NavLinks({ block }) {
  return (
    <div className="b-nav">
      {block.label && <span className="b-h3">{block.label}</span>}
      <div className="b-nav-links">
        {block.items.map((item, i) => (
          <SmartLink key={i} href={item.href} className="b-nav-link">
            {item.text}
          </SmartLink>
        ))}
      </div>
    </div>
  );
}

// Reading guide: “If you are …” → chapters.
export function GuideRows({ block }) {
  return (
    <div className="b-guide">
      {block.rows.map((row, i) => (
        <div key={i} className="b-guide-row">
          <p className="b-guide-label">{row.label}</p>
          <div className="b-guide-links">
            {row.links.map((l, j) => (
              <SmartLink key={j} href={l.href} className="b-guide-link">
                → {l.text}
              </SmartLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
