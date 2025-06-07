import { Link, useLocation } from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";
import { PATHS } from '../../routes/paths.js';
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ButtonExportExcel from "../ButtonExportExcel/ButtonExportExcel.jsx";
import { Tractor, Sprout, SprayCan } from 'lucide-react'; // Iconos Lucide

// Íconos por categoría
const ICONS = {
  Maquinaria: <Tractor className="text-green-700" size={48} />,
  Fertilización: <Sprout className="text-lime-600" size={48} />,
  Sanitizantes: <SprayCan className="text-blue-600" size={48} />,
};

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const cards = [
    { path: PATHS.MAQUINARIA, label: "Maquinaria" },
    { path: PATHS.FERTILIZANTES, label: "Fertilización" },
    { path: PATHS.SANITIZANTES, label: "Sanitizantes" }
  ];

  return (
    <>
      {/* Header superior */}
      <header className="sticky top-0 z-30 bg-[#eeeeee] border-b-1 p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

          {/* Logo & menú hamburguesa */}
          <div className="flex w-full md:w-auto items-center justify-between">
            <Link to={PATHS.HOME}>
              <img
                src={sipan}
                alt="Sipan Logo"
                className="h-[35px] md:h-[54px] cursor-pointer"
              />
            </Link>
            <button
              className="md:hidden ml-auto text-[#036935] text-3xl p-2"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Navegación */}
          <nav
            className={`
              ${open ? "flex" : "hidden"}
              md:flex flex-col md:flex-row items-center gap-2 text-sm md:text-base font-semibold w-full md:w-auto
              bg-white md:bg-transparent rounded-xl md:rounded-none shadow md:shadow-none mt-2 md:mt-0 p-4 md:p-0
              absolute md:static top-20 left-0 md:top-auto md:left-auto z-40
            `}
          >
            <ImportExcel />
            <ButtonExportExcel />
          </nav>
        </div>
      </header>

      {/* Sección de tarjetas */}
      <div className="bg-[#eeeeee] shadow-2xl rounded-2xl pb-10">
        <h1 className="text-center text-4xl pt-10 font-semibold text-gray-800">
          Seleccione una categoría de cálculo:
        </h1>

        <div className="flex flex-wrap justify-center gap-4 pt-6">
          {cards.map(({ path, label }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)}>
              <div
                className={`
                  w-[250px] h-[180px] flex flex-col items-center justify-center rounded-2xl p-6 shadow-md 
                  bg-white hover:bg-gray-100 transition duration-300 cursor-pointer text-center
                  ${location.pathname === path ? "border-2 border-green-600 shadow-lg scale-[1.02]" : ""}
                `}
              >
                {ICONS[label]}
                <span className="mt-3 text-2xl font-semibold text-gray-800">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
