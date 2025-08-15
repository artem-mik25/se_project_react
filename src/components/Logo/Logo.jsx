// src/components/Logo/Logo.jsx
export default function Logo({ size = 28 }) {
  return (
    <div
      aria-label="WTWR"
      title="WTWR"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: 700,
        fontSize: 18,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M6 3h12l2 6-8 12L4 9l2-6z"
          fill="currentColor"
          opacity="0.15"
        />
        <path
          d="M7 4h10l1.5 4.5L12 19 5.5 8.5 7 4z"
          fill="currentColor"
        />
      </svg>
      <span>WTWR</span>
    </div>
  );
}
