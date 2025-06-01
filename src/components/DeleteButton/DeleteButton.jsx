import { Trash2 } from 'lucide-react';

export default function DeleteButton({ onDelete }) {
  return (
    <button
      className="flex items-center justify-center
        bg-red-600 hover:bg-red-700
        text-white text-lg rounded-full
        p-2 shadow-md transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-red-300 pointer"
      onClick={onDelete}
      title="Eliminar"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}