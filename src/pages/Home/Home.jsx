import {useState} from "react";
import InfoCard from "../../components/InfoCard/InfoCard.jsx";
import InfoTablas from "../../components/InfoTablas/InfoTablas.jsx";

import {
    FileWarningIcon,
    Tractor,
    Sprout,
    SprayCan,
    BarChart3,
    FileDown,
    ChevronUp,
    ChevronDown
} from "lucide-react";

const Home = () => {
    const [mostrarTablas, setMostrarTablas] = useState(false);

    if (mostrarTablas) {
        return (
            <>
                <div className="p-4">
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-l flex gap-2">
                            <FileWarningIcon className="text-2xl" />
                            El archivo (.xlsx) que se importe deberá tener una estructura como la siguiente:
                        </h1>
                        <button
                            onClick={() => setMostrarTablas(!mostrarTablas)}
                            className="bg-[#036935] hover:bg-[#024c27] text-white px-6 py-1 rounded-full text-lg shadow-md transition duration-300 ml-4"
                        >
                            {mostrarTablas ? (<> Ocultar  <ChevronUp className="inline-block mr-2" /> </>) : (<> Ver Ejemplo <ChevronDown className="inline-block ml-2" /></>)}
                        </button>
                    </div>
                </div>

                <div className=" mx-auto w-full max-w-6xl border-lightgray-100 p-4 rounded-xl shadow-lg bg-[#eeeeee] space-y-8">

                    <h2 className="text-2xl font-bold mb-4 text-center">Ejemplo de Estructura de Datos</h2>
                    <p className="text-gray-700 mb-4">
                        A continuación se muestra un ejemplo de las tablas que puedes importar para calcular los costos agrícolas.
                        Cada tabla corresponde a una hoja de cálculo en el archivo Excel que debes subir.
                    </p>
                    <p>
                        Asegúrese de que los datos estén organizados de acuerdo a este formato y que las columnas y nombre de las tablas coincidan con los ejemplos.
                        Solo se admiten números enteros o decimales y las unidades deben ser <strong>kg</strong> o <strong>lt</strong>.
                        De lo contrario, el sistema no podrá procesar los datos correctamente.
                    </p>

                    <InfoTablas
                        title="tractores"
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
                            [1, "Tractor 1", 60775, 0.00007, 12000, 20, 60],
                            [2, "Tractor 2", 82875, 0.00005, 12000, 20, 60],
                        ]}
                    />


                    <InfoTablas
                        title="implementos"
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
                            [1, "Acoplado Metálico", 25000, 0.0004, 10000, 10, 0.10],
                            [2, "Aporcador", 30000, 0.00025, 4000, 10, 0.12],
                        ]}
                    />

                    <InfoTablas
                        title="fertilizantes"
                        headers={[
                            "numero",
                            "nombre",
                            "precioEnvaseDolar",
                            "volumenEnvase",
                            "unidadVolumenEnvase",
                            "dosisAplicación",
                            "unidadDosisAplicación",
                        ]}
                        data={[
                            [1, "ÁCIDO BÓRICO", 2.46, 1, "lt", 1, "lt"],
                            [2, "ÁCIDO FOSFÓRICO", 8.01, 1, "kg", 1, "kg"],
                        ]}
                    />

                    <InfoTablas
                        title="satirizantes"
                        headers={[
                            "numero",
                            "nombre",
                            "precioDolar",
                            "volumenEnvase",
                            "unidadVolumenEnvase",
                            "dosisAplicación",
                            "unidadDosisAplicación",
                            "tipo",
                        ]}
                        data={[
                            [1, "ABAMECTINA/AVERMECTINA", 186, 1, "kg", 1, "kg", "plaguicida"],
                            [2, "CARBENDAZIM", 195, 20, "lt", 1, "lt", "fungicida"],
                        ]}
                    />

                    <InfoTablas
                        title="estadosFonológicos"
                        headers={["numero", "nombre", "descripción"]}
                        data={[
                            [1, "Inicio Floración", "Fin de septiembre a octubre - Primeras flores abiertas"],
                            [2, "Plena Floración", "Mediados de octubre - Más del 70% de flores abiertas"],
                        ]}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-l flex gap-2">
                        <FileWarningIcon className="text-2xl" />
                        El archivo (.xlsx) que se importe deberá tener una estructura como la siguiente:
                    </h1>
                    <button
                        onClick={() => setMostrarTablas(!mostrarTablas)}
                        className="bg-[#036935] hover:bg-[#024c27] text-white px-6 py-1 rounded-full text-lg shadow-md transition duration-300 ml-4"
                    >
                        {mostrarTablas ? (<> Ocultar  <ChevronUp className="inline-block mr-2" /> </>) : (<> Ver Ejemplo <ChevronDown className="inline-block ml-2" /></>)}
                    </button>
                </div>

                    <div className="min-h-full flex flex-col mt-10 items-center">
                        <div className="p-6 w-full">
                            <h1 className="text-2xl text-center font-bold mb-4">
                                Bienvenido a la Calculadora de Costos
                            </h1>
                            <div className="text-gray-700 space-y-6">
                                <div className="text-gray-800 w-full max-w-6xl mx-auto px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        
                                        <InfoCard
                                            icon={<Tractor className="w-5 h-5 "/>}
                                            title="Calcular costos de maquinaria"
                                        >
                                            <li className="">Seleccionar un tractor y un implemento</li>
                                            <li>
                                                <span className="text-gray-900 font-semibold">Calcular:</span>
                                                <ul className="ml-8 list-[circle] space-y-0.5 text-gray-700">
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
                                            title="Calcular costos de sanitizante"
                                        >
                                            <li>Crear un plan fitosanitario anual compuesto por varios tratamientos</li>
                                            <li>
                                                <span className="text-gray-900 font-semibold">En cada tratamiento especificar:</span>
                                                <ul className="ml-8 list-[circle] space-y-0.5">
                                                    <li>Productos sanitizantes</li>
                                                    <li>Dosis por hectárea y volumen de aplicación</li>
                                                </ul>
                                            </li>

                                            <li><span className="text-gray-900 font-semibold">Calcular:</span>
                                               <ul className="ml-8 list-[circle] space-y-0.5">
                                                    <li>Costo por tratamiento</li>
                                                    <li>Costo total del plan</li>
                                                    <li>Comparación entre planes</li>
                                                </ul>
                                            </li>
 
                                            <li>Usa el valor actual del dólar</li>

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
                                            <li>Descargar en Excel los resultados y análisis realizados</li>
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
            </div>
        </>
    );
};


export default Home;
