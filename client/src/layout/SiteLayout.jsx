import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MenuOverlay from './MenuOverlay.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import { UIContext } from '../context/UIContext.jsx';
import { DEFAULT_META, PageMetaContext } from '../context/PageMetaContext.jsx';

// Header + page + footer, plus the ☰ menu and search overlays.
export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [meta, setMeta] = useState(DEFAULT_META); // current page title + subtitle (shown in the header)
  const metaValue = useMemo(() => ({ meta, setMeta }), [meta]);
  const { pathname, search, hash } = useLocation();

  // Close overlays and go to the top whenever the page changes (anchors scroll themselves).
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  // Esc closes an open overlay; the page behind does not scroll while one is open.
  const anyOpen = menuOpen || searchOpen;
  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [anyOpen]);

  const ui = useMemo(
    () => ({
      openMenu: () => {
        setSearchOpen(false);
        setMenuOpen(true);
      },
      openSearch: () => {
        setMenuOpen(false);
        setSearchOpen(true);
      },
    }),
    []
  );

  return (
    <UIContext.Provider value={ui}>
      <PageMetaContext.Provider value={metaValue}>
      <div className="site">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header
          meta={meta}
          menuOpen={menuOpen}
          searchOpen={searchOpen}
          onToggleMenu={() => (menuOpen ? setMenuOpen(false) : ui.openMenu())}
          onToggleSearch={() => (searchOpen ? setSearchOpen(false) : ui.openSearch())}
        />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} onOpenSearch={ui.openSearch} />
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
        <main id="main" className="site-main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
      </PageMetaContext.Provider>
    </UIContext.Provider>
  );
}
