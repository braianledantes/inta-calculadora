import { FiPlusCircle } from "react-icons/fi";

export default function AddPlanButton({ text, onClick, className = "" }) {
  return (
    <button
      className={`w-full max-w-4xl mx-auto bg-gradient-to-r from-[#036935] via-[#025925] to-[#024c27] py-3 rounded-full mt-10 shadow-md hover:bg-[#024c27] hover:shadow-lg  
        focus:outline-none focus:ring-4 focus:ring-green-900/10 
        transition-all duration-200 
        text-sm sm:text-base uppercase mb-12 text-white font-semibold
        flex items-center justify-center gap-2 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <FiPlusCircle className="text-xl" />
      {text}
    </button>
  );
}
