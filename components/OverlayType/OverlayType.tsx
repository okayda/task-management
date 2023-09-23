import "./OverlayType.scss";

export const Overlay = function ({ onClose }: { onClose: () => void }) {
  return <div className="overlay" onClick={onClose} />;
};

export const WrappedOverlay = function ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="wrapped-overlay" onClick={onClose}>
      {children}
    </div>
  );
};
