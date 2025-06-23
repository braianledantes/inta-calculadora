import {useContext} from "react";
import {exportFormToExcel} from "../../excel/exportExcel.js"
import {AppContext} from "../../context/AppContext.jsx";
import {FaFileExcel} from "react-icons/fa";
import { useMaquinaria } from "../../hooks/useMaquinaria.js";

export default function ExportButton() {
    
    const hooks = useContext(AppContext);

    const { planes: planesMaquinaria, valorDolar, valorGasoilina } = useMaquinaria();
    const { planes: planesFertilizantes } = hooks.fertilizantes;
    const { planes: planesSanitizantes } = hooks.sanitizantes;

    const fileName = `plan-agricola-${new Date().toISOString().split("T")[0]}`;

    const noHayDatos =
        (!planesMaquinaria || planesMaquinaria.length === 0) &&
        (!planesFertilizantes || planesFertilizantes.length === 0) &&
        (!planesSanitizantes || planesSanitizantes.length === 0 || planesSanitizantes.every(plan => plan.total === null || plan.total === 0));
    if (noHayDatos) return null;

    return (
        <button
            disabled={noHayDatos}
            className={`
                ${noHayDatos ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#036935]  to-[#024c27] hover:from-green-700 hover:to-green-800"} 
                text-white 
                px-4 py-2 
                h-16 
                max-w-xs 
                rounded-lg 
                transition-colors 
                duration-300 
                font-semibold 
                shadow 
                flex 
                items-center 
                justify-center
                gap-2
                uppercase
            `}
            onClick={() => exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, valorDolar, valorGasoilina,  fileName)}
        >
            <FaFileExcel style={{ transform: "scaleX(-1)" }} />
            Exportar Excel
        </button>
    );
}
