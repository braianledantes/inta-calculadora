import Header from "./components/Header/Header.jsx";
import SeccionCostosMaquinaria from "./components/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "./components/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitarios from "./components/SeccionCostosSanitarios/SeccionCostosSanitarios.jsx";
import {AppProvider} from "./context/AppContext.jsx";

function App() {
  return (
    <AppProvider>
      <Header/>
      <SeccionCostosMaquinaria/>
      <SeccionCostosFertilizacion/>
      <SeccionCostosSanitarios/>
    </AppProvider>
  )
}

export default App
