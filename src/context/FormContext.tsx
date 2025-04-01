
import { createContext, useContext, useEffect, useState } from "react";
import { defaultFormData } from "@/config/defaultValues";
import { FormData } from "@/types";
import { toast } from "sonner";

interface FormContextProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  saveFormData: (section: string) => void;
  submitForm: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("networkScenarioData");
    return savedData ? JSON.parse(savedData) : defaultFormData;
  });

  const [currentStep, setCurrentStep] = useState<number>(formData.currentStep || 0);

  useEffect(() => {
    localStorage.setItem("networkScenarioData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const saveFormData = (section: string) => {
    localStorage.setItem("networkScenarioData", JSON.stringify(formData));
    console.log(`${section} data saved:`, formData[section as keyof FormData]);
    toast.success(`${section} data saved successfully!`);
  };

  const submitForm = () => {
    localStorage.setItem("networkScenarioData", JSON.stringify(formData));
    console.log("Full form data submitted:", formData);
    toast.success("Network scenario configuration created successfully!");
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        saveFormData,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
