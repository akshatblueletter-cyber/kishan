import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { searchPages, sendContact } from '../../api/api.js';
import { stepPath } from '../../context/StepsContext.jsx';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Contact form (saved + emailed by the backend: POST /api/contact).
export function ContactForm({ block }) {
  const subjects = block.subjects || ['General correspondence'];
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [failure, setFailure] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!EMAIL.test(form.email.trim())) e.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) e.message = 'Please write a message (at least 10 characters).';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
    } catch (err) {
      setStatus('failed');
      setFailure(
        err.status === 404
          ? 'The contact form is not connected yet. Please try again later.'
          : err.status === 400
            ? err.message
            : err.status === 429
            ? 'Too many messages were sent. Please try again later.'
            : 'Your message could not be sent. Please try again later.'
      );
    }
  };

  if (status === 'sent') {
    return (
      <div className="b-form-done" role="status">
        <p className="b-em">Thank you. Your message has been sent.</p>
        <p className="b-p">We will reply as soon as we can.</p>
      </div>
    );
  }

  return (
    <form className="b-form" onSubmit={onSubmit} noValidate>
      <div className="b-field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        {errors.name && <span id="cf-name-err" className="b-field-err">{errors.name}</span>}
      </div>
      <div className="b-field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        {errors.email && <span id="cf-email-err" className="b-field-err">{errors.email}</span>}
      </div>
      <div className="b-field is-wide">
        <label htmlFor="cf-subject">Subject</label>
        <select id="cf-subject" value={form.subject} onChange={set('subject')}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="b-field is-wide">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" rows="6" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        {errors.message && <span id="cf-message-err" className="b-field-err">{errors.message}</span>}
      </div>
      {/* Spam trap: real visitors never see or fill this field. */}
      <div className="b-hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
      </div>
      <div className="b-form-actions is-wide">
        <button type="submit" className="btn-dark" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
        {status === 'failed' && (
          <p className="b-form-fail" role="alert">
            {failure}
          </p>
        )}
      </div>
    </form>
  );
}

// Search box + suggestions + results (search page).
export function SearchBox({ block }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q') || '';
  const [q, setQ] = useState(query);
  const [state, setState] = useState({ loading: false, results: null, error: false });

  useEffect(() => {
    setQ(query);
    if (!query) {
      setState({ loading: false, results: null, error: false });
      return;
    }
    const controller = new AbortController();
    setState({ loading: true, results: null, error: false });
    searchPages(query, { signal: controller.signal })
      .then((results) => setState({ loading: false, results, error: false }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ loading: false, results: null, error: true });
      });
    return () => controller.abort();
  }, [query]);

  const go = (text) => {
    const t = text.trim();
    if (t) navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <div className="b-search">
      <form
        className="search-form"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
      >
        <label htmlFor="page-search" className="sr-only">
          Search the site
        </label>
        <input id="page-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={block.placeholder} />
        <button type="submit" className="btn-dark">
          Search
        </button>
      </form>

      {!query && (
        <div className="search-suggest">
          <span className="search-suggest-label">{block.suggestionsLabel}</span>
          <div className="search-chips">
            {block.suggestions.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => go(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <section className="b-results" aria-live="polite">
          {state.loading && <p className="b-p">Searching…</p>}
          {state.error && <p className="b-p">Search is not available right now. Please try again later.</p>}
          {state.results && (
            <>
              <p className="b-results-count">
                {state.results.length ? `${state.results.length} result${state.results.length > 1 ? 's' : ''} for “${query}”` : `Nothing found for “${query}”. Try another word, or one of these:`}
              </p>
              {!state.results.length && (
                <div className="search-chips">
                  {block.suggestions.map((s) => (
                    <button key={s} type="button" className="chip" onClick={() => go(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <ol className="b-results-list">
                {state.results.map((r) => (
                  <li key={r.slug + r.anchor}>
                    <Link to={`${stepPath(r.slug)}${r.anchor ? `#${r.anchor}` : ''}`} className="b-result">
                      <span className="b-result-kicker">{r.order ? `Step ${String(r.order).padStart(2, '0')}` : 'Page'}</span>
                      <span className="b-result-title">{r.title}</span>
                      <span className="b-result-snippet">{r.snippet}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      )}
    </div>
  );
}
