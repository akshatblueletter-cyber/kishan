import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { nextStepOf, stepPath, useSteps } from '../context/StepsContext.jsx';

// Background image of the home page (client/public/images/home.jpg): golden lotus on water.
const BACKGROUND = '/images/home.jpg';

// Page 1: full-width mountain background · centre card · button to step 2.
export default function Landing({ page }) {
  const { steps } = useSteps();
  const next = nextStepOf(page, steps);
  const lines = page.blocks.find((b) => b.type === 'lines')?.items || [];

  return (
    <section className="landing" aria-label="Welcome" style={{ backgroundImage: `url(${BACKGROUND})` }}>
      <div className="landing-card">
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
