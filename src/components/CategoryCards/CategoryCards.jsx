import { Link, useLocation } from "react-router";
import { Tractor, Sprout, SprayCan } from "lucide-react";
import { PATHS } from "../../routes/paths";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ICONS = {
  Maquinaria: <Tractor className="text-green-700" size={48} />,
  Fertilización: <Sprout className="text-lime-600" size={48} />,
  Sanitizantes: <SprayCan className="text-blue-600" size={48} />,
};

const CategoryCards = ({ setOpen }) => {
  const location = useLocation();

  const {
    maquinaria: { planes: planesMaquinaria, addPlan: addPlanMaquinaria },
    fertilizantes: { planes: planesFert, addPlan: addPlanFert },
    sanitizantes: { planes: planesSan, addPlan: addPlanSan },
  } = useContext(AppContext);

  const cards = [
    {
      path: PATHS.MAQUINARIA,
      label: "Maquinaria",
      planes: planesMaquinaria,
      addPlan: addPlanMaquinaria,
    },
    {
      path: PATHS.FERTILIZANTES,
      label: "Fertilización",
      planes: planesFert,
      addPlan: addPlanFert,
    },
    {
      path: PATHS.SANITIZANTES,
      label: "Sanitizantes",
      planes: planesSan,
      addPlan: addPlanSan,
    },
  ];

  const isHome = location.pathname === PATHS.HOME;

  return (
    <div className="bg-[#eeeeee] shadow-2xl rounded-2xl pb-10">
      <h1 className="text-center text-sm sm:text-4xl pt-10 font-semibold text-gray-800 sm:justify-center">
        Seleccione una categoría de cálculo:
      </h1>

      <div className="flex flex-wrap justify-center gap-4 pt-6">
        {cards.map(({ path, label, planes, addPlan }) => (
          <Link
            key={path}
            to={path}
            onClick={() => {
              setOpen(false);
              if (planes.length === 0) {
                addPlan();
              }
            }}
          >
            <div
              className={`
                w-[110px] sm:w-[250px] flex flex-col items-center justify-center rounded-2xl p-6 shadow-md 
                bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer text-center
                ${isHome ? 'h-[110px] sm:h-[140px]' : 'h-[48px]'}
                ${location.pathname === path ? "border-2 border-green-600 shadow-lg scale-[1.02]" : ""}
              `}
            >
              {/* Contenedor para ícono con transición de opacidad y altura */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isHome ? "opacity-100 h-auto mb-3" : "opacity-0 h-0 mb-0"
                }`}
              >
                {ICONS[label]}
              </div>
              <span className="text-sm sm:text-2xl font-semibold text-gray-800">
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;


