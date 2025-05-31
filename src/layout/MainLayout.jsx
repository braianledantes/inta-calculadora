import Header from "../components/Header/Header.jsx";
import {Navigate, Outlet, Route, Routes} from "react-router";
import SeccionCostosMaquinaria from "../pages/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "../pages/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitizantes from "../pages/SeccionCostosSanitizantes/SeccionCostosSanitizantes.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function MainLayout() {
  return (
    <div>
      <Header/>
      <main className="flex flex-col gap-4 p-4 bg-gray-100">
        <div className="container mx-auto flex flex-col gap-4">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  )
}