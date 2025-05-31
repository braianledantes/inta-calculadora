import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import MainLayout from "../layout/MainLayout.jsx";
import SeccionCostosMaquinaria from "../pages/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "../pages/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitizantes from "../pages/SeccionCostosSanitizantes/SeccionCostosSanitizantes.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import {PATHS} from "./paths.js";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout/>}>
          <Route path={PATHS.HOME} element={<Navigate to={PATHS.MAQUINARIA} replace/>}/>
          <Route path={PATHS.MAQUINARIA} element={<SeccionCostosMaquinaria/>}/>
          <Route path={PATHS.FERTILIZANTES} element={<SeccionCostosFertilizacion/>}/>
          <Route path={PATHS.SANITIZANTES} element={<SeccionCostosSanitizantes/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}