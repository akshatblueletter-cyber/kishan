import { useEffect, useState } from 'react';
import { getPage } from '../api/api.js';

// Loads one page from the API. Returns { page, loading, notFound, error }.
export function usePage(slug) {
  const [state, setState] = useState({ page: null, loading: true, notFound: false, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ page: null, loading: true, notFound: false, error: null });
    getPage(slug, { signal: controller.signal })
      .then((page) => setState({ page, loading: false, notFound: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ page: null, loading: false, notFound: error.status === 404, error });
      });
    return () => controller.abort();
  }, [slug]);

  return state;
}
