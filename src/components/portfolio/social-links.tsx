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
          <span className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-hoverColor text-xl transition-all duration-300 hover:-translate-y-2 hover:text-textGreen">
            <Icon />
          </span>
        </a>
      ))}
    </>
  );
}
