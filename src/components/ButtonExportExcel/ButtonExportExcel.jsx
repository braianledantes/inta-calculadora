import { FaFileExcel } from "react-icons/fa";
import { exportFormToExcel } from "../../excel/exportExcel.js";
import { useFertilizante } from "../../hooks/useFertilizante.js";
import { useMaquinaria } from "../../hooks/useMaquinaria.js";
import { useSanitizantes } from "../../hooks/useSanitizantes.js";

export default function ExportButton() {
    const { planes: planesMaquinaria, dolar:dolarMaquinaria, gasoil} = useMaquinaria();
    const { planes: planesFertilizantes,dolar:dolarFertilizante } = useFertilizante();
    const { planes: planesSanitizantes, dolar:dolarSanitizante } = useSanitizantes();

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
                w-full
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
            onClick={() => exportFormToExcel(planesMaquinaria, planesFertilizantes, planesSanitizantes, dolarMaquinaria, dolarFertilizante, dolarSanitizante, gasoil.valor,  fileName)}
        >
            <FaFileExcel style={{ transform: "scaleX(-1)" }} />
            Exportar Excel
        </button>
    );
}
