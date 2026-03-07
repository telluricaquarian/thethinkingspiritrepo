"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useCallback, useState } from "react";

export interface GlobeMarker {
  lat: number;
  lng: number;
  label?: string;
  country?: string;
  officeType?: string;
}

interface GlobeProps {
  className?: string;
  size?: number;
  dotColor?: string;
  arcColor?: string;
  markerColor?: string;
  autoRotateSpeed?: number;
  connections?: { from: [number, number]; to: [number, number] }[];
  markers?: GlobeMarker[];
  activeMarkerIndex?: number | null;
  onActiveMarkerChange?: (idx: number | null) => void;
}

export const ENAGIC_MARKERS: GlobeMarker[] = [
  { lat: -33.7816, lng: 151.1183, label: "Macquarie Park (Sydney)", country: "Australia", officeType: "Regional office" },
  { lat: 33.8358,  lng: -118.3406, label: "Torrance, California",    country: "United States", officeType: "Los Angeles HQ" },
  { lat: 42.0664,  lng: -87.9373,  label: "Mount Prospect, Illinois", country: "United States", officeType: "Chicago office" },
  { lat: 28.5383,  lng: -81.3792,  label: "Orlando, Florida",         country: "United States", officeType: "Regional office" },
  { lat: 40.7644,  lng: -73.9235,  label: "Astoria, New York",        country: "United States", officeType: "New York office" },
  { lat: 47.8209,  lng: -122.3151, label: "Lynnwood, Washington",     country: "United States", officeType: "Seattle area office" },
  { lat: 32.9126,  lng: -96.6389,  label: "Garland, Texas",           country: "United States", officeType: "Dallas region office" },
  { lat: 21.3069,  lng: -157.8583, label: "Honolulu, Hawaii",         country: "United States", officeType: "Hawaii office" },
  { lat: 43.5890,  lng: -79.6441,  label: "Mississauga, Ontario",     country: "Canada", officeType: "Toronto office" },
  { lat: 49.2488,  lng: -122.9805, label: "Burnaby, British Columbia", country: "Canada", officeType: "Vancouver office" },
  { lat: 25.6573,  lng: -100.4027, label: "San Pedro Garza García",   country: "Mexico", officeType: "Monterrey region office" },
  { lat: -23.5015, lng: -47.4526,  label: "Sorocaba, São Paulo",      country: "Brazil", officeType: "Regional office" },
  { lat: 48.8566,  lng: 2.3522,    label: "Paris",                    country: "France", officeType: "Regional office" },
  { lat: 51.2277,  lng: 6.7735,    label: "Düsseldorf",               country: "Germany", officeType: "European office" },
  { lat: 41.9028,  lng: 12.4964,   label: "Rome",                     country: "Italy", officeType: "Regional office" },
  { lat: 41.1579,  lng: -8.6291,   label: "Porto",                    country: "Portugal", officeType: "Training center" },
  { lat: 45.6427,  lng: 25.5887,   label: "Brașov",                   country: "Romania", officeType: "Regional office" },
  { lat: 55.7558,  lng: 37.6173,   label: "Moscow",                   country: "Russia", officeType: "Regional office" },
  { lat: 26.2124,  lng: 127.6809,  label: "Naha, Okinawa",            country: "Japan", officeType: "HQ" },
  { lat: 35.6762,  lng: 139.6503,  label: "Tokyo",                    country: "Japan", officeType: "Office" },
  { lat: 34.6937,  lng: 135.5023,  label: "Osaka",                    country: "Japan", officeType: "Office" },
  { lat: 43.0618,  lng: 141.3545,  label: "Sapporo",                  country: "Japan", officeType: "Office" },
  { lat: 33.5902,  lng: 130.4017,  label: "Fukuoka",                  country: "Japan", officeType: "Showroom" },
  { lat: 22.2963,  lng: 114.1722,  label: "Tsim Sha Tsui, Kowloon",   country: "Hong Kong", officeType: "Regional office" },
  { lat: 12.9716,  lng: 77.5946,   label: "Bangalore",                country: "India", officeType: "Regional office" },
  { lat: -6.2088,  lng: 106.8456,  label: "Jakarta",                  country: "Indonesia", officeType: "Regional office" },
  { lat: 37.5665,  lng: 126.9780,  label: "Seoul",                    country: "South Korea", officeType: "Regional office" },
  { lat: 3.1390,   lng: 101.6869,  label: "Kuala Lumpur",             country: "Malaysia", officeType: "Regional office" },
  { lat: 1.3521,   lng: 103.8198,  label: "Singapore",                country: "Singapore", officeType: "Peninsula Plaza office" },
  { lat: 25.0330,  lng: 121.5654,  label: "Taipei",                   country: "Taiwan", officeType: "Regional office" },
  { lat: 13.7563,  lng: 100.5018,  label: "Bangkok",                  country: "Thailand", officeType: "Regional office" },
  { lat: 14.5176,  lng: 121.0509,  label: "Taguig City",              country: "Philippines", officeType: "Metro Manila office" },
  { lat: 47.8864,  lng: 106.9057,  label: "Ulaanbaatar",              country: "Mongolia", officeType: "Regional office" },
];

