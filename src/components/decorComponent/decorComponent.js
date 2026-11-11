import React from "react";
import "./decorComponent.css";

// Deterministic pseudo-random numbers so the confetti sits in the same
// place on every render.
const rng = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const COLOURS = ["ink", "red", "gold"];
const SHAPES = ["dot", "square", "triangle", "streak"];

const pieces = (() => {
  const rand = rng(1911);
  return Array.from({ length: 70 }, (_, i) => {
    // Bias towards the left and right edges so text stays readable.
    const edge = Math.pow(rand(), 1.8) * 34;
    return {
      id: i,
      // Pieces that reach into the text column are faded back.
      faded: edge > 9,
      left: i % 2 ? edge : 100 - edge,
      top: rand() * 100,
      size: 6 + rand() * 9,
      rotate: Math.round(rand() * 360),
      colour: COLOURS[Math.floor(rand() * COLOURS.length)],
      shape: SHAPES[Math.floor(rand() * SHAPES.length)],
    };
  });
})();

const Streamer = ({ side }) => (
  <svg
    className={`streamer streamer-${side}`}
    viewBox="0 0 120 420"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`ribbon-${side}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d2161e" />
        <stop offset="0.3" stopColor="#f2b01e" />
        <stop offset="0.55" stopColor="#17130f" />
        <stop offset="0.8" stopColor="#d2161e" />
        <stop offset="1" stopColor="#f2b01e" />
      </linearGradient>
    </defs>
    <path
      d="M70 -10 C120 40 10 70 55 120 S115 190 55 235 S20 310 70 345 S95 400 60 430"
      fill="none"
      stroke={`url(#ribbon-${side})`}
      strokeWidth="13"
      strokeLinecap="round"
    />
    <path
      d="M25 -10 C-10 50 80 80 40 140 S-5 210 35 260"
      fill="none"
      stroke="#f2b01e"
      strokeWidth="9"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const DecorComponent = () => (
  <div className="decor" aria-hidden="true">
    <Streamer side="left" />
    <Streamer side="right" />
    {pieces.map((p) => (
      <span
        key={p.id}
        className={`confetti confetti-${p.shape} confetti-${p.colour} ${p.faded ? "confetti-faded" : ""}`}
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: p.size,
          height: p.shape === "streak" ? p.size * 0.35 : p.size,
          transform: `rotate(${p.rotate}deg)`,
        }}
      />
    ))}
  </div>
);

export default DecorComponent;
