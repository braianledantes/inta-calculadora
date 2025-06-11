import {useContext} from "react";
import {exportFormToExcel} from "../../excel/exportExcel.js"
import {AppContext} from "../../context/AppContext.jsx";
import {FaFileExcel} from "react-icons/fa";

export default function ExportButton() {
    
    const hooks = useContext(AppContext);
    // console.log('hooks', hooks);

    const { planes: planesMaquinaria, valorDolar, valorGasoilina } = hooks.maquinaria;
    const { planes: planesFertilizantes } = hooks.fertilizantes;
    const { planes: planesSanitizantes } = hooks.sanitizantes;

    const fileName = `plan-agricola-${new Date().toISOString().split("T")[0]}`;

    const noHayDatos =
    (!planesMaquinaria || planesMaquinaria.length === 0) &&
    (!planesFertilizantes || planesFertilizantes.length === 0) &&
    (!planesSanitizantes || planesSanitizantes.length === 0) 
    if (noHayDatos) return null;

    // TODO: a exportFormToExcel le envias todos los planes para que imprima una página por seccion (maquinaria, sanitizantes, fertilizantes)
    // exportFormToExcel(planesMaquinaria, planesFertilizantes, sanitizantes, "mi_formulario")}
 
    return (
        <button
            disabled={noHayDatos}
            className={`${ noHayDatos ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded-lg transition-colors duration-300 font-semibold shadow flex items-center gap-2 uppercase`}
            onClick={() => exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, valorDolar, valorGasoilina,  fileName)}>

            <FaFileExcel style={{ transform: "scaleX(-1)" }} />
            Exportar Excel
        
        </button>
    );
}
