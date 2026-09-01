/** Prefer payload deep_link, then route/url, then action_value, else the inbox. */
export function resolveNotificationHref(input: {
  deepLink?: string;
  route?: string;
  url?: string;
  actionValue?: string;
}): string {
  const candidates = [input.deepLink, input.route, input.url, input.actionValue];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    if (value.startsWith("/") || /^https?:\/\//i.test(value)) return value;
  }
  return "/profile/notifications";
}

export function navigateNotificationHref(
  href: string,
  push: (path: string) => void,
) {
  if (!/^https?:\/\//i.test(href)) {
    push(href);
    return;
  }

  try {
    const url = new URL(href);
    if (url.origin === window.location.origin) {
      push(`${url.pathname}${url.search}${url.hash}`);
      return;
    }
  } catch {
    /* fall through to full navigation */
  }

  window.location.assign(href);
}
