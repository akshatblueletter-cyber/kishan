import { createContext, useContext, useEffect, useState } from 'react';
import { getSteps } from '../api/api.js';

// The 23 journey steps are loaded ONCE and shared by:
// the left journey map, the ☰ menu and the “Next step” card.
const StepsContext = createContext({ steps: [], loading: true, error: null });

export function StepsProvider({ children }) {
  const [state, setState] = useState({ steps: [], loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    getSteps({ signal: controller.signal })
      .then((steps) => setState({ steps, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ steps: [], loading: false, error });
      });
    return () => controller.abort();
  }, []);

  return <StepsContext.Provider value={state}>{children}</StepsContext.Provider>;
}

export const useSteps = () => useContext(StepsContext);

// URL for a step: the landing page (“home”) lives at “/”.
export const stepPath = (slug) => (slug === 'home' ? '/' : `/${slug}`);

// Short label used in the journey map and menu (steps 1 and 2 share a title).
export const stepLabel = (step) => (step.slug === 'home' ? 'Home' : step.title);

// Order of the ☰ menu sections (matches the `group` field in the database).
export const GROUPS = ['Begin', 'The Journey', 'Explore', 'More'];

// Where the “Previous step” card of a page leads: the step before (none on step 1).
export function prevStepOf(page, steps) {
  if (!page?.order || page.order <= 1 || !steps.length) return null;
  return steps.find((s) => s.order === page.order - 1) || null;
}

// Where the “Next step” card of a page leads: the following step,
// and from the last step back to step 2 (“Begin your journey”).
export function nextStepOf(page, steps) {
  if (!page?.order || !steps.length) return null;
  return steps.find((s) => s.order === page.order + 1) || steps.find((s) => s.order === 2) || null;
}
