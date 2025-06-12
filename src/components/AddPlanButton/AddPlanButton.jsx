import { FiPlusCircle } from "react-icons/fi";

export default function AddPlanButton({ text, onClick, className = "" }) {
  return (
    <button
      className={`
        w-full max-w-4xl mx-auto
        bg-[#036935] text-white font-semibold
        py-3 rounded-full mt-10
        shadow-md
        hover:bg-[#024c27] hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2
        transition-all duration-200
        text-sm sm:text-base uppercase
        mb-12 flex items-center justify-center gap-2
        hover:cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      <FiPlusCircle className="text-xl" />
      {text}
    </button>
  );
}