import { useRef, useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { CardMaquinariaPlan } from "../../components/CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import InputGasoil from "../../components/InputGasoil/InputGasoil.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import PlanesMaquinariaChart from "../../components/PlanesMaquinariaChart/PlanesMaquinariaChart.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx";
import exportarGrafico from "../../utils/exportarGrafico.jsx";
import { LayoutGrid, AlignVerticalJustifyCenter } from "lucide-react";

export default function SeccionCostosMaquinaria() {
  const {
    valorDolar,
    updateDolar,
    refreshDolar,
    valorGasoilina,
    updateGasolina,
    planes,
    addPlan,
    updatePlan,
    deletePlan,
    tractores,
    implementos,
  } = useContext(AppContext).maquinaria;

  const lastPlanRef = useRef(null);
  const chartRef = useRef();

  const [vista, setVista] = useState("lista");
  const [vistaAutomatica, setVistaAutomatica] = useState(true);
  const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 768);

  const handleAddPlan = () => addPlan();

  const handleExportPdf = () => {
    exportarGrafico(chartRef, {
      maquinariaPlans: planes,
      valorDolar: valorDolar,
      valorGasoil: valorGasoilina,
    });
  };

  // Detecta cambio de tamaño de pantalla
  useEffect(() => {
    const manejarResize = () => {
      const esPequena = window.innerWidth < 768;
      setPantallaPequena(esPequena);

      if (esPequena) {
        setVista("lista");
        setVistaAutomatica(true);
      }
    };

    manejarResize(); // Ejecutar al cargar

    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, []);

  // Scroll al último plan y ajuste de vista automática
  useEffect(() => {
    if (lastPlanRef.current) {
      lastPlanRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (vistaAutomatica && !pantallaPequena) {
      if (planes.length >= 2) {
        setVista("dosColumnas");
      } else {
        setVista("lista");
      }
    }
  }, [planes.length, vistaAutomatica, pantallaPequena]);

  const handleVistaChange = (nuevaVista) => {
    setVistaAutomatica(false);
    setVista(nuevaVista);
  };

  return (
    <div className="bg-gray-100 py-8 my-4">
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <SectionTitle title="Calculadora de Costos de Maquinaria" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
        <InputDolar value={valorDolar} onChange={updateDolar} onRefresh={refreshDolar} />
        <InputGasoil value={valorGasoilina} onChange={updateGasolina} />
      </div>

      {/* Selector de vista solo visible en pantallas grandes */}
      {planes.length >= 2 && !pantallaPequena && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleVistaChange("lista")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none ${
              vista === "lista"
                ? "border border-black text-black"
                : "border border-gray-300 text-gray-400 hover:text-black hover:border-black"
            }`}
          >
            <AlignVerticalJustifyCenter size={18} />
            Lista (1 columna)
          </button>
          <button
            onClick={() => handleVistaChange("dosColumnas")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none ${
              vista === "dosColumnas"
                ? "border border-black text-black"
                : "border border-gray-300 text-gray-400 hover:text-black hover:border-black"
            }`}
          >
            <LayoutGrid size={18} />
            Dos Columnas
          </button>
        </div>
      )}

      <div
        className={`mb-8 ${
          vista === "lista"
            ? "flex flex-col items-center gap-6"
            : "grid grid-cols-2 gap-6 justify-center"
        }`}
      >
        {planes.map((plan, idx) => (
          <CardMaquinariaPlan
            key={plan.id}
            plan={plan}
            tractores={tractores}
            implementos={implementos}
            onDelete={deletePlan}
            onUpdate={updatePlan}
            ref={idx === planes.length - 1 ? (el) => { lastPlanRef.current = el; } : null}
          />
        ))}
      </div>

      <div className="mx-auto m-4xl">
        <AddPlanButton text="Ingresar nuevo conjunto" onClick={handleAddPlan} />
      </div>

      {planes.length >= 2 && (
        <div>
          <div ref={chartRef}>
            <PlanesMaquinariaChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  );
}


