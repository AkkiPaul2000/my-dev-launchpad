import { EMAIL, SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-container flex-col gap-5 border-t border-border px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <p>© 2026 Akash Paul. Built with care and clean code.</p>
      <div className="flex items-center gap-3"><SocialLinks /><a href={`mailto:${EMAIL}`} className="ml-2 hover:text-primary">{EMAIL}</a></div>
    </footer>
  );
}
