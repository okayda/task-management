export default function DescriptionInput({
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
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      ></textarea>
    </div>
  );
}
