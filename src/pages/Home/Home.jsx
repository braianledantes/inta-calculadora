import { useState } from "react";
import InfoCard from "../../components/InfoCard/InfoCard.jsx";
import InfoTablas from "../../components/InfoTablas/InfoTablas.jsx";
import {
    FileWarningIcon,
    Tractor,
    Sprout,
    SprayCan,
    BarChart3,
    FileDown,
    UploadCloud
} from "lucide-react";



const Home = () => {
    const [mostrarTablas, setMostrarTablas] = useState(false);

    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-l flex gap-2">
                        <FileWarningIcon className="text-2xl"/>
                        El archivo (.xlsx) que se importe deberá tener una estructura como la siguiente:
                        <button
                            onClick={() => setMostrarTablas(!mostrarTablas)}
                            className="bg-[#036935] hover:bg-[#024c27] text-white px-6 py-3 rounded text-lg shadow-md transition duration-300 ml-4"
                        >
                            {mostrarTablas ? "Ocultar" : "Ver Ejemplo" }
                        </button>
                    </h1>
                </div>

                {!mostrarTablas && (
                    <div className="min-h-full flex flex-col mt-10 items-center">
                        <div className="p-6 w-full">
                            <h1 className="text-2xl text-center font-bold mb-4">
                                Bienvenido a la Calculadora de Costos
                            </h1>
                            <div className="text-gray-700 space-y-6">
                                <div className="text-gray-800 w-full max-w-6xl mx-auto px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <InfoCard
                                            icon={<UploadCloud className="w-5 h-5 " />}
                                            title="Ingresar y cargar datos agrícolas"
                                        >
                                            <li>Subir datos desde un archivo Excel o traerlos desde la web.</li>
                                            <li>Cotización del dólar (manual o automática)</li>
                                            <li>Precio del gasoil (manual o automático)</li>
                                            <li>Cantidad de tratamientos</li>
                                            <li>Volumen a aplicar con la maquinaria</li>
                                        </InfoCard>

                                        <InfoCard
                                            icon={<Tractor className="w-5 h-5 " />}
                                            title="Calcular costos de maquinaria"
                                        >
                                            <li>Seleccionar un tractor y un implemento</li>
                                            <li>
                                                Calcular:
                                                <ul className="ml-4 list-[circle] space-y-0.5">
                                                    <li>Amortización por hora</li>
                                                    <li>Conservación por hora</li>
                                                    <li>Costo de combustible</li>
                                                    <li>Costo económico total por hora</li>
                                                </ul>
                                            </li>
                                            <li>Usa el valor actual del dólar y gasoil</li>
                                        </InfoCard>

                                        <InfoCard
                                            icon={<Sprout className="w-5 h-5 " />}
                                            title="Calcular costos de fertilizantes"
                                        >
                                            <li>Seleccionar fertilizante y tratamientos</li>
                                            <li>Ingresar valor del dólar</li>
                                            <li>Obtener el costo por hectárea y total</li>
                                        </InfoCard>

                                        <InfoCard
                                            icon={<SprayCan className="w-5 h-5 " />}
                                            title="Calcular costos de sanitizantes"
                                        >
                                            <li>
                                                Ingresar sanitizante, volumen por hectárea y tratamientos. Obtener el costo total según el valor del dólar.
                                            </li>
                                        </InfoCard>

                                        <InfoCard
                                            icon={<BarChart3 className="w-5 h-5 " />}
                                            title="Comparar resultados y visualizar"
                                        >
                                            <li>Realizar múltiples cálculos</li>
                                            <li>Visualizar gráficos comparativos entre insumos o máquinas</li>
                                        </InfoCard>

                                        <InfoCard
                                            icon={<FileDown className="w-5 h-5 " />}
                                            title="Exportar informes"
                                        >
                                            <li>Descargar en PDF los resultados y análisis realizados</li>
                                        </InfoCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {mostrarTablas && (
                    <div className="border-gray-100 p-4 rounded-xl shadow-lg bg-[#eeeeee] space-y-8">
                        <InfoTablas
                            title="Tractores"
                            headers={[
                                "id",
                                "nombre",
                                "precioDolar",
                                "gastoMantenimiento",
                                "horasVidaUtil",
                                "porcentajeValorResidual",
                                "potencia",
                            ]}
                            data={[
                                [1, "Tractor A", 25000, 1200, 5000, "10%", "100HP"],
                                [2, "Tractor B", 30000, 1500, 6000, "12%", "120HP"],
                            ]}
                        />

                        <InfoTablas
                            title="Implementos"
                            headers={[
                                "numero",
                                "nombre",
                                "precioEnvaseDolar",
                                "volumenEnvase",
                                "unidadVolumenEnvase",
                                "dosisAplicacion",
                                "unidadDosisAplicacion",
                            ]}
                            data={[
                                [1, "Pulverizador", 100, 20, "L", 2, "L/ha"],
                                [2, "Abonadora", 120, 25, "L", 1.5, "L/ha"],
                            ]}
                        />

                        <InfoTablas
                            title="Fertilizantes"
                            headers={[
                                "numero",
                                "nombre",
                                "precioEnvaseDolar",
                                "volumenEnvase",
                                "unidadVolumenEnvase",
                                "dosisAplicacion",
                                "unidadDosisAplicacion",
                                "tipo",
                            ]}
                            data={[
                                [1, "Urea", 50, 10, "kg", 1, "kg/ha", "Nitrogenado"],
                                [2, "Fosfato", 60, 8, "kg", 1.2, "kg/ha", "Fosforado"],
                            ]}
                        />

                        <InfoTablas
                            title="Sanitizantes"
                            headers={[
                                "id",
                                "nombre",
                                "precioDolar",
                                "gastoMantenimiento",
                                "horasVidaUtil",
                                "porcentajeValorResidual",
                                "consumoCombustible",
                            ]}
                            data={[
                                [1, "Sanitizante X", 500, 50, 200, "5%", "0.5 L/h"],
                                [2, "Sanitizante Y", 650, 60, 250, "6%", "0.6 L/h"],
                            ]}
                        />

                        <InfoTablas
                            title="Estado Fenológico"
                            headers={["numero", "nombre", "descripcion"]}
                            data={[
                                [1, "Floración", "Inicio de la floración de la planta"],
                                [2, "Madurez", "Fruto listo para cosecha"],
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    );
};


export default Home;
