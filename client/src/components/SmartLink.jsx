import { Link } from 'react-router-dom';

// Renders an internal link, an external link, or — when the destination is not decided yet
// (href is null in the data) — a non-clickable element with the same look.
export default function SmartLink({ href, className = '', children, ...rest }) {
  if (!href) {
    return (
      <span className={`${className} is-pending`} aria-disabled="true" title="Link coming soon" {...rest}>
        {children}
      </span>
    );
  }
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}
