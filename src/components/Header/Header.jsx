import { Link } from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";
import { PATHS } from '../../routes/paths.js';
import { useState} from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ButtonExportExcel from "../ButtonExportExcel/ButtonExportExcel.jsx";
import { Tractor, Sprout, SprayCan } from 'lucide-react';
import CategoryCards from "../CategoryCards/Categorycards.jsx";


// Íconos por categoría
const ICONS = {
  Maquinaria: <Tractor className="text-green-700" size={48} />,
  Fertilización: <Sprout className="text-lime-600" size={48} />,
  Sanitizantes: <SprayCan className="text-blue-600" size={48} />,
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header superior */}
      <header className="sticky top-0 z-30 bg-[#eeeeee] border-b-1 p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">
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
              aria-label={open ? "Cerrar menú" : "Abrir menú"}>
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Navegación */}
          <nav
            className={`
              ${open ? "flex" : "hidden"}
              md:flex flex-col md:flex-row items-center gap-2 text-sm md:text-base font-semibold w-full md:w-auto
              bg-white md:bg-transparent rounded-xl md:rounded-none shadow md:shadow-none mt-2 md:mt-0 p-4 md:p-0
              absolute md:static top-20 left-0 md:top-auto md:left-auto z-40`}>
            <ImportExcel />
            <ButtonExportExcel />
          </nav>
        </div>
      </header>

      <CategoryCards setOpen={setOpen} />
    </>
  );
};

export default Header;