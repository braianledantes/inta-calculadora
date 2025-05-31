import {Mail, Phone} from "lucide-react";

const Footer = () => {
  const offices = [
    {
      title: "INTA CR Patagonia Norte",
      phone: "+54 (02944) 442 3241",
      address: "Santiago del Estero 46, (8300) Neuquén, Neuquén",
    },
    {
      title: "INTA EEA Bariloche",
      phone: "+54 (0294) 442 2731",
      email: "eeabariloche@inta.gob.ar",
      address: "Modesta Victoria 4450, (8500) Viedma, Río Negro",
    },
    {
      title: "INTA EEA Alto Valle",
      phone: "+54 (0298) 443 9000",
      address: "Ruta Nacional 22 Km 1190, (8332) Allen, Río Negro",
    },
    {
      title: "INTA EEA Valle Inferior",
      phone: "+54 (02920) 42 3474",
      address: "Ruta Nacional 3 Km 971 Camino 4 IDEVI, (8500) Viedma, Río Negro",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#2a3b4a] to-[#3d566c] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {offices.map((office, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold mb-2">{office.title}</h4>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {office.phone}
            </p>
            {office.email && (
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${office.email}`} className="underline">
                  {office.email}
                </a>
              </p>
            )}
            <p className="text-sm mt-2">{office.address}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 borsder-t border-white/20 pt-6 text-center text-sm text-gray-300 flex justify-center">
        <img src="../../../../Logos_INTAFooter.png" alt="" />
      </div>

      <div className="mt-10 borsder-t border-white/20 pt-6 text-center text-sm text-gray-300">
        <p>© 2025 INTA - Todos los derechos reservados</p>
        <p>Ministerio de Economía de Argentina</p>
      </div>

    </footer>
  );
};

export default Footer;