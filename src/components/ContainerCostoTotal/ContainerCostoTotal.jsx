
export const ContainerCostoTotal = ( {costoTotal} ) => {

  if (costoTotal) 
    return(<span>Costo Total: {costoTotal.toLocaleString()} ARS/ha</span>)

    return (
      <div className="flex items-center justify-end gap-2 text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 text-base font-semibold shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        Complete todos los datos requeridos para calcular el costo total.
      </div>
    );
    
};