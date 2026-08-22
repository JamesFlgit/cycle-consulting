"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  TEXTURE_W,
  TEXTURE_H,
  TEXTURE_REST,
  TEXTURE_NORTH_AMERICA,
  TEXTURE_EUROPE,
  TEXTURE_AFRICA,
} from "@/data/world-texture-paths";

// A rich, distinctly blue "ocean" — deliberately lighter/more saturated than the
// section's own bleu-nuit background so the sphere reads as its own object.
const OCEAN = "#101f47";
// Every landmass sits in near-black by default — only the selected continent
// breaks from it, so the eye goes straight to it.
const LAND_DEFAULT = "#0a0c14";
const SELECTED_FILL = "#dce8ff";
const SELECTED_GLOW = "rgba(255, 255, 255, 0.5)";
// The line + badge for whichever continent is selected always use this same
// dark blue, regardless of which one it is — only the globe's own shape/glow
// changes between continents. Exported so the carousel badges below the globe
// can match it exactly.
export const ACCENT = "#132bdd";
const FOCUS_EASE = 0.07;

export type ContinentKey = "na" | "eu" | "af";

export const REGIONS: { key: ContinentKey; label: string; location: [number, number] }[] = [
  { key: "eu", label: "Europe", location: [50, 10] },
  { key: "af", label: "Afrique", location: [5, 20] },
  { key: "na", label: "Amérique du Nord", location: [45, -100] },
];

const TEXTURE_BY_KEY: Record<ContinentKey, string> = {
  na: TEXTURE_NORTH_AMERICA,
  eu: TEXTURE_EUROPE,
  af: TEXTURE_AFRICA,
};

/** Bringing a given (lat, lon) to face the camera, dead-center, means rotating
 * the sphere by `lat` around X and `-π/2 - lon` around Y. Derived from three.js's
 * own SphereGeometry vertex formula (x = -R·sinθ·cosφ, y = R·cosθ, z = R·sinθ·sinφ,
 * θ = (90-lat)·π/180, φ = (lon+180)·π/180): solving the Y-rotation that zeroes the
 * rotated X component leaves y unchanged, then solving the X-rotation that zeroes
 * *that* reduces to a rotation exactly equal to the latitude itself. */
function targetRotationFor([lat, lon]: [number, number]) {
  return { x: (lat * Math.PI) / 180, y: -Math.PI / 2 - (lon * Math.PI) / 180 };
}

function buildTexture(activeKey: ContinentKey) {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_W;
  canvas.height = TEXTURE_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = OCEAN;
  ctx.fillRect(0, 0, TEXTURE_W, TEXTURE_H);

  // Flat fills only, no stroke, and each continent is a single unioned shape
  // (no per-country subdivisions) — so nothing reads as a patchwork of borders.
  const fillFlat = (d: string, fill: string) => {
    ctx.fillStyle = fill;
    ctx.fill(new Path2D(d), "evenodd");
  };

  fillFlat(TEXTURE_REST, LAND_DEFAULT);
  for (const region of REGIONS) {
    if (region.key === activeKey) continue;
    fillFlat(TEXTURE_BY_KEY[region.key], LAND_DEFAULT);
  }

  // The selected continent: a light fill with a soft, discreet glow around it.
  ctx.save();
  ctx.shadowColor = SELECTED_GLOW;
  ctx.shadowBlur = 14;
  ctx.fillStyle = SELECTED_FILL;
  ctx.fill(new Path2D(TEXTURE_BY_KEY[activeKey]), "evenodd");
  ctx.restore();

  return canvas;
}

