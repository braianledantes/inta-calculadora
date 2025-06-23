import React, { useEffect } from "react";
import { DOLAR_DEFAULT, getDolar, TIPO_DOLARES } from "../api/dolar";
import { GASOIL_DEFAULT, getGasoil, TIPO_GASOIL } from "../api/gasoil";
import { useFertilizanteReducer } from "../reducers/fertilizantesReducer";
import { useMaquinariaReducer } from "../reducers/maquinariaReducer";
import { useSanitizantesReducer } from "../reducers/sanitizantesReducer";

export const AppContext = React.createContext();

export function AppProvider({ children }) {
  const maquinaria = useMaquinariaReducer();
  const fertilizantes = useFertilizanteReducer();
  const sanitizantes = useSanitizantesReducer();

  useEffect(() => {
    const fetchValores = async () => {
      // obtiene el valor del dólar
      const nuevosDolares = await getDolar();
      const dolares = [
        DOLAR_DEFAULT,
        { tipo: TIPO_DOLARES.OFICIAL, valor: nuevosDolares.oficial },
        { tipo: TIPO_DOLARES.TARJETA, valor: nuevosDolares.tarjeta },
      ];
      // Actualiza el estado de los dólares
      maquinaria.setDolares(dolares);
      maquinaria.setDolar(dolares[1]);
      fertilizantes.setDolares(dolares);
      fertilizantes.setDolar(dolares[1]);
      sanitizantes.setDolares(dolares);
      sanitizantes.setDolar(dolares[1]);
      // obtiene el valor del gasoil
      const nuevosGasoil = await getGasoil();
      const listaGasoil = [
        GASOIL_DEFAULT,
        { tipo: TIPO_GASOIL.GRADO2, valor: nuevosGasoil.grado2 },
        { tipo: TIPO_GASOIL.GRADO3, valor: nuevosGasoil.grado3 },
      ];
      // Actualiza el estado del gasoil
      maquinaria.setListaGasoil(listaGasoil);
      maquinaria.setGasoil(listaGasoil[1]);
    };
    fetchValores();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider value={{ maquinaria, fertilizantes, sanitizantes }}>
      {children}
    </AppContext.Provider>
  );
}