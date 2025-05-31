import {Link, useLocation} from "react-router";
import sipan from '../../assets/Logos_Header.svg';
import ImportExcel from "../ImportExcel/ImportExcel.jsx";

const Header = () => {
  const location = useLocation();
  const navLinkClass = (path) =>
    "px-4 py-2 rounded " +
    (location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-blue-700 hover:bg-blue-100");

  return (
    <header className="bg-gradient-to-b from-white to-[#eeeeee] shadow-md border-b">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2">

        {/* Logo */}
        <img
          src={sipan}
          alt="Sipan Logo"
          className="h-[35px] md:h-[54px]"
        />

        {/* Navegación */}
        <nav
          className="flex flex-col md:flex-row items-center gap-1 text-sm md:text-base font-semibold w-full md:w-auto">
          <Link to="/maquinaria" className={navLinkClass("/maquinaria")}>
            Maquinaria
          </Link>
          <Link to="/fertilizacion" className={navLinkClass("/fertilizacion")}>
            Fertilización
          </Link>
          <Link to="/sanitizantes" className={navLinkClass("/sanitizantes")}>
            Sanitizantes
          </Link>
          <ImportExcel/>
        </nav>
      </div>
    </header>
  );
};

export default Header;
