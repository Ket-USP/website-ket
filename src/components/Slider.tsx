import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

export function Slider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ y: number; scroll: number } | null>(null);
  const [metrics, setMetrics] = useState({ height: 0, thumb: 0, progress: 0, maxScroll: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = trackRef.current?.clientHeight ?? 0;
      const viewport = document.documentElement.clientHeight;
      const total = document.documentElement.scrollHeight;
      const maxScroll = Math.max(0, total - viewport);
      setMetrics({
        height,
        thumb: Math.min(height, Math.max(44, height * viewport / total)),
        progress: maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0,
        maxScroll,
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const travel = metrics.height - metrics.thumb;
  const scrollTo = (top: number) => window.scrollTo({ top, behavior: "instant" });
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || !metrics.maxScroll) return;
    event.preventDefault();
    event.currentTarget.focus();
    if (event.target === event.currentTarget && travel > 0) {
      const y = event.clientY - event.currentTarget.getBoundingClientRect().top;
      scrollTo((y - metrics.thumb / 2) / travel * metrics.maxScroll);
    }
    dragRef.current = { y: event.clientY, scroll: window.scrollY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowDown: window.scrollY + 40,
      ArrowUp: window.scrollY - 40,
      PageDown: window.scrollY + window.innerHeight,
      PageUp: window.scrollY - window.innerHeight,
      Home: 0,
      End: metrics.maxScroll,
      " ": window.scrollY + window.innerHeight * (event.shiftKey ? -1 : 1),
    };
    if (event.key in targets) {
      event.preventDefault();
      scrollTo(targets[event.key]);
    }
  };

  return (
    <div
      ref={trackRef}
      className="page-scrollbar"
      role="scrollbar"
      aria-label="Rolagem da página"
      aria-controls="page-content"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(metrics.progress * 100)}
      tabIndex={metrics.maxScroll ? 0 : -1}
      style={{ visibility: metrics.maxScroll ? "visible" : "hidden" }}
      onKeyDown={onKeyDown}
      onPointerDown={startDrag}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (drag && travel > 0) {
          scrollTo(drag.scroll + (event.clientY - drag.y) / travel * metrics.maxScroll);
        }
      }}
      onPointerUp={() => { dragRef.current = null; }}
      onPointerCancel={() => { dragRef.current = null; }}
      onLostPointerCapture={() => { dragRef.current = null; }}
    >
      <div
        className="page-scrollbar-thumb"
        style={{ height: metrics.thumb, transform: `translateY(${metrics.progress * travel}px)` }}
      />
    </div>
  );
}
