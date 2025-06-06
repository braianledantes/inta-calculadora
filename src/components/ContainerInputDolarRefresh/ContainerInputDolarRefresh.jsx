import { ButtonRefreshDolar } from "../ButtonRefreshDolar/ButtonRefreshDolar.jsx";
import {RefreshCcw } from "lucide-react";
import NumberValueModify from "../NumberValueModify/NumberValueModify.jsx";

export const ContainerInputDolarRefresh = ({ value, onChange, onRefresh }) => {
  return (
    <div className="flex items-center gap-2">

      <NumberValueModify name="Precio" value={value} unit="US$" onChange={onChange} />

      <ButtonRefreshDolar 
        onClick={onRefresh} 
        className="flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition-colors mt-5" 
        title="Sincronizar valor del dólar" 
        style={{ minWidth: 36, minHeight: 36 }} 
        content={<RefreshCcw size={20} />}
      />
    
    </div>
  );
}