import { EMAIL } from "./social-links";

export function Contact() {
  return (
    <section
      id="Contact"
      className="mx-auto flex min-h-screen max-w-container flex-col items-center justify-center gap-4 py-10 xl:py-32"
    >
      <p className="flex items-center font-titleFont text-lg font-semibold tracking-wide text-textGreen">
        04. What&apos;s Next?
      </p>
      <h2 className="font-titleFont text-5xl font-semibold">Get In Touch</h2>
      <p className="max-w-[600px] text-center text-textDark">
        Well,right now very much looking forward to any new oppotunities, I m excited and hoping to
        get in touch with you soon.
      </p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-6 inline-flex h-14 w-40 items-center justify-center rounded-md border border-textGreen font-titleFont text-sm tracking-wider text-textGreen duration-300 hover:bg-hoverColor"
      >
        Say Hello
      </a>
    </section>
  );
}
