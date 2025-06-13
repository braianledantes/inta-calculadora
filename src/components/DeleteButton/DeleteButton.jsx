import { X } from 'lucide-react';

export default function DeleteButton({ onDelete, showText = false, text = ""}) {
  return (
    <button
      className="flex items-center justify-center gap-2
        bg-transparent hover:text-red-700 
        text-gray-700 text-lg rounded-full
        p-2 transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-300 hover:cursor-pointer"
      onClick={onDelete}
      title=""
    >
      {showText && <span className="text-sm font-medium">{text}</span>}
      <X className="w-5 h-5 " />
    </button>
  );
}