export const ENAGIC_CONNECTIONS: { from: [number, number]; to: [number, number] }[] = [
  { from: [26.2124, 127.6809],  to: [35.6762, 139.6503] },   // Naha → Tokyo
  { from: [35.6762, 139.6503],  to: [37.5665, 126.9780] },   // Tokyo → Seoul
  { from: [35.6762, 139.6503],  to: [21.3069, -157.8583] },  // Tokyo → Honolulu
  { from: [21.3069, -157.8583], to: [33.8358, -118.3406] },  // Honolulu → Torrance
  { from: [33.8358, -118.3406], to: [49.2488, -122.9805] },  // Torrance → Burnaby
  { from: [33.8358, -118.3406], to: [40.7644, -73.9235] },   // Torrance → Astoria
  { from: [33.8358, -118.3406], to: [32.9126, -96.6389] },   // Torrance → Garland
  { from: [32.9126, -96.6389],  to: [25.6573, -100.4027] },  // Garland → San Pedro
  { from: [35.6762, 139.6503],  to: [22.2963, 114.1722] },   // Tokyo → Hong Kong
  { from: [35.6762, 139.6503],  to: [1.3521, 103.8198] },    // Tokyo → Singapore
  { from: [1.3521, 103.8198],   to: [-6.2088, 106.8456] },   // Singapore → Jakarta
  { from: [1.3521, 103.8198],   to: [13.7563, 100.5018] },   // Singapore → Bangkok
  { from: [22.2963, 114.1722],  to: [25.0330, 121.5654] },   // Hong Kong → Taipei
  { from: [55.7558, 37.6173],   to: [51.2277, 6.7735] },     // Moscow → Düsseldorf
  { from: [51.2277, 6.7735],    to: [48.8566, 2.3522] },     // Düsseldorf → Paris
  { from: [26.2124, 127.6809],  to: [-33.7816, 151.1183] },  // Naha → Sydney
];

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number): [number, number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

export function Component({
  className,
  size = 600,
  dotColor = "rgba(20,20,20, ALPHA)",
  arcColor = "rgba(20,20,20,0.35)",
  markerColor = "rgba(0,0,0,1)",
  autoRotateSpeed = 0.002,
  connections = ENAGIC_CONNECTIONS,
  markers = ENAGIC_MARKERS,
  activeMarkerIndex,
  onActiveMarkerChange,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.4);
  const rotXRef = useRef(0.3);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotY: 0,
    startRotX: 0,
  });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const dotsRef = useRef<[number, number, number][]>([]);
  const markerScreenPositionsRef = useRef<{ sx: number; sy: number; visible: boolean }[]>([]);
  const activeMarkerRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipMarkerIdx, setTooltipMarkerIdx] = useState<number | null>(null);

  // Sync external activeMarkerIndex prop into refs/state
  useEffect(() => {
    const idx = activeMarkerIndex ?? null;
    activeMarkerRef.current = idx;
    setTooltipMarkerIdx(idx);
  }, [activeMarkerIndex]);

  // Size the screen positions array whenever markers change
  useEffect(() => {
    markerScreenPositionsRef.current = markers.map(() => ({ sx: 0, sy: 0, visible: false }));
  }, [markers]);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1200;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      dots.push([x, y, z]);
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const fov = 600;

    if (!dragRef.current.active) {
      rotYRef.current += autoRotateSpeed;
    }

    timeRef.current += 0.015;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.5);
    glowGrad.addColorStop(0, "rgba(0,0,0,0.05)");
    glowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(100, 180, 255, 0.06)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    for (let i = 0; i < dotsRef.current.length; i++) {
      let [x, y, z] = dotsRef.current[i];
      x *= radius;
      y *= radius;
      z *= radius;

      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      if (z > 0) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
      const dotSize = 1 + depthAlpha * 0.8;

      ctx.beginPath();
      ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
      ctx.fill();
    }

    for (const conn of connections) {
      const [lat1, lng1] = conn.from;
      const [lat2, lng2] = conn.to;

      let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
      let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);

      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
      const arcHeight = radius * 1.25;
      const elevX = (midX / midLen) * arcHeight;
      const elevY = (midY / midLen) * arcHeight;
      const elevZ = (midZ / midLen) * arcHeight;
      const [scx, scy] = project(elevX, elevY, elevZ, cx, cy, fov);

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = arcColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
      const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
      const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;

      ctx.beginPath();
      ctx.arc(tx, ty, 2, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
    }

    // Ensure positions array is sized
    if (markerScreenPositionsRef.current.length !== markers.length) {
      markerScreenPositionsRef.current = markers.map(() => ({ sx: 0, sy: 0, visible: false }));
    }

    for (let mi = 0; mi < markers.length; mi++) {
      const marker = markers[mi];
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);

      const visible = z <= radius * 0.1;
      if (!visible) {
        markerScreenPositionsRef.current[mi] = { sx: 0, sy: 0, visible: false };
        continue;
      }

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      markerScreenPositionsRef.current[mi] = { sx, sy, visible: true };

      const isActive = mi === activeMarkerRef.current;
      const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;

      // Outer pulse ring
      ctx.beginPath();
      ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = markerColor.replace("1)", `${0.2 + pulse * 0.15})`);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Active highlight ring
      if (isActive) {
        ctx.beginPath();
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.strokeStyle = markerColor.replace("1)", "0.7)");
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(sx, sy, isActive ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = markerColor;
      ctx.fill();
    }

    // Update tooltip position via direct DOM manipulation (no re-render)
    if (tooltipRef.current) {
      const activeIdx = activeMarkerRef.current;
      if (activeIdx !== null && activeIdx >= 0 && markerScreenPositionsRef.current[activeIdx]?.visible) {
        const pos = markerScreenPositionsRef.current[activeIdx];
        const tooltipX = Math.min(pos.sx + 14, w - 170);
        const tooltipY = Math.max(pos.sy - 52, 8);
        tooltipRef.current.style.left = `${tooltipX}px`;
        tooltipRef.current.style.top = `${tooltipY}px`;
        tooltipRef.current.style.visibility = "visible";
      } else {
        tooltipRef.current.style.visibility = "hidden";
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const findNearestMarker = useCallback((clientX: number, clientY: number, threshold = 14): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    let closest: number | null = null;
    let closestDist = threshold;
    for (let i = 0; i < markerScreenPositionsRef.current.length; i++) {
      const pos = markerScreenPositionsRef.current[i];
      if (!pos.visible) continue;
      const d = Math.hypot(pos.sx - px, pos.sy - py);
      if (d < closestDist) { closestDist = d; closest = i; }
    }
    return closest;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: rotYRef.current,
      startRotX: rotXRef.current,
    };
    e.currentTarget.setPointerCapture(e.pointerId);

    // Tap-to-activate marker
    const closest = findNearestMarker(e.clientX, e.clientY, 16);
    if (closest !== null) {
      activeMarkerRef.current = closest;
      setTooltipMarkerIdx(closest);
      onActiveMarkerChange?.(closest);
    }
  }, [findNearestMarker, onActiveMarkerChange]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragRef.current.active) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      rotYRef.current = dragRef.current.startRotY + dx * 0.005;
      rotXRef.current = Math.max(-1, Math.min(1, dragRef.current.startRotX + dy * 0.005));
      return;
    }
    // Hover detection
    const closest = findNearestMarker(e.clientX, e.clientY, 14);
    if (closest !== activeMarkerRef.current) {
      activeMarkerRef.current = closest;
      setTooltipMarkerIdx(closest);
      onActiveMarkerChange?.(closest);
    }
  }, [findNearestMarker, onActiveMarkerChange]);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  const onPointerLeave = useCallback(() => {
    activeMarkerRef.current = null;
    setTooltipMarkerIdx(null);
    onActiveMarkerChange?.(null);
  }, [onActiveMarkerChange]);

  const activeMarkerData = tooltipMarkerIdx !== null ? markers[tooltipMarkerIdx] : null;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      />
      {/* HTML tooltip overlay — position updated each frame via tooltipRef */}
      <div
        ref={tooltipRef}
        className="absolute z-10 pointer-events-none select-none"
        style={{ visibility: "hidden", top: 0, left: 0 }}
      >
        <div className="bg-white border border-neutral-200 shadow-sm rounded px-2.5 py-1.5" style={{ minWidth: 148 }}>
          {activeMarkerData && (
            <>
              <p className="text-[11px] font-semibold text-black leading-snug">{activeMarkerData.label}</p>
              {activeMarkerData.country && (
                <p className="text-[10px] text-neutral-500 leading-snug">{activeMarkerData.country}</p>
              )}
              {activeMarkerData.officeType && (
                <p className="text-[10px] text-neutral-400 leading-snug">{activeMarkerData.officeType}</p>
              )}
              <p className="text-[9px] font-mono text-neutral-400 mt-0.5 leading-snug">
                {activeMarkerData.lat.toFixed(4)}, {activeMarkerData.lng.toFixed(4)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
