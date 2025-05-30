import React from "react";
import {useMaquinaria} from "../hooks/useMaquinaria.js";
import {useFertilizante} from "../hooks/useFertilizante.js";
import {useSanitizantes} from "../hooks/useSanitizantes.js";
import useEstadosFenologicos from "../hooks/useEstadosFenologicos.js";

export const AppContext = React.createContext();

export function AppProvider({children}) {
  const maquinaria = useMaquinaria();
  const fertilizantes = useFertilizante();
  const sanitizantes = useSanitizantes();
  const estadosFenologicos = useEstadosFenologicos();

  const hooks = {
    maquinaria,
    fertilizantes,
    sanitizantes,
    estadosFenologicos,
  }

  return (
    <AppContext.Provider value={hooks}>
      {children}
    </AppContext.Provider>
  );
}