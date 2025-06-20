export default function PlanTitle({ title }) {
  return (
    <h5 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold bg-gray-100 text-gray-800 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 border border-gray-300">
      {title}
    </h5>
  );
}
