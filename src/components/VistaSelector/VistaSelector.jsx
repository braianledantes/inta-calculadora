import { useEffect, useState } from "react";
import { AlignVerticalJustifyCenter, LayoutGrid } from "lucide-react";

export default function VistaSelector({ vista, onVistaChange }) {
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsWideScreen(window.innerWidth >= 1582);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isWideScreen && vista !== "lista") {
      onVistaChange("lista");
    }
  }, [isWideScreen, vista, onVistaChange]);

  // Si no es pantalla ancha, no mostrar botones (solo vista lista disponible)
  if (!isWideScreen) return null;

  return (
    <div className="flex justify-center gap-4 mb-6">
      {/* Mostrar botón lista solo si no está activa */}
      {vista !== "lista" && (
        <button
          onClick={() => onVistaChange("lista")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none border border-gray-300 text-gray-400 hover:text-black hover:border-black"
        >
          <AlignVerticalJustifyCenter size={18} />
          Lista (1 columna)
        </button>
      )}

      {/* Mostrar botón dosColumnas solo si no está activa */}
      {vista !== "dosColumnas" && (
        <button
          onClick={() => onVistaChange("dosColumnas")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none border border-gray-300 text-gray-400 hover:text-black hover:border-black"
        >
          <LayoutGrid size={18} />
          Dos Columnas
        </button>
      )}
    </div>
  );
}
