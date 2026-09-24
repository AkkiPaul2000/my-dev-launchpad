import { EMAIL } from "./social-links";

export function RightSide() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end gap-0 text-textLight">
      <a href={`mailto:${EMAIL}`}>
        <p className="w-48 rotate-90 text-sm tracking-wide text-textGreen">email me</p>
      </a>
      <span className="inline-flex h-52 w-[2px] bg-white"></span>
    </div>
  );
}
