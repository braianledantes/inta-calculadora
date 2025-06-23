import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useMaquinaria = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useMaquinaria must be used within an AppProvider")
  }

  return context.maquinaria
}