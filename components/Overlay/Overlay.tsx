import "./Overlay.scss";

export default function Overlay({ onClose }: { onClose: () => void }) {
  return <div className="overlay" onClick={onClose} />;
}
