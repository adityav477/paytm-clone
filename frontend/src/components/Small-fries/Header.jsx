
export function Header({ title, subheading }) {
  return (
    <div className="flex flex-col justify-center gap-4 items-center w-72 mt-7 mb-3 mx-7">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-lg font-semibold text-gray-400 w-300 text-center">{subheading}</p>
    </div>
  )
}
