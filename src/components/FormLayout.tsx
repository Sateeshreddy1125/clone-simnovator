
import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormContext";

interface FormLayoutProps extends PropsWithChildren {
  title: string;
  sectionKey: string;
  onNext?: () => boolean;
  isLast?: boolean;
}

const FormLayout = ({
  children,
  title,
  sectionKey,
  onNext,
  isLast = false,
}: FormLayoutProps) => {
  const { currentStep, setCurrentStep, saveFormData, submitForm } = useFormContext();

  const handleNext = () => {
    if (onNext && !onNext()) {
      return; // Validation failed
    }
    
    saveFormData(sectionKey);
    
    if (!isLast) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      saveFormData(sectionKey);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="bg-[#E3EBE9] min-h-[600px] rounded-lg p-6 relative pb-24">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        
        {children}
        
        <div className="absolute bottom-6 right-6 flex space-x-4">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium px-8 py-2 rounded"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-2 rounded"
          >
            {isLast ? "Create" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
