import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
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
  }

  const fechaFormateada = new Date(tratamiento.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD

  return (
    <div className="mb-10">
    <div className="bg-gray-50 p-4 rounded-tl-lg rounded-tr-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-6">
          <span className="font-bold text-xl font-semibold">
            Tratamiento {String(tratamiento.id)}
          </span>
          <input
            type="date"
            className="border  rounded-full px-4 py-2 shadow-sm"
            value={fechaFormateada}
            onChange={handleChangeFecha}
          />
        </div>

        {/* Derecha: botón de eliminar */}
        <DeleteButton onDelete={handleDeleteTratamiento} showText text="Eliminar Tratamiento"  />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-2">
        {tratamiento.productos.map(producto => (
          <ProductoSanitizante
            key={producto.id}
            idPlan={planId}
            idTratamiento={tratamiento.id}
            producto={producto}
          />
        ))}
      </div>

      <div className=" ">
        <button
          className="bg-white px-4 py-1.5 text-sm font-medium rounded-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-200 shadow-sm flex items-center justify-center"
          onClick={() => addProducto(planId, tratamiento.id)}
        >Agregar Producto <Plus size={18} />
        </button>
      </div>
    </div>

    {tratamiento.productos.length > 0 && (
      <div className="bg-green-50 text-green-800 p-4 rounded-bl-lg rounded-br-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2 shadow-sm">
        <span>
          <span className="font-semibold">Total tratamiento:</span>
          <span className="font-normal"> {tratamiento.total} AR$/ha</span>
        </span>
      </div>
    )}
   </div>
  );
}