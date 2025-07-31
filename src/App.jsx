import { useState } from "react";
import Header from "./components/Header";
import FormField from "./components/FormField";
import StateSelector from "./components/StateSelector";
import MedicalProblemsSelector from "./components/MedicalProblemsSelector";
import VegetarianSelector from "./components/VegetarianSelector";
import SubmitButton from "./components/SubmitButton";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    state: "",
    dailyBudget: "",
    medicalProblems: "None",
    vegetarian: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Please enter a valid age (1-120)";
    }

    if (!formData.state) {
      newErrors.state = "Please select your state";
    }

    if (!formData.dailyBudget || formData.dailyBudget < 50) {
      newErrors.dailyBudget = "Daily budget should be at least ₹50";
    }

    if (!formData.vegetarian) {
      newErrors.vegetarian = "Please select your dietary preference";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

    try {
      // Here you would integrate with Relay.app webhook
      const response = await fetch('https://hook.relay.app/api/v1/playbook/cmdr9hbx20m8v0nm4a2nj14kb/trigger/iHRJagnCGvBixvwL4mtDiQ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitMessage(
        "✅ Your personalized meal plan is being generated and will be sent to your email shortly!"
      );

      // Reset form after successful submission
      setFormData({
        fullName: "",
        age: "",
        state: "",
        dailyBudget: "",
        medicalProblems: "None",
        vegetarian: "",
        email: "",
      });
    } catch (error) {
      setSubmitMessage("❌ Something went wrong. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              All fields are required for accurate meal planning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Full Name"
              value={formData.fullName}
              onChange={(value) => updateFormData("fullName", value)}
              placeholder="Enter your full name"
              required
              error={errors.fullName}
            />

            <FormField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(value) => updateFormData("age", value)}
              placeholder="Enter your age"
              min="1"
              max="120"
              required
              error={errors.age}
            />

            <StateSelector
              value={formData.state}
              onChange={(value) => updateFormData("state", value)}
            />
            {errors.state && (
              <p className="text-xs text-red-600 -mt-3 mb-2">{errors.state}</p>
            )}

            <FormField
              label="Daily Budget for Meals (₹)"
              type="number"
              value={formData.dailyBudget}
              onChange={(value) => updateFormData("dailyBudget", value)}
              placeholder="Enter your daily meal budget in INR"
              min="50"
              required
              error={errors.dailyBudget}
            />

            <MedicalProblemsSelector
              value={formData.medicalProblems}
              onChange={(value) => updateFormData("medicalProblems", value)}
            />

            <VegetarianSelector
              value={formData.vegetarian}
              onChange={(value) => updateFormData("vegetarian", value)}
            />
            {errors.vegetarian && (
              <p className="text-xs text-red-600 -mt-3 mb-2">
                {errors.vegetarian}
              </p>
            )}

            <FormField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => updateFormData("email", value)}
              placeholder="Enter your email address"
              required
              error={errors.email}
            />

            <SubmitButton isLoading={isLoading} disabled={isLoading} />

            {submitMessage && (
              <div
                className={`p-3 rounded text-center text-sm ${
                  submitMessage.includes("✅")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          <p>
            🔒 Secure & Confidential | Data used only for meal plan generation
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
