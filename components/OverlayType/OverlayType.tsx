import "./OverlayType.scss";

import { OverlayFade } from "../Animation/Transition";

export const Overlay = function ({ onClose }: { onClose: () => void }) {
  return <div className="overlay" onClick={onClose} />;
};

export const WrappedOverlay = function ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <OverlayFade className="wrapped-overlay" onClick={onClick}>
      {children}
    </OverlayFade>
  );
};
