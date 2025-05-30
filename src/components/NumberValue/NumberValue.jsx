import {formatNumber} from "../../utils/utils.js";

export default function NumberValue({name, value, unit, esComputado = false, formated = true}) {
  const computadoClass = esComputado ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';

  const formattedValue = formated ? formatNumber(value) : value;

  return (
    <div>
      <label>{name}</label>
      <div className={`border p-2 rounded bg-gray-100 text-gray-800 flex gap-1 items-center justify-end ${computadoClass}`}>
        {formattedValue}{unit && <span >{unit}</span>}
      </div>
    </div>
  );
}