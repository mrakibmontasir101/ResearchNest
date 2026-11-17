/**
 * Shared browser API client for the ResearchNest Django REST Framework backend.
 *
 * The UI currently starts in local demo mode. This client is the single network
 * boundary for the later integration; never put API keys or server secrets here.
 */
const configuredBase = (import.meta.env.VITE_API_BASE_URL || '').trim();
const BASE = configuredBase.replace(/\/$/, '');
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false' || !BASE;

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

function getCsrfToken(): string | undefined {
  const cookie = document.cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith('csrftoken='));
  if (!cookie) return undefined;
  const raw = cookie.slice('csrftoken='.length);
  try { return decodeURIComponent(raw); } catch { return raw; }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!BASE) throw new Error('Set VITE_API_BASE_URL in .env before connecting the Django API.');

  const method = (options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

  // Django session authentication: cookies plus CSRF token on unsafe methods.
  if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) {
    const csrf = getCsrfToken();
    if (csrf) headers.set('X-CSRFToken', csrf);
  }

  let response: Response;
  try {
    response = await fetch(`${BASE}${path.startsWith('/') ? path : `/${path}`}`, {
      ...options,
      method,
      headers,
      credentials: 'include',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network request failed.';
    throw new Error(`Could not reach the ResearchNest API. Check that Django is running and CORS/CSRF settings allow this frontend. ${message}`);
  }

  if (!response.ok) {
    let payload: unknown;
    let message = `Request failed (${response.status}).`;
    try {
      payload = await response.json();
      if (payload && typeof payload === 'object') {
        const data = payload as Record<string, unknown>;
        const detail = data.detail ?? data.message;
        if (typeof detail === 'string' && detail.trim()) message = detail;
      }
    } catch {
      // Keep the generic status message when the server does not return JSON.
    }
    throw new ApiError(message, response.status, payload);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/** Initial route inventory from ResearchNest SRS §4.2. */
export const endpoints = {
  login: '/auth/login',
  register: '/auth/register',
  verifyEmail: '/auth/verify-email',
  me: '/auth/me',
  logout: '/auth/logout',
  reset: '/auth/password-reset',
  account: '/account',
  profile: '/student-profile',
  search: '/search',
  professors: '/professors',
  shortlist: '/shortlist',
  applications: '/applications',
  posts: '/posts',
  feed: '/feed',
  messages: '/messages',
  notifications: '/notifications',
  edits: '/edits',
  claims: '/claims',
  reports: '/reports',
  moderation: '/admin/moderation-queue',
  imports: '/admin/import-jobs',
  users: '/admin/users',
  audit: '/admin/audit-events',
  settings: '/settings/notifications',
} as const;
