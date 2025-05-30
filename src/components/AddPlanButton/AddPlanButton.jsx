import {PlusIcon} from "lucide-react";

export default function AddPlanButton({ onClick }) {
  return (
    <button
      className="w-fit bg-[#1b2830] text-white px-4 py-2 rounded hover:bg-[#2c3e50] hover:cursor-pointer transition-colors flex items-center justify-between gap-2"
      onClick={onClick}
    >
     <PlusIcon /><span>Agregar Plan</span>
    </button>
  );
}