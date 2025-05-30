import Header from "./components/Header/Header.jsx";
import SeccionCostosMaquinaria from "./components/SeccionCostosMaquinaria/SeccionCostosMaquinaria.jsx";
import SeccionCostosFertilizacion from "./components/SeccionCostosFertilizacion/SeccionCostosFertilizacion.jsx";
import SeccionCostosSanitarios from "./components/SeccionCostosSanitarios/SeccionCostosSanitarios.jsx";

function App() {
  return (
    <>
      <Header/>
      <SeccionCostosMaquinaria/>
      <SeccionCostosFertilizacion/>
      <SeccionCostosSanitarios/>
    </>
  )
}

export default App
