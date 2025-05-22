import React, { useEffect, useRef } from "react";

interface Props {
  value: string;
}

const CaptchaCanvas: React.FC<Props> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas sozlash
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";

    // Raqam/harflarni chizish
    ctx.fillText(value, 10, 35);
  }, [value]);

  return <canvas ref={canvasRef} width={150} height={50} />;
};

export default CaptchaCanvas;
