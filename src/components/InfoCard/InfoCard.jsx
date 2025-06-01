import React from "react";

const InfoCard = ({ icon, title, children }) => {
  return (
    <section className="shadow-lg rounded-xl p-4 bg-white">
      <header className="flex items-center gap-2 text-base font-semibold">
        {icon}
        {title}
      </header>
      <ul className="mt-2 text-sm space-y-1 list-disc list-inside text-gray-800">
        {children}
      </ul>
    </section>
  );
};

export default InfoCard;