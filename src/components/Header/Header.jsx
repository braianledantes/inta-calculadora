import { Link, useLocation } from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";
import { PATHS } from '../../routes/paths.js';
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

 
  const cards = [
    {
      path: PATHS.MAQUINARIA,
      label: "Maquinaria",
      bg: '/tractor.jpg'
    },
    {
      path: PATHS.FERTILIZANTES,
      label: "Fertilización",
      bg: '/fertilizante.jpg'
    },
    {
      path: PATHS.SANITIZANTES,
      label: "Sanitizantes",
      bg: '/sanitizante.jpg'
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#eeeeee] border-b-1 p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

          {/* Logo & Hamburger */}
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

          {/* Navigation */}
          <nav
            className={`
              ${open ? "flex" : "hidden"}
              md:flex flex-col md:flex-row items-center gap-2 text-sm md:text-base font-semibold w-full md:w-auto
              bg-white md:bg-transparent rounded-xl md:rounded-none shadow md:shadow-none mt-2 md:mt-0 p-4 md:p-0
              absolute md:static top-20 left-0 md:top-auto md:left-auto z-40
            `}
          >
            <ImportExcel />
          </nav>
        </div>
      </header>

      {/* Cards Section */}
      <div className="bg-[#eeeeee] shadow-2xl rounded-2xl">
        <div className="flex flex-wrap justify-center gap-3">
          {cards.map(({ path, label, bg }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)}>
              <div
                className={`
                  group w-[300px] aspect-[16/9] m-2 flex items-end bg-cover bg-center text-black cursor-pointer
                  transform transition duration-300 ease-in-out rounded-2xl 
                  hover:shadow-xl hover:scale-[1.02]
                  ${location.pathname === path ? "shadow-2xl scale-[1.01] border-1 border-gray-600" : ""}
                `}
                style={{ backgroundImage: `url("${bg}")` }}
              >
                {location.pathname === path ? (
                  <div className="w-full backdrop-blur-md bg-white/60 text-4xl text-center py-2 rounded-b-2xl">
                    {label}
                  </div>
                ) : (
                  <div className="w-full backdrop-blur-md bg-white/50 text-4xl text-center py-2 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
