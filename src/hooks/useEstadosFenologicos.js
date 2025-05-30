import {useState} from "react";
import * as LocalDb from "../data/local.js";

export default function useEstadosFenologicos() {
  const [estadosFenologicos, setEstadosFenologicos] = useState(LocalDb.getEstadosFenologicos());
  const [estadoFenologicoMaquinaria, setEstadoFenologicoMaquinaria] = useState(LocalDb.DEFAULT_ESTADO_FENOLOGICO);
  const [estadoFenologicoFertilizante, setEstadoFenologicoFertilizante] = useState(LocalDb.DEFAULT_ESTADO_FENOLOGICO);
  const [estadoFenologicoSanitizante, setEstadoFenologicoSanitizante] = useState(LocalDb.DEFAULT_ESTADO_FENOLOGICO);

  const saveEstadosFenologicos = (estados) => {
    setEstadosFenologicos(estados);
    LocalDb.saveEstadosFenologicos(estados);

    if (estados.length === 0) {
      setEstadoFenologicoMaquinaria(LocalDb.DEFAULT_ESTADO_FENOLOGICO);
      setEstadoFenologicoFertilizante(LocalDb.DEFAULT_ESTADO_FENOLOGICO);
      setEstadoFenologicoSanitizante(LocalDb.DEFAULT_ESTADO_FENOLOGICO);
    } else {
      const e = estados[0];
      setEstadoFenologicoMaquinaria(e);
      setEstadoFenologicoFertilizante(e);
      setEstadoFenologicoSanitizante(e);
    }
  }

  return {
    estadosFenologicos,
    estadoFenologicoMaquinaria,
    setEstadoFenologicoMaquinaria,
    estadoFenologicoFertilizante,
    setEstadoFenologicoFertilizante,
    estadoFenologicoSanitizante,
    setEstadoFenologicoSanitizante,
    saveEstadosFenologicos,
  };
}