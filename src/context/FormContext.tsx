
import { createContext, useContext, useState, useEffect } from 'react';
import { FormData, FormSectionData } from '@/types';

interface FormContextType {
  formData: FormData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateFormData: <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => void;
  saveFormData: (section: keyof FormData) => void;
  submitForm: () => void;
}

// Initial state for form data
const initialFormData: FormData = {
  cell: {
    ratType: "4G",
    mobility: "No",
    cells: [
      {
        id: "cell1",
        cellType: "4G",
        duplexMode: "FDD",
        band: "B1",
        dlEarfcn: "100",
        ulEarfcn: "18100",
      }
    ]
  },
  subscriber: {
    totalUEs: 1,
    ranges: [
      {
        id: "range1",
        numberOfUEs: 1,
        servingCell: "cell1",
        startingSUPI: "208930000000001",
        sharedKey: "00112233445566778899aabbccddeeff",
        mncDigits: "2",
      }
    ]
  },
  userPlane: {
    profileType: "Single",
    profiles: [
      {
        id: "profile1",
        subscriberRange: "range1",
        dataType: "IPERF",
        transportProtocol: "TCP",
        startingPort: "5000",
        apnName: "",
        startDelay: "5",
        duration: "600",
        dataDirection: "Both",
        dlBitrate: "150",
        dlBitrateUnit: "Mbps",
        ulBitrate: "50",
        ulBitrateUnit: "Mbps",
      }
    ]
  },
  traffic: {
    profileRange: "range1",
    attachType: "Bursty",
    attachRate: "10",
    attachDelay: "5",
    powerOnDuration: "600",
  },
  mobility: {
    ueGroup: "range1",
    tripType: "Bidirectional",
    delay: "10",
    duration: "600",
    waitTime: "5",
  },
  settings: {
    testCaseName: "",
    logSetting: "debug",
    successSettings: "new21",
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  // Try to load data from localStorage or use initial data
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('networkScenarioData');
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  });
  
  const [currentStep, setCurrentStep] = useState(0);

  // Update form data for a specific section
  const updateFormData = <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        ...data
      }
    }));
  };

  // Save current form section data to localStorage
  const saveFormData = (section: keyof FormData) => {
    localStorage.setItem('networkScenarioData', JSON.stringify(formData));
  };

  // Submit the full form
  const submitForm = () => {
    // Save all data to localStorage
    localStorage.setItem('networkScenarioData', JSON.stringify(formData));
    
    // For now, just show an alert with the data
    console.log('Form Submitted:', formData);
    alert('Test case created successfully!');
  };

  return (
    <FormContext.Provider value={{ formData, currentStep, setCurrentStep, updateFormData, saveFormData, submitForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