export default function RotatingGlobe({ active }: { active: ContinentKey | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef(targetRotationFor(REGIONS[0].location));
  const activeKeyRef = useRef<ContinentKey>(REGIONS[0].key);
  const rebuildTextureRef = useRef<((key: ContinentKey) => void) | null>(null);

  useEffect(() => {
    const region = REGIONS.find((r) => r.key === active) ?? REGIONS[0];
    targetRotationRef.current = targetRotationFor(region.location);
    activeKeyRef.current = region.key;
    if (labelRef.current) labelRef.current.textContent = region.label;
    rebuildTextureRef.current?.(region.key);
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
    camera.position.z = 2.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const texture = new THREE.CanvasTexture(buildTexture(REGIONS[0].key));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    rebuildTextureRef.current = (key) => {
      texture.image = buildTexture(key);
      texture.needsUpdate = true;
    };

    const radius = 1;
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.rotation.x = targetRotationRef.current.x;
    sphere.rotation.y = targetRotationRef.current.y;
    scene.add(sphere);

    // An invisible marker, parented to the sphere so it inherits its rotation,
    // placed at the currently active region's surface point. Its projected
    // screen position drives the leader line + label overlay every frame.
    const marker = new THREE.Object3D();
    sphere.add(marker);
    const markerWorldPos = new THREE.Vector3();

    function placeMarker(location: [number, number]) {
      const [lat, lon] = location;
      const thetaP = ((90 - lat) * Math.PI) / 180;
      const phi = ((lon + 180) * Math.PI) / 180;
      const r = radius * 1.01;
      marker.position.set(-r * Math.sin(thetaP) * Math.cos(phi), r * Math.cos(thetaP), r * Math.sin(thetaP) * Math.sin(phi));
    }
    placeMarker(REGIONS[0].location);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // Drag-to-rotate: while the pointer is held and moving, spin the sphere
    // directly under the cursor instead of easing toward the carousel target.
    // The carousel keeps ticking in the background and simply resumes easing
    // toward its next target — from wherever the drag left off — once released.
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const MAX_TILT = Math.PI / 2 - 0.05;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const width = container.clientWidth || 1;
      sphere.rotation.y += (dx / width) * Math.PI * 1.4;
      sphere.rotation.x = Math.min(MAX_TILT, Math.max(-MAX_TILT, sphere.rotation.x + (dy / width) * Math.PI * 1.4));
      targetRotationRef.current = { x: sphere.rotation.x, y: sphere.rotation.y };
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      container.style.cursor = "grab";
      if (container.hasPointerCapture(e.pointerId)) container.releasePointerCapture(e.pointerId);
    };
    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    let placedFor: ContinentKey | null = null;
    let frame = 0;
    const animate = () => {
      const key = activeKeyRef.current;
      if (key !== placedFor) {
        const region = REGIONS.find((r) => r.key === key);
        if (region) placeMarker(region.location);
        placedFor = key;
      }

      if (!dragging) {
        const deltaX = targetRotationRef.current.x - sphere.rotation.x;
        let deltaY = targetRotationRef.current.y - sphere.rotation.y;
        deltaY = (((deltaY + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        sphere.rotation.x += deltaX * FOCUS_EASE;
        sphere.rotation.y += deltaY * FOCUS_EASE;
      }

      renderer.render(scene, camera);

      marker.getWorldPosition(markerWorldPos);
      const visible = markerWorldPos.z > -0.05;
      const projected = markerWorldPos.clone().project(camera);
      const x = (projected.x + 1) / 2;
      const y = (1 - projected.y) / 2;
      const dirX = x > 0.5 ? -1 : 1;
      const dirY = y > 0.5 ? -1 : 1;
      const labelX = Math.min(0.92, Math.max(0.08, x + dirX * 0.16));
      const labelY = Math.min(0.9, Math.max(0.1, y + dirY * 0.14));
      const opacity = visible ? 1 : 0;

      if (lineRef.current) {
        lineRef.current.setAttribute("x1", String(x * 100));
        lineRef.current.setAttribute("y1", String(y * 100));
        lineRef.current.setAttribute("x2", String(labelX * 100));
        lineRef.current.setAttribute("y2", String(labelY * 100));
        lineRef.current.style.opacity = String(opacity);
      }
      if (dotRef.current) {
        dotRef.current.setAttribute("cx", String(x * 100));
        dotRef.current.setAttribute("cy", String(y * 100));
        dotRef.current.style.opacity = String(opacity);
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${labelX * 100}%`;
        labelRef.current.style.top = `${labelY * 100}%`;
        labelRef.current.style.opacity = String(opacity);
      }

      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      rebuildTextureRef.current = null;
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="absolute inset-[-8%] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(126,240,255,0.9) 0%, transparent 65%)" }}
      />

      <div
        ref={containerRef}
        role="img"
        aria-label="Globe animé : présence en Amérique du Nord, Europe et Afrique"
        className="relative h-full w-full touch-none"
      />

      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
        <line ref={lineRef} stroke={ACCENT} strokeWidth={0.5} style={{ transition: "opacity 0.3s ease" }} />
        <circle ref={dotRef} r={1.4} fill={ACCENT} stroke="#fff" strokeOpacity={0.5} strokeWidth={0.3} style={{ transition: "opacity 0.3s ease" }} />
      </svg>

      <div
        ref={labelRef}
        className="pointer-events-none absolute max-w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-center text-xs font-semibold text-white sm:max-w-none sm:whitespace-nowrap sm:text-sm"
        style={{
          transition: "opacity 0.3s ease, left 0.05s linear, top 0.05s linear",
          borderColor: ACCENT,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
      >
        {REGIONS[0].label}
      </div>
    </div>
  );
}
