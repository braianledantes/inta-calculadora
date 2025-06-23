import { Link, useLocation } from "react-router";
import { PATHS } from "../../routes/paths";
import { useMaquinaria } from "../../hooks/useMaquinaria";
import { useFertilizante } from "../../hooks/useFertilizante";
import { useSanitizantes } from "../../hooks/useSanitizantes";

const CategoryCards = ({ setOpen }) => {
  const location = useLocation();

  const { planes: planesMaquinaria, addPlan: addPlanMaquinaria } = useMaquinaria();
    const { planes: planesFert, addPlan: addPlanFert } = useFertilizante();
    const { planes: planesSan, addPlan: addPlanSan } = useSanitizantes();

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
      <h1 className="text-center text-sm sm:text-4xl pt-10 font-semibold text-gray-800">
        Seleccione una categoría de cálculo:
      </h1>

      <div className="flex flex-row sm:flex-wrap justify-center gap-2 sm:gap-4 pt-6">
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
                w-[90px] sm:w-[250px] flex flex-col items-center justify-center rounded-xl p-3 sm:p-6 shadow-md 
                bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer text-center
                ${location.pathname === path ? "border-2 border-green-600 shadow-lg scale-[1.02]" : ""}
              `}
            >
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isHome ? "opacity-100 h-auto mb-2" : "opacity-0 h-0 pt-2 mb-0"
                }`}
              ></div>
              <span className={`text-xs sm:text-2xl font-semibold text-gray-800 ${isHome ? "" : "pb-2"}`}>
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
