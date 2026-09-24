export function SectionTitle({ title, titleNo }: { title: string; titleNo: string }) {
  return (
    <h2 className="flex items-center font-titleFont text-2xl font-semibold">
      <span className="mr-2 text-base text-textGreen md:text-lg">{titleNo}.</span>
      {title}
      <span className="ml-6 hidden h-[.5vh] bg-gray-700 md:inline-flex md:w-60 lgl:w-72"></span>
    </h2>
  );
}
