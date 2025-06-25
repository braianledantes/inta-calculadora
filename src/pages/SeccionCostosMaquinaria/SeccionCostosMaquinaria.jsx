import { useEffect, useRef, useState } from "react";
import AddPlanButton from "../../components/AddPlanButton/AddPlanButton.jsx";
import ButtonExportPDF from "../../components/ButtonExportPDF/ButtonExportPDF.jsx";
import { CardMaquinariaPlan } from "../../components/CardMaquinariaPlan/CardMaquinariaPlan.jsx";
import InputDolar from "../../components/InputDolar/InputDolar.jsx";
import InputGasoil from "../../components/InputGasoil/InputGasoil.jsx";
import PlanesMaquinariaChart from "../../components/PlanesMaquinariaChart/PlanesMaquinariaChart.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import VistaSelector from "../../components/VistaSelector/VistaSelector.jsx";
import { useMaquinaria } from "../../hooks/useMaquinaria.js";
import exportarGrafico from "../../utils/exportarGrafico.jsx";

export default function SeccionCostosMaquinaria() {
  const {
    dolar,
    dolares,
    gasoil,
    listaGasoil,
    updateDolar,
    updateGasolina,
    planes,
    addPlan,
    updatePlan,
    deletePlan,
    tractores,
    implementos,
  } = useMaquinaria();

  const lastPlanRef = useRef(null);
  const chartRef = useRef();
  const prevPlanesLength = useRef(planes.length);

  const [vista, setVista] = useState("lista");
  const [vistaAutomatica, setVistaAutomatica] = useState(true);
  const [pantallaPequena, setPantallaPequena] = useState(window.innerWidth < 768);

  const handleAddPlan = () => addPlan();

  const handleExportPdf = () => {
    exportarGrafico(chartRef, {
      maquinariaPlans: planes,
      valorDolar: dolar.valor,
      valorGasoil: gasoil.valor,
    });
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
    <div className="bg-gray-100  my-4">
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <SectionTitle title="Calculadora de Costos de Maquinaria" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
        <InputDolar dolar={dolar} dolares={dolares} onChangeDolar={updateDolar} />

        <InputGasoil gasoil={gasoil} listaGasoil={listaGasoil} onChangeGasoil={updateGasolina} />

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
        <div >
          <div ref={chartRef} className="h-full">
            <PlanesMaquinariaChart planes={planes} />
          </div>
          <ButtonExportPDF onExport={handleExportPdf} />
        </div>
      )}
    </div>
  );
}

