import { Heading, Paragraph, Lines, List, Emphasis, Pills, Pending } from './TextBlocks.jsx';
import { QuestionLinks, NavLinks, GuideRows } from './LinkBlocks.jsx';
import { Accordion, Group, Reveal } from './InteractiveBlocks.jsx';
import { Flow, Reflection, Quote, Steps, Safety, Emergency, Contrast } from './BoxBlocks.jsx';
import { CardGrid, Columns, Stats, Timeline, Book, Photo } from './LayoutBlocks.jsx';
import { ContactForm, SearchBox } from './FormBlocks.jsx';

// Block type (as stored in MongoDB) → React component.
const COMPONENTS = {
  heading: Heading,
  paragraph: Paragraph,
  lines: Lines,
  list: List,
  emphasis: Emphasis,
  pills: Pills,
  pending: Pending,
  questionLinks: QuestionLinks,
  navLinks: NavLinks,
  guideRows: GuideRows,
  accordion: Accordion,
  group: Group,
  reveal: Reveal,
  flow: Flow,
  reflection: Reflection,
  quote: Quote,
  steps: Steps,
  safety: Safety,
  emergency: Emergency,
  contrast: Contrast,
  cardGrid: CardGrid,
  columns: Columns,
  stats: Stats,
  timeline: Timeline,
  book: Book,
  photo: Photo,
  contactForm: ContactForm,
  searchBox: SearchBox,
};

// Renders a list of content blocks (and, through the components, their children).
export default function BlockRenderer({ blocks = [] }) {
  return blocks.map((block, i) => {
    const Component = COMPONENTS[block.type];
    if (!Component) {
      if (import.meta.env.DEV) console.warn(`Unknown block type “${block.type}”`, block);
      return null;
    }
    return <Component key={block._id || `${block.type}-${i}`} block={block} />;
  });
}
