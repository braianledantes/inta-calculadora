export default function DeleteButton({ onDelete }) {
  return (
    <button className="text-red-500 hover:text-red-700 text-lg hover:cursor-pointer" onClick={onDelete}>🗑️</button>
  )
}