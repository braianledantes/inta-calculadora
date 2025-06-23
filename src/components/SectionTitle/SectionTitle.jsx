
export default function SectionTitle({ title }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5 uppercase">
      <h2 className="sm:text-3xl sm:font-bold text-xl">{title}</h2>
    </div>
  );
}