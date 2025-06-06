import { useContext } from "react";
import { exportFormToExcel } from "../../utils/exportExcel.js";
import { AppContext } from "../../context/AppContext.jsx";
import { FaFileExcel } from "react-icons/fa";

export default function ExportButton() {
    
    const hooks = useContext(AppContext);
    // console.log('hooks', hooks);

    const { planes : planesMaquinaria } = hooks.maquinaria;
    const { planes: planesFertilizantes } = hooks.fertilizantes;
    const { planes: planesSanitizantes } = hooks.sanitizantes;
    const { planes: planesEstadosFenologicos } = hooks.estadosFenologicos;
    const { planes: valorDolar } = hooks.maquinaria.valorDolar;
    const { planes: valorGasoilina } = hooks.maquinaria.valorGasoilina;

    // TODO: a exportFormToExcel le envias todos los planes para que imprima una página por seccion (maquinaria, sanitizantes, fertilizantes)
    // exportFormToExcel(planesMaquinaria, planesFertilizantes, sanitizantes, "mi_formulario")}
 
    return (
        <button
        
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold shadow flex items-center gap-2 uppercase hover:cursor-pointer"
            onClick={() => exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, planesEstadosFenologicos, valorDolar, valorGasoilina, "mi_formulario")}>

            <FaFileExcel style={{ transform: "scaleX(-1)" }} />
            Descargar Excel
        
        </button>
    );
}
