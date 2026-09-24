/**
 * Resolves a file in `public/` against the site's base path, so the same links work on
 * Lovable (served from "/") and GitHub Pages (served from "/my-dev-launchpad/").
 */
export function publicUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const RESUME_URL = publicUrl("Resume.pdf");
