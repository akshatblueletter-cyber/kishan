import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import JourneyMap from './JourneyMap.jsx';
import Icon from './Icon.jsx';
import BlockRenderer from './blocks/BlockRenderer.jsx';
import { AccordionContext, annotateBlocks } from './blocks/accordionState.js';
import { nextStepOf, stepPath, useSteps } from '../context/StepsContext.jsx';
import { useUI } from '../context/UIContext.jsx';

// Where a page’s optional left button (backLabel) leads.
const BACK_LINKS = {
  'Explore a Question': '/what-brings-you-here',
};

// Option B “The Path”: teal left panel (step no. + title + journey map) · content · Next step card.
export default function StepLayout({ page }) {
  const { steps } = useSteps();
  const { openMenu } = useUI();
  const { hash } = useLocation();

  const { blocks, firstOpenId, anchors } = useMemo(() => annotateBlocks(page.blocks), [page]);
  // (Page.jsx gives each page its own key, so this starts fresh on every page.)
  const [openId, setOpenId] = useState(firstOpenId);

  // Links like /the-journey-part-1#chapter-3 open that chapter …
  const scrollTarget = useRef(null);
  useEffect(() => {
    const anchor = hash.slice(1);
    if (!anchor) return;
    scrollTarget.current = { anchor, accordionId: anchors[anchor] || null };
    if (anchors[anchor]) setOpenId(anchors[anchor]);
  }, [hash, anchors]);

  // … and scroll to it only once that chapter is the open one (so the page no longer shifts).
  useEffect(() => {
    const target = scrollTarget.current;
    if (!target) return;
    if (target.accordionId && openId !== target.accordionId) return;
    scrollTarget.current = null;
    document.getElementById(target.anchor)?.scrollIntoView({ block: 'start' });
  }, [openId, hash]);

  const accordion = useMemo(() => ({ openId, toggle: (id) => setOpenId((cur) => (cur === id ? null : id)) }), [openId]);

  const total = steps.length || 23;
  const num = page.order ? String(page.order).padStart(2, '0') : '+';
  const next = nextStepOf(page, steps);
  const back = page.backLabel && BACK_LINKS[page.backLabel];
  const isLast = page.order === total;

  return (
    <div className="step">
      <aside className="lp">
        <p className="lp-kicker">{page.order ? `STEP ${num} OF ${total}` : 'BEYOND THE JOURNEY'}</p>
        <p className="lp-num" aria-hidden="true">
          {num}
        </p>

        {/* Phones: a progress line + “All steps” instead of the full journey map */}
        {page.order && (
          <div className="lp-progress">
            <div className="lp-bar" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={page.order} aria-label="Journey progress">
              <span style={{ width: `${(page.order / total) * 100}%` }} />
            </div>
            <button type="button" className="lp-all" onClick={openMenu}>
              All steps
            </button>
          </div>
        )}

        <JourneyMap current={page.order} />
      </aside>

      <article className="rp">
        <AccordionContext.Provider value={accordion}>
          <BlockRenderer blocks={blocks} />
        </AccordionContext.Provider>

        {(back || next) && (
          <nav className="bnav" aria-label="Page navigation">
            {back ? (
              <Link to={back} className="back-btn">
                {page.backLabel}
              </Link>
            ) : (
              <span />
            )}
            {next && page.nextLabel && (
              <Link to={stepPath(next.slug)} className="next-card">
                <span className="next-label">{isLast ? 'BEGIN AGAIN' : 'NEXT STEP'}</span>
                <span className="next-title">{page.nextLabel}</span>
                <span className="next-arrow">
                  <Icon name="arrow" size={22} />
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
