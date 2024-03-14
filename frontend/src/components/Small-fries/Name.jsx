
export function Name({ id, placeholder, onChange }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-1">
      <label for={id} className="text-lg font-semibold">{id}</label>
      <input onChange={onChange} className="border-2 rounded-lg border-gray-300 p-2" id={id} type="text" placeholder={placeholder} />
    </div>
  )
}
