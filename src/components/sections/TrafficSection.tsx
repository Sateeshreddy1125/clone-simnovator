
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField, SectionHeader } from "@/components/ui/form-components";
import { attachTypeOptions } from "@/config/defaultValues";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const TrafficSection = () => {
  const { formData, updateFormData } = useFormContext();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const trafficData = formData.traffic;
  
  // Create range options from subscriber data
  const rangeOptions = formData.subscriber.ranges.map(range => ({
    label: `Range #${range.id.replace("range", "")}`,
    value: range.id
  }));
  
  // Add "Apply to All" option
  rangeOptions.unshift({ label: "Apply To All", value: "ApplyToAll" });

  const handleProfileRangeChange = (value: string) => {
    updateFormData("traffic", { profileRange: value });
  };

  const handleAttachTypeChange = (value: string) => {
    updateFormData("traffic", { 
      attachType: value as "Bursty" | "Staggered" 
    });
  };

  const handleInputChange = (field: keyof typeof trafficData, value: string) => {
    updateFormData("traffic", { [field]: value });
  };

  const validateForm = () => {
    // Check required fields
    if (
      !trafficData.profileRange ||
      !trafficData.attachType ||
      !trafficData.attachRate ||
      !trafficData.attachDelay ||
      !trafficData.powerOnDuration
    ) {
      return false;
    }
    
    // If attach type is staggered, stagger time is required
    if (trafficData.attachType === "Staggered" && !trafficData.staggerTime) {
      return false;
    }
    
    return true;
  };

  return (
    <FormLayout title="Traffic Configuration" sectionKey="traffic" onNext={validateForm}>
      <div className="space-y-6">
        <SectionHeader title="Profile #1" className="mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="Profile Range"
            id="profileRange"
            value={trafficData.profileRange}
            onChange={handleProfileRangeChange}
            options={rangeOptions}
            required
          />
          
          <SelectField
            label="Attach Type"
            id="attachType"
            value={trafficData.attachType}
            onChange={handleAttachTypeChange}
            options={attachTypeOptions}
            required
            tooltip="Select attachment behavior type"
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
            label="Attach Rate"
            id="attachRate"
            value={trafficData.attachRate}
            onChange={(value) => handleInputChange("attachRate", value)}
            type="number"
            required
            tooltip="UEs per second"
          />
          
          <InputField
            label="Attach Delay (sec)"
            id="attachDelay"
            value={trafficData.attachDelay}
            onChange={(value) => handleInputChange("attachDelay", value)}
            type="number"
            required
          />
          
          <InputField
            label="Power On Duration (sec)"
            id="powerOnDuration"
            value={trafficData.powerOnDuration}
            onChange={(value) => handleInputChange("powerOnDuration", value)}
            type="number"
            required
          />
          
          {trafficData.attachType === "Staggered" && (
            <InputField
              label="Stagger Time (sec)"
              id="staggerTime"
              value={trafficData.staggerTime || "0"}
              onChange={(value) => handleInputChange("staggerTime", value)}
              type="number"
              required
            />
          )}
        </div>
        
        {showAdvancedSettings && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-md">
            <SelectField
              label="Loop Profile"
              id="loopProfile"
              value="Disable"
              onChange={() => {}}
              options={[
                { label: "Enable", value: "Enable" },
                { label: "Disable", value: "Disable" }
              ]}
            />
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default TrafficSection;
