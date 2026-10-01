import { createContext, useContext } from 'react';

// Page-level accordion state: only one accordion is open at a time on a page.
export const AccordionContext = createContext({ openId: null, toggle: () => {} });
export const useAccordion = () => useContext(AccordionContext);

// Walks a page's blocks once and gives every accordion:
//   _n      → its number on the page (01, 02 …)
//   _id     → a stable id (used for open/close and aria attributes)
//   _anchor → the chapter anchor of the heading just before it (e.g. “chapter-3”),
//             so links like /the-journey-part-1#chapter-3 can open it.
export function annotateBlocks(blocks = []) {
  let n = 0;
  let pendingAnchor = null;
  let firstOpenId = null;
  const anchors = {};

  const walk = (list = []) =>
    list.map((block) => {
      const b = { ...block };
      if (b.type === 'heading' && b.anchor) pendingAnchor = b.anchor;
      if (b.type === 'accordion') {
        n += 1;
        b._n = n;
        b._id = pendingAnchor ? `acc-${pendingAnchor}` : `acc-${n}`;
        if (pendingAnchor) anchors[pendingAnchor] = b._id;
        pendingAnchor = null;
        if (b.open && !firstOpenId) firstOpenId = b._id;
      }
      if (b.blocks) b.blocks = walk(b.blocks);
      if (b.cards) b.cards = b.cards.map((c) => ({ ...c, blocks: walk(c.blocks) }));
      if (Array.isArray(b.columns)) b.columns = b.columns.map((c) => ({ ...c, blocks: walk(c.blocks) }));
      return b;
    });

  return { blocks: walk(blocks), firstOpenId, anchors };
}
