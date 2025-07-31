import { useState } from "react";

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white text-gray-900 placeholder-gray-400`}
        required={required}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
