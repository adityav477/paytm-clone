export function Button({ content, onClick }) {
  return (
    <div className="flex justify-center">
      <button onClick={onClick} className="bg-gray-800 text-white text-md hover:bg-gray-100 focus:outline-none focus:ring-red hover:text-black font-semibold text-bold w-full px-5 py-3 m-3 rounded-lg">{content}</button>
    </div>
  )
}
