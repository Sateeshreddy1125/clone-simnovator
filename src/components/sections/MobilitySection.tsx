
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField, SectionHeader } from "@/components/ui/form-components";
import { tripTypeOptions } from "@/config/defaultValues";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const MobilitySection = () => {
  const { formData, updateFormData } = useFormContext();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const mobilityData = formData.mobility;
  
  // Only show mobility section if it's enabled in Cell section
  if (formData.cell.mobility === "No") {
    return (
      <FormLayout title="Mobility Configuration" sectionKey="mobility" onNext={() => true}>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">Mobility is disabled</h2>
          <p className="text-gray-600">
            Mobility is currently disabled in the Cell configuration. 
            Go back to the Cell section and set Mobility to "Yes" to configure mobility settings.
          </p>
        </div>
      </FormLayout>
    );
  }
  
  // Create range options from subscriber data
  const rangeOptions = formData.subscriber.ranges.map(range => ({
    label: `Range #${range.id.replace("range", "")}`,
    value: range.id
  }));
  
  // Add "Apply to All" option
  rangeOptions.unshift({ label: "Apply to All", value: "Apply to All" });

  const handleUeGroupChange = (value: string) => {
    updateFormData("mobility", { ueGroup: value });
  };

  const handleTripTypeChange = (value: string) => {
    updateFormData("mobility", { tripType: value });
  };

  const handleInputChange = (field: keyof typeof mobilityData, value: string) => {
    updateFormData("mobility", { [field]: value });
  };

  const validateForm = () => {
    // Check required fields
    if (
      !mobilityData.ueGroup ||
      !mobilityData.tripType ||
      !mobilityData.delay ||
      !mobilityData.duration
    ) {
      return false;
    }
    
    return true;
  };

  return (
    <FormLayout title="Mobility Configuration" sectionKey="mobility" onNext={validateForm}>
      <div className="space-y-6">
        <SectionHeader title="MP #1" className="mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="UE Group"
            id="ueGroup"
            value={mobilityData.ueGroup}
            onChange={handleUeGroupChange}
            options={rangeOptions}
            required
            tooltip="Select UE group to apply mobility"
          />
          
          <SelectField
            label="Trip Type"
            id="tripType"
            value={mobilityData.tripType}
            onChange={handleTripTypeChange}
            options={tripTypeOptions}
            required
            tooltip="Select the type of movement pattern"
          />
          
          <div className="flex items-center justify-end mt-5">
            <Label htmlFor="advanced-settings" className="mr-2">Advanced Settings</Label>
            <Switch
              id="advanced-settings"
              checked={showAdvancedSettings}
              onCheckedChange={setShowAdvancedSettings}
            />
          </div>
          
          <InputField
            label="Delay (sec)"
            id="delay"
            value={mobilityData.delay}
            onChange={(value) => handleInputChange("delay", value)}
            type="number"
            required
            tooltip="Initial delay before movement"
          />
          
          <InputField
            label="Duration (sec)"
            id="duration"
            value={mobilityData.duration}
            onChange={(value) => handleInputChange("duration", value)}
            type="number"
            required
            tooltip="Total mobility duration"
          />
          
          <InputField
            label="Wait Time (sec)"
            id="waitTime"
            value={mobilityData.waitTime}
            onChange={(value) => handleInputChange("waitTime", value)}
            type="number"
            tooltip="Wait time between movements"
          />
        </div>
        
        {showAdvancedSettings && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-md">
            <InputField
              label="Speed (km/hr)"
              id="speed"
              value="10"
              onChange={() => {}}
              type="number"
            />
            
            <InputField
              label="Direction (degrees)"
              id="direction"
              value="30"
              onChange={() => {}}
              type="number"
            />
            
            <InputField
              label="Distance (mtrs)"
              id="distance"
              value="50"
              onChange={() => {}}
              type="number"
            />
            
            <SelectField
              label="Fading Type"
              id="fadingType"
              value="AWGN"
              onChange={() => {}}
              options={[
                { label: "AWGN", value: "AWGN" },
                { label: "Rayleigh", value: "Rayleigh" },
                { label: "Rician", value: "Rician" },
              ]}
            />
            
            <InputField
              label="Noise Spectral Density (dBm/Hz)"
              id="noiseSpectralDensity"
              value="-174"
              onChange={() => {}}
            />
            
            <SelectField
              label="Loop Profile"
              id="loopProfile"
              value="Time Based"
              onChange={() => {}}
              options={[
                { label: "Time Based", value: "Time Based" },
                { label: "Distance Based", value: "Distance Based" },
              ]}
            />
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default MobilitySection;
