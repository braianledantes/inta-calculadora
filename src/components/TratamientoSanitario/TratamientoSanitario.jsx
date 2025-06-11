import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import DeleteButton from "../DeleteButton/DeleteButton";
import ProductoSanitizante from "../ProductoSanitizante/ProductoSanitizante";

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
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Tratamiento {tratamiento.id}</span>
        <input type="date"
          className="border border-gray-300 rounded px-2 py-1"
          value={fechaFormateada} // Formato YYYY-MM-DD
          onChange={handleChangeFecha}
        />
        <DeleteButton onDelete={handleDeleteTratamiento} />
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
      <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 shadow-inner flex flex-wrap gap-x-4 gap-y-2">
        <span>
          <span className="font-semibold">Total tratamiento:</span>
          <span className="font-normal"> {tratamiento.total} AR$/ha</span>
        </span>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => addProducto(planId, tratamiento.id)}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
}