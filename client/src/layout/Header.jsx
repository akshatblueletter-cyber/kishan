import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';

// Fixed on every page: logo · title + subtitle · search · ☰
export default function Header({ menuOpen, searchOpen, onToggleMenu, onToggleSearch }) {
  return (
    <header className="header">
      {/* The logo is the name itself */}
      <Link to="/" className="logo" aria-label="Dr. Krishan Avtar — home">
        <span className="logo-line">Dr. Krishan</span> <span className="logo-line">Avtar</span>
      </Link>

      <Link to="/" className="header-brand">
        <span className="header-title">Understanding the Human Journey</span>
        <span className="header-subtitle">Ancient Wisdom · Modern Science · Lived Experience</span>
      </Link>

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
