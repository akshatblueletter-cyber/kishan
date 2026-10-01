// All calls to the backend go through this file.
// Development: VITE_API_URL is empty, so "/api" goes through the Vite proxy to localhost:5000.
// Production:  VITE_API_URL is the deployed server, e.g. https://krishanavtar-api.onrender.com
const BASE = `${import.meta.env.VITE_API_URL || ''}/api`;

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    signal,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      message = (await res.json()).message || message;
    } catch {
      /* response had no JSON body */
    }
    throw new ApiError(res.status, message);
  }
  return res.json();
}

export const getHealth = (opts) => request('/health', opts);

// The 23 journey steps, in order: { order, slug, title, subtitle, group, nextLabel, template }
export const getSteps = (opts) => request('/steps', opts);

// One full page with its content blocks.
export const getPage = (slug, opts) => request(`/pages/${encodeURIComponent(slug)}`, opts);

// Search across all page content: [{ slug, title, order, snippet }]
export const searchPages = (q, opts) => request(`/search?q=${encodeURIComponent(q)}`, opts);

// Contact form → { ok: true }
export const sendContact = (data) => request('/contact', { method: 'POST', body: data });
