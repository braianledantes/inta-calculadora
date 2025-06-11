import { FiPlusCircle } from "react-icons/fi";

export default function AddPlanButton({ text, onClick, className =""}) {
  return (
    <button
      className={`
        mx-auto
        bg-[#036935] text-white font-semibold
        px-6 py-3 rounded-lg mt-16
        shadow-md
        hover:bg-[#024c27] hover:shadow-lg
        focus:outline-none focus:ring-2
        transition-all duration-200
        text-base mb-12 flex items-center justify-center gap-2 uppercase hover:cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      <FiPlusCircle className="text-xl" />
      {text}
    </button>
  );
}