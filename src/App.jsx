import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router";
import SeccionCostosMaquinaria from "./pages/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "./pages/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitizantes from "./pages/SeccionCostosSanitizantes/SeccionCostosSanitizantes.jsx";
import {AppProvider} from "./context/AppContext.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<Navigate to="/maquinaria" replace/>}/>
            <Route path="/maquinaria" element={<SeccionCostosMaquinaria/>}/>
            <Route path="/fertilizacion" element={<SeccionCostosFertilizacion/>}/>
            <Route path="/sanitizantes" element={<SeccionCostosSanitizantes/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;