import { Plus } from "lucide-react";

const TratamientoPaginator = ({
  tratamientos,
  tratamientoActivoIndex,
  onChangeIndex,
  onAdd
}) => {
  const activeBg = "#264653";
  const activeText = "#FFFFFF";
  const inactiveBg = "rgba(125, 156, 163, 0.35)"; // gris claro con transparencia
  const inactiveText = "#264653";
  const hoverBg = "#1f3944"; // tono más oscuro para hover
  const hoverText = "#FFFFFF";

  return (
    <div className="flex gap-2 mb-6 justify-start items-center flex-wrap">
      {tratamientos.map((_, index) => (
        <button
          key={index}
          className="w-8 h-8 rounded-full border font-semibold text-sm flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: index === tratamientoActivoIndex ? activeBg : inactiveBg,
            color: index === tratamientoActivoIndex ? activeText : inactiveText,
            borderColor: "#264653",
          }}
          onClick={() => onChangeIndex(index)}
          title={`Tratamiento ${index + 1}`}
          onMouseEnter={e => {
            if (index !== tratamientoActivoIndex) {
              e.currentTarget.style.backgroundColor = hoverBg;
              e.currentTarget.style.color = hoverText;
            }
          }}
          onMouseLeave={e => {
            if (index !== tratamientoActivoIndex) {
              e.currentTarget.style.backgroundColor = inactiveBg;
              e.currentTarget.style.color = inactiveText;
            }
          }}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="rounded-full border font-medium text-sm shadow-sm flex items-center justify-center transition-colors duration-200"
        style={{
          width: tratamientos.length === 0 ? "auto" : "2rem",
          height: "2rem",
          padding: tratamientos.length === 0 ? "0.375rem 1rem" : 0,
          borderColor: "#264653",
          backgroundColor: "transparent",
          color: "#264653",
        }}
        onClick={onAdd}
        title="Agregar Tratamiento"
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = "#264653";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#264653";
        }}
      >
        {tratamientos.length === 0 ? "Agregar Tratamiento +" : <Plus size={18} />}
      </button>
    </div>
  );
};

export default TratamientoPaginator;


