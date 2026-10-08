import mongoose from 'mongoose';

// Every block type the frontend knows how to render.
// A page's content is an ordered list of these blocks (some blocks contain child blocks).
export const BLOCK_TYPES = [
  'heading',       // { text, level: 2|3, anchor? }            chapter titles, sub-headings
  'paragraph',     // { text }
  'lines',         // { items: [text] }                          short stacked lines
  'list',          // { items: [text] }                          bulleted list
  'questionLinks', // { items: [{ text, href? }] }               page 2 question links
  'navLinks',      // { label?, items: [{ text, href? }] }       Go deeper, Explore…
  'pills',         // { items: [text] }                          Ancient Wisdom · Modern Science · Lived Experience
  'accordion',     // { question, open?, image?, blocks: [] }    numbered click-to-open row (image = { src, alt }, shown right of the text)
  'group',         // { label, blocks: [] }                      page 4: “I am…” label + accordion
  'reveal',        // { label, blocks: [] }                      “Explore” button inside an accordion
  'flow',          // { label?, items: [text] }                  Pain → Suffering → …
  'reflection',    // { label, items: [text] }                   Reflection / Practice / Pause box
  'quote',         // { text, note? }
  'emphasis',      // { text }                                   highlighted closing line
  'steps',         // { items: [text] }                          Stop · Breathe · Observe · Proceed
  'safety',        // { text, link? }                            safety / “not a substitute” note
  'emergency',     // { label, number }                          India – 112
  'cardGrid',      // { columns, cards: [{ title, tag?, blocks: [] }] }
  'columns',       // { columns: [{ title, blocks: [] }] }       Morning · Day · Evening · Closing
  'stats',         // { items: [{ value, label }] }
  'guideRows',     // { rows: [{ label, links: [{ text, href }] }] }
  'timeline',      // { items: [{ title, text }] }
  'contrast',      // { connector, items: [{ left, right }] }       “left is not the same as right”
  'book',          // { image, backImage?, head?: [], blocks: [] }  covers + text (with head: title on top, covers side by side)
  'photo',         // { image?, blocks: [] }                     About intro with photo
  'contactForm',   // { subjects: [text] }
  'searchBox',     // { placeholder, suggestionsLabel, suggestions: [text] }
  'image',         // { src, alt }                               illustration (e.g. under a chapter title)
  'pending',       // { text }                                   awaiting client input (not shown publicly)
];

const pageSchema = new mongoose.Schema(
  {
    order: { type: Number, default: null },                 // 1–23 for journey steps, null for extra pages
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    group: { type: String, enum: ['Begin', 'The Journey', 'Explore', 'More', null], default: null },
    template: { type: String, enum: ['landing', 'step', 'contact', 'search', 'notfound'], default: 'step' },
    nextLabel: { type: String, default: '' },               // text on the “Next step” card
    backLabel: { type: String, default: '' },               // optional left button (page 2)
    blocks: { type: [mongoose.Schema.Types.Mixed], default: [] },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    notes: { type: [String], default: [] },                 // editorial notes for the team, never rendered
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
  },
  { timestamps: true }
);

// Journey steps must have unique order numbers (extra pages have order = null).
pageSchema.index({ order: 1 }, { unique: true, partialFilterExpression: { order: { $type: 'number' } } });

export default mongoose.model('Page', pageSchema);
