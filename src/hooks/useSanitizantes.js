import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

export const useSanitizantes = () => {
  const context = useContext(AppContext)
  
    if (!context) {
      throw new Error("useSanitizantes must be used within an AppProvider")
    }
  
    return context.sanitizantes
}