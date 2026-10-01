import { Link } from 'react-router-dom';
import { stepLabel, stepPath, useSteps } from '../context/StepsContext.jsx';

// Navigation 1: the 23 steps in order — done ●, current ◉ (“you are here”), upcoming ○.
export default function JourneyMap({ current }) {
  const { steps } = useSteps();
  if (!steps.length) return null;

  return (
    <nav className="map" aria-label="Your journey">
      <p className="map-label">YOUR JOURNEY</p>
      <ol className="map-list">
        {steps.map((s) => {
          const state = !current ? '' : s.order < current ? 'is-done' : s.order === current ? 'is-current' : '';
          return (
            <li key={s.slug} className={state}>
              <Link to={stepPath(s.slug)} aria-current={s.order === current ? 'step' : undefined}>
                <i aria-hidden="true" />
                <span>
                  {s.order}. {stepLabel(s)}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
