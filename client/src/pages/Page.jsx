import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePage } from '../hooks/usePage.js';
import StepLayout from '../components/StepLayout.jsx';
import Landing from '../components/Landing.jsx';
import { usePageMeta } from '../context/PageMetaContext.jsx';

const DEFAULT_DESCRIPTION =
  'krishanavtar.com is an evolving body of work exploring the human journey—suffering, happiness, mind, consciousness, meaning, relationships, mortality and inner life—through Ancient Wisdom, Modern Science and Lived Experience.';

// Loads a page from MongoDB by its URL slug and shows it with the right template.
export default function Page({ slug: fixedSlug }) {
  const params = useParams();
  const slug = fixedSlug || params.slug;
  const { page, loading, notFound, error } = usePage(slug);
  const { setMeta } = usePageMeta();

  // Browser tab title + description for search engines.
  useEffect(() => {
    if (!page) return;
    // The header shows this page’s title + subtitle.
    setMeta({ title: page.title, subtitle: page.subtitle || '' });
    document.title = page.seo?.title || `${page.title} · Krishan Avtar`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.seo?.description || DEFAULT_DESCRIPTION);
  }, [page, setMeta]);

  if (notFound && slug !== 'not-found') return <Page slug="not-found" />;

  if (loading) {
    return (
      <div className="page-status" role="status">
        <span className="page-status-dot" /> Loading…
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="page-status" role="alert">
        This page could not be loaded. Please check your connection and try again.
      </div>
    );
  }

  return page.template === 'landing' ? <Landing page={page} /> : <StepLayout key={page.slug} page={page} />;
}
