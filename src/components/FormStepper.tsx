
import { useFormContext } from "@/context/FormContext";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, label: "Cell" },
  { id: 1, label: "Subscriber" },
  { id: 2, label: "User Plane" },
  { id: 3, label: "Traffic" },
  { id: 4, label: "Mobility" },
  { id: 5, label: "Settings" },
];

const FormStepper = () => {
  const { currentStep, setCurrentStep } = useFormContext();

  return (
    <div className="flex justify-center items-center w-full my-6">
      <div className="flex w-full max-w-4xl mx-auto relative">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex-1 relative">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={cn(
                  "w-full py-3 px-6 rounded-full text-center font-medium focus:outline-none transition-all",
                  isActive 
                    ? "bg-orange-500 text-white" 
                    : isCompleted
                      ? "bg-slate-600 text-white"
                      : "bg-white text-slate-700 border border-slate-300"
                )}
              >
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2",
                    isCompleted || (index === currentStep - 1) ? "bg-slate-600" : "bg-slate-300"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepper;
