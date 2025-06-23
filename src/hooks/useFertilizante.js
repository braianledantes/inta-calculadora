import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export const useFertilizante = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useFertilizante must be used within an AppProvider")
  }

  return context.fertilizantes
}