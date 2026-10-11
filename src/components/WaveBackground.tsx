import { useEffect, useRef } from "react";

/** Integrating the decaying speed keeps the wave continuous as it slows. */
export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const styles = getComputedStyle(document.documentElement);
    // Match the palette and radial stops of the CSS background, including blue.
    const stops: [number, string][] = [
      [0, "--preto"], [0.52, "--preto"], [0.62, "--azul"],
      [0.70, "--roxo"], [0.77, "--magenta"], [0.83, "--rosa"],
      [0.88, "--terracota"], [0.92, "--laranja"],
      [0.95, "--laranja-claro"], [0.98, "--amarelo"], [1, "--amarelo-claro"],
    ];
    const colors = stops.map(([offset, name]) =>
      [offset, styles.getPropertyValue(name).trim()] as const);
    let width = 0;
    let height = 0;
    let frame = 0;
    const start = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      const time = motion.matches ? 10 : (now - start) / 1000;
      const phase = time * 0.075 + 4.5 * (1 - Math.exp(-time / 0.5));
      const settling = Math.exp(-time / 0.65);
      context.clearRect(0, 0, width, height);
      // Move the gradient itself with the ribbons so they form one background.
      const drift = motion.matches ? 0 : Math.sin(phase) * (0.006 + settling * 0.025);
      const centerX = width * (0.6 + drift);
      const centerY = height * (0.45 + drift * 0.4);
      const radiusX = Math.max(centerX, width - centerX) * Math.SQRT2;
      const radiusY = Math.max(centerY, height - centerY) * Math.SQRT2;
      context.save();
      context.translate(centerX, centerY);
      context.scale(radiusX, radiusY);
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
      colors.forEach(([offset, color]) => gradient.addColorStop(offset, color));
      context.fillStyle = gradient;
      context.fillRect(-centerX / radiusX, -centerY / radiusY, width / radiusX, height / radiusY);
      context.restore();

      for (let layer = 0; layer < 5; layer++) {
        const waveY = (x: number) => {
          const position = x / width;
          const edge = Math.pow(Math.abs(position - 0.6) * 1.6, 1.4);
          const amplitude = height * (0.025 + 0.035 * settling);
          return height * (0.95 - edge * 0.22 + layer * 0.016)
            + Math.sin(position * 5.5 + phase + layer * 0.5) * amplitude
            + Math.sin(position * 9 - phase * 0.7 + layer) * amplitude * 0.35;
        };
        context.beginPath();
        context.moveTo(0, waveY(0));
        for (let x = 8; x < width; x += 8) context.lineTo(x, waveY(x));
        context.lineTo(width, waveY(width));
        context.strokeStyle = gradient;
        context.lineWidth = layer === 0 ? 1.8 : 0.8;
        context.globalAlpha = (0.18 + 0.3 * settling) / (1 + layer * 0.3);
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.stroke();
        context.shadowBlur = 0;
        context.lineTo(width, height);
        context.lineTo(0, height);
        context.closePath();
        context.fillStyle = gradient;
        context.globalAlpha = 0.025 + 0.045 * settling;
        context.fill();
      }
      context.globalAlpha = 1;
      // The same darkening and upper-half mask as the static CSS fallback.
      context.fillStyle = "rgb(0 0 4 / 35%)";
      context.fillRect(0, 0, width, height);
      const mask = context.createLinearGradient(0, 0, 0, height);
      mask.addColorStop(0, colors[0][1]);
      mask.addColorStop(0.5, colors[0][1]);
      mask.addColorStop(0.75, "rgb(0 0 4 / 0%)");
      mask.addColorStop(1, "rgb(0 0 4 / 0%)");
      context.fillStyle = mask;
      context.fillRect(0, 0, width, height);
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      draw(performance.now());
    };
    const onResize = () => { resize(); restart(); };
    resize();
    restart();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, []);

  return <canvas ref={canvasRef} className="wave-canvas" aria-hidden="true" />;
}
