import React, { useEffect, useRef } from "react";
import { assetsReady, drawMedal } from "../../utils/shareCard";

// One medal, drawn at the given width. locked = not collected yet.
const MedalCanvas = ({ orden, size = 150, locked = false }) => {
  const ref = useRef(null);
  const height = Math.round(size * 1.52);

  useEffect(() => {
    let cancelled = false;
    assetsReady().then(() => {
      const canvas = ref.current;
      if (cancelled || !canvas) return;
      const scale = window.devicePixelRatio || 1;
      canvas.width = size * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      const r = size * 0.45;
      drawMedal(ctx, size / 2, height - r - 3, r, { ...orden, locked });
    });
    return () => {
      cancelled = true;
    };
  }, [orden.id, orden.name, orden.mark, size, height, locked]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={ref}
      className="medal-canvas"
      style={{ width: size, height }}
      role="img"
      aria-label={orden.name}
    />
  );
};

export default MedalCanvas;
