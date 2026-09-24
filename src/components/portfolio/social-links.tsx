import type { IconType } from "react-icons";
import {
  SlSocialFacebook,
  SlSocialGithub,
  SlSocialInstagram,
  SlSocialLinkedin,
} from "react-icons/sl";

export const EMAIL = "skypaul2000@gmail.com";

const socials: { label: string; href: string; icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/AkkiPaul2000", icon: SlSocialGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akash-paul-6a715a1b2/",
    icon: SlSocialLinkedin,
  },
  { label: "Facebook", href: "https://www.facebook.com/akkipaul2000", icon: SlSocialFacebook },
  { label: "Instagram", href: "https://www.instagram.com/__akki__2000/", icon: SlSocialInstagram },
];

export function SocialLinks() {
  return (
    <>
      {socials.map(({ label, href, icon: Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <span className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border bg-secondary text-base text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
            <Icon />
          </span>
        </a>
      ))}
    </>
  );
}
