export function Option({ content, link, spanContent }) {
  return (
    <div className="flex justify-center">
      <p>{content} <a href={link} className="underline font-semibold">{spanContent}</a></p>
    </div>
  )
}
