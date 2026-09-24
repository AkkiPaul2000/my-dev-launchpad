import { SocialLinks } from "./social-links";

export function LeftSide() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end gap-4 text-textLight">
      <div className="flex flex-col gap-4">
        <SocialLinks />
      </div>
      <div className="h-32 w-[2px] bg-white"></div>
    </div>
  );
}
