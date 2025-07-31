const VegetarianSelector = ({ value, onChange }) => {
  const options = [
    { value: "yes", label: "Yes, I am vegetarian", icon: "🥬" },
    { value: "no", label: "No, I eat non-vegetarian food", icon: "🍖" },
  ];

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
        Dietary Preference
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center p-2 rounded border transition-all text-sm ${
              value === option.value
                ? "border-blue-500 bg-blue-50 text-blue-900"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg mr-2">{option.icon}</span>
            <span className="font-medium text-xs">{option.label}</span>
            {value === option.value && (
              <span className="ml-auto text-blue-500 text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VegetarianSelector;
