import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <div className="hidden w-full items-center justify-center gap-4 py-6 mdl:inline-flex xl:hidden">
      <SocialLinks />
    </div>
  );
}
