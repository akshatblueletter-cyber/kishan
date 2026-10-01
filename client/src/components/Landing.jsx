import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { nextStepOf, stepPath, useSteps } from '../context/StepsContext.jsx';

// The two background images. Dummy illustrations for now —
// replace these files in client/public/images/ with the client’s real images.
const IMAGES = ['/images/landing-1.svg', '/images/landing-2.svg'];

// Page 1: two images side by side (crossfade on phones) · centre card · button to step 2.
export default function Landing({ page }) {
  const { steps } = useSteps();
  const next = nextStepOf(page, steps);
  const lines = page.blocks.find((b) => b.type === 'lines')?.items || [];

  return (
    <section className="landing" aria-label="Welcome">
      <div className="landing-img landing-img-1" style={{ backgroundImage: `url(${IMAGES[0]})` }} aria-hidden="true" />
      <div className="landing-img landing-img-2" style={{ backgroundImage: `url(${IMAGES[1]})` }} aria-hidden="true" />
      <span className="landing-divider" aria-hidden="true" />

      <div className="landing-card">
        <h1 className="sr-only">{page.title}</h1>
        {lines.map((line, i) => (
          <p key={i} className={i === lines.length - 1 ? 'is-last' : ''}>
            {line}
          </p>
        ))}
      </div>

      {page.nextLabel && (
        <Link to={next ? stepPath(next.slug) : '/understanding-the-human-journey'} className="landing-cta">
          {page.nextLabel}
          <span className="landing-cta-arrow">
            <Icon name="arrow" size={20} />
          </span>
        </Link>
      )}
    </section>
  );
}
