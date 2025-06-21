import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import DeleteButton from "../DeleteButton/DeleteButton";
import ProductoSanitizante from "../ProductoSanitizante/ProductoSanitizante";
import { Plus } from "lucide-react";

export default function TratamientoSanitario({ planId, tratamiento }) {
  const {
    deleteTratamiento,
    addProducto,
    updateTratamiento,
  } = useContext(AppContext).sanitizantes;

  const handleDeleteTratamiento = () => {
    deleteTratamiento(planId, tratamiento.id);
  };

  const handleChangeFecha = (e) => {
    const nuevaFecha = e.target.value;
    updateTratamiento(planId, tratamiento.id, nuevaFecha);
  };

  const fechaFormateada = new Date(tratamiento.fecha).toISOString().split("T")[0]; // Formato YYYY-MM-DD

  return (
    <div className="mb-10">
      <div className="bg-gray-50 sm:p-4 p-2 rounded-tl-lg rounded-tr-lg shadow-sm border-b border-b-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center w-full sm:items-center gap-4">
            <span className="font-bold text-xl whitespace-nowrap">
              Tratamiento {String(tratamiento.id)}
            </span>
            <input
              type="date"
              className="border border-[#C95A1F]/50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C95A1F] focus:ring-opacity-50 text-gray-700 transition duration-300 placeholder-gray-400 cursor-pointer max-w-[180px]"
              value={fechaFormateada}
              onChange={handleChangeFecha}
            />
          </div>

          <DeleteButton
            onDelete={handleDeleteTratamiento}
            showText
            text="Eliminar Tratamiento"
            className="flex items-center px-5 justify-center gap-2 hover:bg-transparent hover:border-[#264653] hover:text-red-700 bg-[#1f3944] text-white text-lg rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 hover:cursor-pointer whitespace-nowrap"
          />
        </div>

        <div className="mb-4">
          {tratamiento.productos.map((producto) => (
            <ProductoSanitizante
              key={producto.id}
              idPlan={planId}
              idTratamiento={tratamiento.id}
              producto={producto}
            />
          ))}
        </div>

        <div>
          <button
            className="w-full sm:w-auto px-4 py-1.5 text-sm font-medium rounded-full border border-[#264653] text-[#264653] hover:bg-[#1f3944] hover:text-white transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
            onClick={() => addProducto(planId, tratamiento.id)}
          >
            Agregar Producto <Plus size={18} />
          </button>
        </div>
      </div>

      {tratamiento.productos.length > 0 && (
        <div className="bg-[#1f3944]/10 text-green-800 p-4 rounded-bl-lg rounded-br-lg shadow-inner flex flex-wrap gap-x-4 gap-y-2 shadow-sm">
          <span>
            <span className="font-semibold text-gray-800 tracking-wide">
              Total tratamiento:
            </span>{" "}
            <span className="text-green-900 font-extrabold tracking-tight">
              {tratamiento.total}{" "}
              <span className="font-semibold text-gray-600">AR$/ha</span>
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
