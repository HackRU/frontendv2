import { handleSignOut } from './actions';

/**
 * Backend calls return an inconsistent error shape, but a 401 always means the
 * session's auth_token was rejected (expired or invalid). Call this right after
 * any backend read that runs on page load; it clears the stale session and sends
 * the user to /login instead of leaving them stuck on a half-loaded dashboard.
 * Returns true if it redirected, so the caller can bail out of its effect.
 */
export async function redirectIfUnauthorized(
  statusCode?: number,
): Promise<boolean> {
  if (statusCode !== 401) return false;

  await handleSignOut();
  window.location.href = '/login';
  return true;
}
