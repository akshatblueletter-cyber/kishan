import { Router } from 'express';
import Page from '../models/Page.js';

const router = Router();

// Fields never sent to the public site (editorial notes for the team).
const HIDDEN = '-notes -__v';

// Content changes rarely: let browsers/CDNs reuse it for 5 minutes.
const cache = (res) => res.set('Cache-Control', 'public, max-age=300');

// Page URLs are lowercase words joined by hyphens, e.g. “why-are-we-here”.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// GET /api/steps → the 23 journey steps, in order.
// Used by the left journey map, the ☰ menu and the “Next step” card.
router.get('/steps', async (req, res, next) => {
  try {
    const steps = await Page.find({ order: { $ne: null }, status: 'published' })
      .sort({ order: 1 })
      .select('order slug title subtitle group nextLabel template -_id')
      .lean();
    cache(res).json(steps);
  } catch (err) {
    next(err);
  }
});

// GET /api/pages/:slug → one full page with all its content blocks.
router.get('/pages/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!SLUG.test(slug) || slug.length > 80) return res.status(404).json({ message: 'Page not found' });
    const page = await Page.findOne({ slug, status: 'published' }).select(HIDDEN).lean();
    if (!page) return res.status(404).json({ message: 'Page not found' });
    cache(res).json(page);
  } catch (err) {
    next(err);
  }
});

export default router;
