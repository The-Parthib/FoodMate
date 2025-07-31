const SubmitButton = ({ onClick, isLoading = false, disabled = false }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-3 px-4 rounded font-semibold text-white transition-all duration-200 text-sm ${
        disabled || isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.99]"
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Generating Meal Plan...
        </div>
      ) : (
        "Generate Personalized Meal Plan"
      )}
    </button>
  );
};

export default SubmitButton;
