export default function TitleInput({
  title = "Title",
  className,
  onChange,
  value = "",
}: {
  title?: string;
  className: string;
  onChange: (e: string) => void;
  value?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor="title">{title}</label>
      <input
        type="text"
        id="title"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
