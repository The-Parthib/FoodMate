import { useState } from "react";

const MedicalProblemsSelector = ({ value, onChange }) => {
  const [customProblem, setCustomProblem] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const commonProblems = [
    "None",
    "High Blood Pressure (BP)",
    "Diabetes (Sugar)",
    "High Cholesterol",
    "Heart Disease",
    "Thyroid",
    "Kidney Disease",
    "Liver Disease",
  ];

  const handleProblemChange = (problem) => {
    if (problem === "Other") {
      setShowCustomInput(true);
      return;
    }

    if (problem === "None") {
      onChange("None");
      setShowCustomInput(false);
      return;
    }

    // Handle multiple selections
    const currentProblems =
      value === "None" ? [] : value.split(", ").filter((p) => p);

    if (currentProblems.includes(problem)) {
      // Remove if already selected
      const updated = currentProblems.filter((p) => p !== problem);
      onChange(updated.length ? updated.join(", ") : "None");
    } else {
      // Add to selection
      const updated = [...currentProblems, problem];
      onChange(updated.join(", "));
    }
  };

  const handleCustomSubmit = () => {
    if (customProblem.trim()) {
      const currentProblems =
        value === "None" ? [] : value.split(", ").filter((p) => p);
      const updated = [...currentProblems, customProblem.trim()];
      onChange(updated.join(", "));
      setCustomProblem("");
      setShowCustomInput(false);
    }
  };

  const selectedProblems =
    value === "None" ? [] : value.split(", ").filter((p) => p);

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
        Medical Conditions
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-3 gap-1 mb-2">
        {commonProblems.map((problem) => (
          <button
            key={problem}
            type="button"
            onClick={() => handleProblemChange(problem)}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              problem === "None"
                ? value === "None"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                : selectedProblems.includes(problem)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {problem}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setShowCustomInput(true)}
          className="px-2 py-1 text-xs rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors"
        >
          + Custom
        </button>
      </div>

      {showCustomInput && (
        <div className="flex gap-1 mb-2">
          <input
            type="text"
            value={customProblem}
            onChange={(e) => setCustomProblem(e.target.value)}
            placeholder="Enter condition"
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleCustomSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomProblem("");
            }}
            className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {selectedProblems.length > 0 && (
        <div className="mt-1">
          <p className="text-xs text-gray-500 mb-1">Selected:</p>
          <div className="flex flex-wrap gap-1">
            {selectedProblems.map((problem, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {problem}
                <button
                  type="button"
                  onClick={() => handleProblemChange(problem)}
                  className="ml-1 text-blue-600 hover:text-blue-800 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalProblemsSelector;
