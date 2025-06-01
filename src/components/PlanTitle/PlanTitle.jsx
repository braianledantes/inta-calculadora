import { Clipboard } from "lucide-react";

export default function PlanTitle({ title }) {
  return (
    <h5 className="flex items-center gap-2 text-xl font-semibold bg-gray-100 text-gray-800 rounded-full py-2 px-4  border border-gray-300">
      {/*<Clipboard className="w-5 h-5 text-gray-500" /> */}
      {title}
    </h5>
  );
}