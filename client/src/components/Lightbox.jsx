import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

// Full-size image view (e.g. to read the back cover). Esc, the ✕ button or a click outside closes it.
export default function Lightbox({ src, alt, onClose }) {
  const closeBtn = useRef(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button ref={closeBtn} type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
        <Icon name="close" size={22} />
      </button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
