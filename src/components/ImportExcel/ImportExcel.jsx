import React, {useContext, useRef} from 'react';
import {AppContext} from "../../context/AppContext.jsx";
import {importExcel} from "../../utils/utils.js";
import {mapExcelData} from "../../utils/mapping.js";

const ImportExcel = () => {
    const {
      maquinaria,
      fertilizantes,
      sanitizantes,
      estadosFenologicos,
    } = useContext(AppContext);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      importExcel(file, (allData) => {
        try {
          const dataMapped = mapExcelData(allData);
          maquinaria.saveTractores(dataMapped.tractores);
          maquinaria.saveImplementos(dataMapped.implementos);
          estadosFenologicos.saveEstadosFenologicos(dataMapped.estadosFenologicos);
          fertilizantes.saveFertilizantes(dataMapped.fertilizantes);
          sanitizantes.saveSanitizantes(dataMapped.sanitizantes);
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
          alert("Error al procesar el archivo Excel. Verifique el formato y los datos.");
        }
      });
    };

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    return (
      <div>
        <button
          className="bg-[#009dc0] text-white px-4 py-2 rounded-md hover:bg-[#007ba1] transition-colors duration-300"
          onClick={handleButtonClick}>Subir archivo Excel</button>

        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{display: 'none'}}
        />
      </div>
    );
  }
;

export default ImportExcel;
