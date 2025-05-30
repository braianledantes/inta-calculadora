import { CircleX } from "lucide-react";

export default function DeleteBotton({ onDelete }) {
  return (
    <button className="group py-2 px-4 rounded w-auto h-10 cursor-pointer" onClick={onDelete}>
      <CircleX className="stroke-black group-hover:stroke-[#009dc0] transition-colors" />
    </button>
  )
}