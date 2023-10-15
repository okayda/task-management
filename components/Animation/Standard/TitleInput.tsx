export default function TitleInput({
  className,
  onChange,
  value = "",
}: {
  className: string;
  onChange: (e: string) => void;
  value?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      />
    </div>
  );
}
