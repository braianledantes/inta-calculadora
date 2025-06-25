import { useEffect, useRef, useState } from "react";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx";
import { CardSanitizantePlan } from "../../components/CardSanitizantePlan/CardSanitizantePlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import PlanesSanitizantesChart from "../../components/PlanesSanitizantesChart/PlanesSanitizantesChart.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import VistaSelector from "../../components/VistaSelector/VistaSelector.jsx";
import { useSanitizantes } from "../../hooks/useSanitizantes.js";
import exportarGrafico from "../../utils/exportarGrafico.jsx";

export default function SeccionCostosSanitizantes() {
  const {
    dolar,
    dolares,
    updateDolar,
    planes,
    addPlan,
  } = useSanitizantes();

  const chartRef = useRef();

  const [vista, setVista] = useState("lista");
  const [vistaAutomatica, setVistaAutomatica] = useState(true);
  const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 768);

  const handleAddPlan = () => {
    addPlan();
  };
  const handleExportPdf = () => {v
    exportarGrafico(chartRef, { sanitizantePlans: planes, valorDolar: dolar.valor});
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
    <div className="bg-gray-100  my-4">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <SectionTitle title="Calculadora de Costos de Planes Sanitarios" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <InputDolar dolar={dolar} dolares={dolares} onChangeDolar={updateDolar} />
      </div>

      {planes.length >= 2 && !pantallaPequena && (
        <VistaSelector vista={vista} onVistaChange={handleVistaChange} />
      )}

      <div
        className={`mb-8 ${vista === "lista"
          ? "flex flex-col items-center gap-6"
          : "grid grid-cols-2 gap-6 justify-center"
          }`}
      >
        {planes.map(plan =>
          (<CardSanitizantePlan key={plan.id} plan={plan} />)
        )}
      </div>

      <div className="mx-auto m-4xl">
        <AddPlanButton text="Agregar Plan Fitosanitario" onClick={handleAddPlan} />
      </div>

      {planes.length > 0 && planes.some(plan => plan.total !== null && plan.total !== 0) && (
        <div>
          <div ref={chartRef}>
            <PlanesSanitizantesChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  );
}
