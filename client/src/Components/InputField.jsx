import React from "react";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder
}) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 p-4 shadow-sm placeholder:text-gray-150 bg-white"
      />
    </div>
  );
}
