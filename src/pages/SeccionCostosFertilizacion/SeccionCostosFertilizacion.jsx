import { useEffect, useRef, useState } from "react";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx";
import { CardFertilizacionPlan } from "../../components/CardFertilizacionPlan/CardFertilizacionPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import PlanesFertilizantesChart from "../../components/PlanesFertilizantesChart/PlanesFertilizantesChart.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import VistaSelector from "../../components/VistaSelector/VistaSelector.jsx";
import { useFertilizante } from "../../hooks/useFertilizante.js";
import exportarGrafico from "../../utils/exportarGrafico.jsx";

export default function SeccionCostosFertilizacion() {
  const {
    dolar,
    dolares,
    updateDolar,
    planes,
    fertilizantes,
    addPlan,
    updatePlan,
    deletePlan,
  } = useFertilizante();

  const lastPlanRef = useRef(null);
  const chartRef = useRef();
  const prevPlanesLength = useRef(planes.length);

  const [vista, setVista] = useState("lista");
  const [vistaAutomatica, setVistaAutomatica] = useState(true);
  const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 768);

  const handleAddPlan = () => {
    addPlan();
  };

  const handleExportPdf = () => {
    exportarGrafico(chartRef, { fertilizacionPlans: planes, valorDolar: dolar.valor });
  };

  useEffect(() => {
    const manejarResize = () => {
      const esPequena = window.innerWidth < 768;
      setPantallaPequena(esPequena);

      if (esPequena) {
        setVista("lista");
        setVistaAutomatica(true);
      }
    };

    manejarResize();

    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, []);

  useEffect(() => {
    if (planes.length > prevPlanesLength.current && lastPlanRef.current) {
      lastPlanRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    prevPlanesLength.current = planes.length;

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
    <div className="bg-gray-100 my-4">
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <SectionTitle title="Calculadora de Costos de Planes de Fertilización" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar dolar={dolar} dolares={dolares} onChangeDolar={updateDolar} />
      </div>

      {planes.length >= 2 && !pantallaPequena && (
        <VistaSelector vista={vista} onVistaChange={handleVistaChange} />
      )}

      <div
        className={`mb-8 ${
          vista === "lista"
            ? "flex flex-col items-center gap-6"
            : "grid grid-cols-2 gap-6 justify-center"
        }`}
      >
        {planes.map((plan, idx) => (
          <CardFertilizacionPlan
            key={plan.id}
            plan={plan}
            fertilizantes={fertilizantes}
            onDelete={deletePlan}
            onUpdate={updatePlan}
            ref={idx === planes.length - 1 ? (el) => { lastPlanRef.current = el; } : null}
          />
        ))}
      </div>

      <div className="mx-auto m-4xl">
        <AddPlanButton text="Agregar plan fertilización" onClick={handleAddPlan} />
      </div>

      {planes.length >= 2 && (
        <div>
          <div ref={chartRef}>
            <PlanesFertilizantesChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  );
}
