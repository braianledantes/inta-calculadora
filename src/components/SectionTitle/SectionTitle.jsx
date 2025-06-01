
export default function SectionTitle({ title }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8 uppercase">
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}