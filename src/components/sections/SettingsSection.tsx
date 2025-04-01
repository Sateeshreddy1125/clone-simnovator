
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField } from "@/components/ui/form-components";
import { logSettingOptions, successSettingsOptions } from "@/config/defaultValues";

const SettingsSection = () => {
  const { formData, updateFormData } = useFormContext();
  const settingsData = formData.settings;

  const handleInputChange = (field: keyof typeof settingsData, value: string) => {
    updateFormData("settings", { [field]: value });
  };

  const handleLogSettingChange = (value: string) => {
    updateFormData("settings", { 
      logSetting: value as "debug" | "error" | "rrc_debug" 
    });
  };

  const handleSuccessSettingsChange = (value: string) => {
    updateFormData("settings", { 
      successSettings: value as "new21" | "Bler Success" | "Throughput Success" 
    });
  };

  const validateForm = () => {
    // Check required fields
    if (
      !settingsData.testCaseName ||
      !settingsData.logSetting ||
      !settingsData.successSettings
    ) {
      return false;
    }
    
    return true;
  };

  return (
    <FormLayout 
      title="Test Case Settings" 
      sectionKey="settings" 
      onNext={validateForm}
      isLast={true}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <InputField
            label="Test Case Name"
            id="testCaseName"
            value={settingsData.testCaseName}
            onChange={(value) => handleInputChange("testCaseName", value)}
            required
            className="col-span-2"
          />
          
          <SelectField
            label="Log Setting"
            id="logSetting"
            value={settingsData.logSetting}
            onChange={handleLogSettingChange}
            options={logSettingOptions}
            required
          />
          
          <SelectField
            label="Success Settings"
            id="successSettings"
            value={settingsData.successSettings}
            onChange={handleSuccessSettingsChange}
            options={successSettingsOptions}
            required
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default SettingsSection;
