import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

// On every page: logo · current page title + subtitle · search · ☰
// The centre text changes with the page (it is that page’s main heading).
export default function Header({ meta, menuOpen, searchOpen, onToggleMenu, onToggleSearch }) {
  return (
    <header className="header">
      {/* The logo is the name itself */}
      <Link to="/" className="logo" aria-label="Dr. Krishan Avtar — home">
        <span className="logo-line">Dr. Krishan</span> <span className="logo-line">Avtar</span>
      </Link>

      <div className="header-brand">
        <h1 className="header-title">{meta.title}</h1>
        {meta.subtitle && <p className="header-subtitle">{meta.subtitle}</p>}
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label="Search"
          aria-expanded={searchOpen}
          aria-controls="search-overlay"
          onClick={onToggleSearch}
        >
          <Icon name="search" />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-overlay"
          onClick={onToggleMenu}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
