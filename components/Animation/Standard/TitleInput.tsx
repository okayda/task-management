export default function TitleInput({
  title = "Title",
  className,
  onChange,
  value = "",
  disabled,
}: {
  title?: string;
  className: string;
  onChange?: (e: string) => void;
  value?: string;
  disabled?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor="title">{title}</label>
      <input
        type="text"
        id="title"
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
