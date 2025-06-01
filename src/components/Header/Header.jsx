import { Link, useLocation } from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";
import { PATHS } from '../../routes/paths.js';
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navLinkClass = (path) =>
    "px-4 py-2 rounded-lg transition-colors duration-200 font-semibold " +
    (location.pathname === path
      ? "bg-[#036935] text-white shadow-md scale-105"
      : "text-[#036935] hover:bg-[#e6f4ed] hover:text-[#024c27]");

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-b from-white to-[#eeeeee] shadow-md p-4">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

        {/* Logo y Hamburguesa */}
        <div className="flex w-full md:w-auto items-center justify-between">
          <img
            src={sipan}
            alt="Sipan Logo"
            className="h-[35px] md:h-[54px]"
          />
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
          <Link to={PATHS.MAQUINARIA} className={navLinkClass(PATHS.MAQUINARIA)} onClick={() => setOpen(false)}>
            Maquinaria
          </Link>
          <Link to={PATHS.FERTILIZANTES} className={navLinkClass(PATHS.FERTILIZANTES)} onClick={() => setOpen(false)}>
            Fertilización
          </Link>
          <Link to={PATHS.SANITIZANTES} className={navLinkClass(PATHS.SANITIZANTES)} onClick={() => setOpen(false)}>
            Sanitizantes
          </Link>
          <ImportExcel />
        </nav>
      </div>
    </header>
  );
};

export default Header;