export function SectionTitle({ title, titleNo }: { title: string; titleNo: string }) {
  return (
    <div className="mb-8 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-5 sm:mb-10">
      <span className="font-mono text-xs font-semibold text-primary">/{titleNo}</span>
      <h2 className="font-titleFont text-3xl font-semibold leading-none text-foreground sm:text-5xl">{title}</h2>
    </div>
  );
}
