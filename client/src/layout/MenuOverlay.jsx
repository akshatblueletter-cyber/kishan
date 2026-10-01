import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GROUPS, stepLabel, stepPath, useSteps } from '../context/StepsContext.jsx';
import Icon from '../components/Icon.jsx';

// ☰ Navigation 2: jump anywhere. All 23 steps grouped, plus the pages outside the journey.
export default function MenuOverlay({ open, onClose, onOpenSearch }) {
  const { steps } = useSteps();
  const { pathname } = useLocation();
  const firstLink = useRef(null);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div id="menu-overlay" className="menu-ov" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="menu-inner">
        <div className="menu-grid">
          {GROUPS.map((group, gi) => (
            <nav key={group} className="menu-group" aria-label={group}>
              <p className="menu-group-title">{group}</p>
              <ol>
                {steps
                  .filter((s) => s.group === group)
                  .map((s, i) => {
                    const current = pathname === stepPath(s.slug);
                    return (
                      <li key={s.slug}>
                        <Link
                          ref={gi === 0 && i === 0 ? firstLink : undefined}
                          to={stepPath(s.slug)}
                          className={`menu-link${current ? ' is-current' : ''}`}
                          aria-current={current ? 'page' : undefined}
                        >
                          <span className="menu-num">{String(s.order).padStart(2, '0')}</span>
                          <span className="menu-title">
                            {stepLabel(s)}
                            {current && <span className="menu-here">You are here</span>}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ol>
            </nav>
          ))}
        </div>

        <div className="menu-extra">
          <Link to="/crisis-support" className="menu-crisis">
            <Icon name="heart" size={18} /> Crisis Support · India 112
          </Link>
          <Link to="/contact" className="menu-pill">
            <Icon name="mail" size={18} /> Contact
          </Link>
          <button
            type="button"
            className="menu-pill"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
          >
            <Icon name="search" size={18} /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
