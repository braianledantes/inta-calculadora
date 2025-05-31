import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Header from "./components/Header/Header.jsx";
import SeccionCostosMaquinaria from "./pages/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "./pages/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitizantes from "./pages/SeccionCostosSanitizantes/SeccionCostosSanitizantes.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <main className="flex flex-col gap-4 p-4 bg-gray-100">
          <div className="container mx-auto flex flex-col gap-4">
            <Routes>
              <Route path="/" element={<Navigate to="/maquinaria" replace />} />
              <Route path="/maquinaria" element={<SeccionCostosMaquinaria />} />
              <Route path="/fertilizacion" element={<SeccionCostosFertilizacion />} />
              <Route path="/sanitizantes" element={<SeccionCostosSanitizantes />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;