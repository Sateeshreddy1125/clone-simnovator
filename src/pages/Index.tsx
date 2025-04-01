
import FormStepper from "@/components/FormStepper";
import { useFormContext } from "@/context/FormContext";
import CellSection from "@/components/sections/CellSection";
import SubscriberSection from "@/components/sections/SubscriberSection";
import UserPlaneSection from "@/components/sections/UserPlaneSection";
import TrafficSection from "@/components/sections/TrafficSection";
import MobilitySection from "@/components/sections/MobilitySection";
import SettingsSection from "@/components/sections/SettingsSection";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { currentStep } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CellSection />;
      case 1:
        return <SubscriberSection />;
      case 2:
        return <UserPlaneSection />;
      case 3:
        return <TrafficSection />;
      case 4:
        return <MobilitySection />;
      case 5:
        return <SettingsSection />;
      default:
        return <CellSection />;
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("networkScenarioData");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#E3EBE9]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Test Case List / Create Test Case</h1>
          <Button 
            onClick={handleClearLocalStorage}
            variant="ghost" 
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FormStepper />
        {renderStep()}
      </main>
    </div>
  );
};

export default Index;
