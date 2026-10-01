import { Link, NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/the-first-major-work', label: 'The Journey' },
  { to: '/works', label: 'Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

// Fixed on every page: crisis line · links · brand line · ©
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <p className="footer-crisis">
          You do not have to face a crisis alone.
          <span className="footer-crisis-badge">Emergency · India 112</span>
          <Link to="/crisis-support">→ Crisis Support</Link>
        </p>
        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="footer-row footer-bottom">
        <span>KRISHAN AVTAR · One journey. Many questions. Many perspectives. An evolving body of work.</span>
        <span>© {new Date().getFullYear()} Krishan Avtar</span>
      </div>
    </footer>
  );
}
