import { Link, useLocation } from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";
import { PATHS } from '../../routes/paths.js';
import { useState } from "react";

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
      <header className="sticky top-0 z-30 bg-gradient-to-b from-white to-[#ccc] border-b-1 ">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

          {/* Logo & Hamburger */}
          <div className="flex w-full md:w-auto items-center justify-between">
            <Link to={PATHS.HOME}>
              <img
                src={sipan}
                alt="Sipan Logo"
                className="h-[25px] md:h-[54px] cursor-pointer"
              />
            </Link>
          </div>
          <div className="absolute top-0 right-0 h-full hidden md:flex items-center justify-center px-6">
            <div className="h-full flex items-center justify-center px-4 border-l border-[#ccc] transition-all duration-300 group bg-gradient-to-b from-orange-500 to-orange-600 cursor-pointer">
              <span className="text-white text-lg transition-all duration-300 ">Calculadoras</span>
            </div>
          </div>

        </div>
      </header>

      {/* Cards Section */}
      <div className="bg-gray-100 pt-12">
        <div className="flex flex-wrap justify-center gap-3">
          {cards.map(({ path, label, bg }) => (
            <Link key={path} to={path} onClick={() => setOpen(false)}>
              <div
                className={`
                  group w-[300px] aspect-[16/9] m-2 flex items-end bg-cover bg-center text-black cursor-pointer
                  transform transition duration-300 ease-in-out rounded-2xl 
                  hover:shadow-xl hover:scale-[1.02]
                  ${location.pathname === path ? "shadow-2xl scale-[1.01]" : ""}
                `}
                style={{ backgroundImage: `url("${bg}")` }}
              >
                {location.pathname === path ? (
                  <div className="w-full backdrop-blur-md bg-orange-500/60 text-3xl text-center py-2 rounded-b-2xl text-white">
                    {label}
                  </div>
                ) : (
                  <div className="w-full backdrop-blur-md bg-orange-500/20 text-3xl text-center text-white py-2 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
          <div className="py-4 flex justify-center">
            <ImportExcel />
          </div>
      </div>
    </>
  );
};

export default Header;
