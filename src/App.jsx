import Header from "./components/Header/Header.jsx";
import SeccionCostosMaquinaria from "./components/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "./components/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitarios from "./components/SeccionCostosSanitarios/SeccionCostosSanitarios.jsx";
import {AppProvider} from "./context/AppContext.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <AppProvider>
      <Header/>
      <main className="flex flex-col gap-4 p-4 bg-gray-100">
        <div className="container mx-auto p-4 flex flex-col gap-4">
          <SeccionCostosMaquinaria/>
          <SeccionCostosFertilizacion/>
          <SeccionCostosSanitarios/>
        </div>
      </main>
      <Footer />
    </AppProvider>
  )
}

export default App
