
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField, SectionHeader } from "@/components/ui/form-components";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SubscriberRangeData } from "@/types";

const SubscriberSection = () => {
  const { formData, updateFormData } = useFormContext();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const subscriberData = formData.subscriber;

  const handleTotalUEsChange = (value: string) => {
    const totalUEs = parseInt(value) || 0;
    updateFormData("subscriber", { totalUEs });
  };

  const updateRange = (index: number, field: keyof SubscriberRangeData, value: string | number) => {
    const updatedRanges = [...subscriberData.ranges];
    
    if (field === "numberOfUEs" || field === "servingCell" || field === "startingSUPI" || 
        field === "sharedKey" || field === "mncDigits") {
      updatedRanges[index][field] = value;
    }
    
    updateFormData("subscriber", { ranges: updatedRanges });
  };

  const addRange = () => {
    // Calculate next SUPI based on the last range
    const lastRange = subscriberData.ranges[subscriberData.ranges.length - 1];
    const lastStartingSUPI = lastRange.startingSUPI;
    const lastNumberOfUEs = parseInt(lastRange.numberOfUEs.toString());
    
    // Calculate next SUPI by adding the number of UEs to the last SUPI
    const nextSUPI = (parseInt(lastStartingSUPI) + lastNumberOfUEs).toString().padStart(15, '0');

    const newRange: SubscriberRangeData = {
      id: `range${subscriberData.ranges.length + 1}`,
      numberOfUEs: 1,
      servingCell: subscriberData.ranges[0].servingCell, // Default to first cell
      startingSUPI: nextSUPI,
      sharedKey: "00112233445566778899aabbccddeeff",
      mncDigits: "2",
    };
    
    updateFormData("subscriber", { 
      ranges: [...subscriberData.ranges, newRange]
    });
  };

  // Get available cell options
  const cellOptions = formData.cell.cells.map(cell => ({
    label: `Cell #${cell.id.replace("cell", "")}`,
    value: cell.id
  }));

  const validateForm = () => {
    // Check if total UEs is valid
    if (!subscriberData.totalUEs || subscriberData.totalUEs <= 0) {
      return false;
    }

    // Check that sum of UEs in all ranges doesn't exceed total UEs
    const sumOfUEs = subscriberData.ranges.reduce(
      (sum, range) => sum + (parseInt(range.numberOfUEs.toString()) || 0), 
      0
    );
    
    if (sumOfUEs > subscriberData.totalUEs) {
      return false;
    }

    // Check mandatory fields for each range
    for (const range of subscriberData.ranges) {
      if (
        !range.numberOfUEs || 
        !range.servingCell || 
        !range.startingSUPI
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <FormLayout title="Subscriber Configuration" sectionKey="subscriber" onNext={validateForm}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Total # of UEs"
            id="totalUEs"
            value={subscriberData.totalUEs}
            onChange={handleTotalUEsChange}
            type="number"
            required
          />
          
          <div className="flex items-center justify-end mt-5">
            <Label htmlFor="advanced-settings" className="mr-2">Advanced Settings</Label>
            <Switch
              id="advanced-settings"
              checked={showAdvancedSettings}
              onCheckedChange={setShowAdvancedSettings}
            />
          </div>
        </div>
        
        {subscriberData.ranges.map((range, index) => (
          <div key={range.id} className="mt-6">
            <SectionHeader title={`Range #${index + 1}`} className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <InputField
                label="# of UEs"
                id={`numberOfUEs-${index}`}
                value={range.numberOfUEs}
                onChange={(value) => updateRange(index, "numberOfUEs", parseInt(value) || 0)}
                type="number"
                required
              />
              
              <SelectField
                label="Serving Cell"
                id={`servingCell-${index}`}
                value={range.servingCell}
                onChange={(value) => updateRange(index, "servingCell", value)}
                options={cellOptions}
                required
              />
              
              <InputField
                label="Starting SUPI"
                id={`startingSUPI-${index}`}
                value={range.startingSUPI}
                onChange={(value) => updateRange(index, "startingSUPI", value)}
                required
              />
              
              <InputField
                label="Shared Key"
                id={`sharedKey-${index}`}
                value={range.sharedKey}
                onChange={(value) => updateRange(index, "sharedKey", value)}
                tooltip="Default: 00112233445566778899aabbccddeeff"
              />
              
              <InputField
                label="MNC Digits"
                id={`mncDigits-${index}`}
                value={range.mncDigits}
                onChange={(value) => updateRange(index, "mncDigits", value)}
                type="number"
              />
            </div>
            
            {showAdvancedSettings && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-md">
                <SelectField
                  label="UE Category"
                  id={`ueCategory-${index}`}
                  value="Standard"
                  onChange={() => {}}
                  options={[
                    { label: "Standard", value: "Standard" },
                    { label: "Advanced", value: "Advanced" }
                  ]}
                />
                
                <SelectField
                  label="UE Type"
                  id={`ueType-${index}`}
                  value="Normal"
                  onChange={() => {}}
                  options={[
                    { label: "Normal", value: "Normal" },
                    { label: "IoT", value: "IoT" }
                  ]}
                />
              </div>
            )}
          </div>
        ))}
        
        {subscriberData.ranges.length < subscriberData.totalUEs && (
          <div className="mt-4">
            <Button 
              onClick={addRange}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Range
            </Button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default SubscriberSection;
