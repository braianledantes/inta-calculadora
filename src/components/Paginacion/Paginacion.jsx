import { Plus } from "lucide-react";

const TratamientoPaginator = ({
  tratamientos,
  tratamientoActivoIndex,
  onChangeIndex,
  onAdd
}) => {
  return (
    <div className="flex gap-2 mb-6 justify-start items-center flex-wrap">
      {tratamientos.map((_, index) => (
        <button
          key={index}
          className={`w-8 h-8 rounded-full border font-semibold text-sm 
            flex items-center justify-center
            ${index === tratamientoActivoIndex
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          onClick={() => onChangeIndex(index)}
          title={`Tratamiento ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`${
          tratamientos.length === 0
            ? "px-4 py-1.5 text-sm font-medium"
            : "w-8 h-8"
        } rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200 shadow-sm flex items-center justify-center`}
        onClick={onAdd}
        title="Agregar Tratamiento"
      >
        {tratamientos.length === 0 ? "Agregar Tratamiento +" : <Plus size={18} />}
      </button>
    </div>
  );
};

export default TratamientoPaginator;
