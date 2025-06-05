import { useContext } from "react";
import { exportFormToExcel } from "../../utils/exportExcel.js";
import { AppContext } from "../../context/AppContext.jsx";

export default function ExportButton() {
 const hooks = useContext(AppContext);
 const { planes: planesMaquinaria } = hooks.maquinaria;
 const { planes: planesFertilizantes } = hooks.maquinaria;
 const { planes: sanitizantes } = hooks.maquinaria;
 // console.log('existo');

 // TODO: a exportFormToExcel le envias todos los planes para que imprima una página por seccion (maquinaria, sanitizantes, fertilizantes)
 // exportFormToExcel(planesMaquinaria, planesFertilizantes, sanitizantes, "mi_formulario")}
 
 return (
  <button
   className="bg-blue-600 text-white px-4 py-2 rounded"
   onClick={() => exportFormToExcel(planes, "mi_formulario")}
  >
   Descargar Excel
  </button>
 );
}
