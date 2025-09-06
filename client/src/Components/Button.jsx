import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-6 py-2 rounded-lg font-semibold";
  const style =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-white text-gray-800 border";

  return (
    <button className={`${base} ${style}`} {...props}>
      {children}
    </button>
  );
}
