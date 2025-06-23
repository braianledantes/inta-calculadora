import {useRef, useState} from 'react';
import {importExcel} from "../../utils/utils.js";
import {mapExcelData} from "../../utils/mapping.js";
import {FiUpload} from "react-icons/fi"; // Ícono de subida
import { useMaquinaria } from '../../hooks/useMaquinaria.js';
import { useFertilizante } from '../../hooks/useFertilizante.js';
import { useSanitizantes } from '../../hooks/useSanitizantes.js';

const ImportExcel = () => {
    const maquinaria = useMaquinaria();
    const fertilizantes = useFertilizante();
    const sanitizantes = useSanitizantes();

    const fileInputRef = useRef(null);
    const [nombreArchivo, setNombreArchivo] = useState("");

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      importExcel(file, (allData) => {
        try {
          const dataMapped = mapExcelData(allData);
          maquinaria.setTractores(dataMapped.tractores);
          maquinaria.setImplementos(dataMapped.implementos);
          fertilizantes.setFertilizantes(dataMapped.fertilizantes);
          sanitizantes.setSanitizantes(dataMapped.sanitizantes);
          setNombreArchivo(file.name);
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
          className="bg-gradient-to-r from-[#c95a1f] via-[#d87431] to-[#f09550] max-w-sm h-16 text-white px-4 py-2 rounded-lg hover:bg-[#c95a1f] transition-colors duration-300 font-semibold shadow flex items-center gap-2 uppercase hover:cursor-pointer"
          onClick={handleButtonClick}
        >
          <FiUpload className="text-xl" />
        {nombreArchivo
          ? `Excel '${nombreArchivo}' importado`
          : 'Importar Excel'}
        </button>

        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    );
};

export default ImportExcel;