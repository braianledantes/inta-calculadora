export default function AddPlanButton({text, onClick}) {
  return (
    <button className="block mx-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg"
            onClick={onClick}>
      ➕ {text}
    </button>
  );
}