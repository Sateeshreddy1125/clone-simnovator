
import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField, SectionHeader } from "@/components/ui/form-components";
import { dataDirectionOptions, dataTypeOptions, transportProtocolOptions, callTypeOptions, bitRateUnitOptions } from "@/config/defaultValues";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserPlaneProfileData } from "@/types";

const UserPlaneSection = () => {
  const { formData, updateFormData } = useFormContext();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const userPlaneData = formData.userPlane;
  
  const subscriberRangeOptions = formData.subscriber.ranges.map(range => ({
    label: `Range #${range.id.replace("range", "")}`,
    value: range.id
  }));
  
  // Add "Apply to All" option
  subscriberRangeOptions.unshift({ label: "Apply to All", value: "ApplyToAll" });

  const handleProfileTypeChange = (value: string) => {
    updateFormData("userPlane", { 
      profileType: value,
      // Reset profiles to one if changing to Single
      profiles: value === "Single" ? [userPlaneData.profiles[0]] : userPlaneData.profiles
    });
  };

  const updateProfile = (index: number, field: keyof UserPlaneProfileData, value: string) => {
    const updatedProfiles = [...userPlaneData.profiles];
    updatedProfiles[index][field] = value;
    
    // Handle special cases for data type
    if (field === "dataType") {
      if (value === "IPERF") {
        updatedProfiles[index].transportProtocol = "TCP";
        delete updatedProfiles[index].callType;
      } else if (value === "VOLTE/VILTE") {
        updatedProfiles[index].callType = "Audio";
        delete updatedProfiles[index].transportProtocol;
      }
    }
    
    // Handle special case for data direction
    if (field === "dataDirection" && value !== "Both") {
      if (value === "Downlink") {
        delete updatedProfiles[index].ulBitrate;
        delete updatedProfiles[index].ulBitrateUnit;
      } else if (value === "Uplink") {
        delete updatedProfiles[index].dlBitrate;
        delete updatedProfiles[index].dlBitrateUnit;
      }
    }
    
    updateFormData("userPlane", { profiles: updatedProfiles });
  };

  const addProfile = () => {
    const newProfile: UserPlaneProfileData = {
      id: `profile${userPlaneData.profiles.length + 1}`,
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
    };
    
    updateFormData("userPlane", { 
      profiles: [...userPlaneData.profiles, newProfile]
    });
  };

  const validateForm = () => {
    for (const profile of userPlaneData.profiles) {
      // Check required fields
      if (
        !profile.subscriberRange ||
        !profile.dataType ||
        !profile.startingPort ||
        !profile.startDelay ||
        !profile.duration ||
        !profile.dataDirection
      ) {
        return false;
      }
      
      // Check data type specific fields
      if (profile.dataType === "IPERF" && !profile.transportProtocol) {
        return false;
      }
      
      if (profile.dataType === "VOLTE/VILTE" && !profile.callType) {
        return false;
      }
      
      // Check data direction specific fields
      if ((profile.dataDirection === "Both" || profile.dataDirection === "Downlink") && 
          (!profile.dlBitrate || !profile.dlBitrateUnit)) {
        return false;
      }
      
      if ((profile.dataDirection === "Both" || profile.dataDirection === "Uplink") && 
          (!profile.ulBitrate || !profile.ulBitrateUnit)) {
        return false;
      }
    }
    
    return true;
  };

  return (
    <FormLayout title="User Plane Configuration" sectionKey="userPlane" onNext={validateForm}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Profile Type"
            id="profileType"
            value={userPlaneData.profileType}
            onChange={handleProfileTypeChange}
            options={[
              { label: "Single", value: "Single" },
              { label: "Mixed", value: "Mixed" },
            ]}
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
        
        {userPlaneData.profiles.map((profile, index) => (
          <div key={profile.id} className="mt-6">
            <SectionHeader title={`UP #${index + 1}`} className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <SelectField
                label="Subscriber Range"
                id={`subscriberRange-${index}`}
                value={profile.subscriberRange}
                onChange={(value) => updateProfile(index, "subscriberRange", value)}
                options={subscriberRangeOptions}
                required
              />
              
              <SelectField
                label="Data Type"
                id={`dataType-${index}`}
                value={profile.dataType}
                onChange={(value) => updateProfile(index, "dataType", value)}
                options={dataTypeOptions}
                required
              />
              
              {profile.dataType === "IPERF" ? (
                <SelectField
                  label="Transport Protocol"
                  id={`transportProtocol-${index}`}
                  value={profile.transportProtocol || "TCP"}
                  onChange={(value) => updateProfile(index, "transportProtocol", value)}
                  options={transportProtocolOptions}
                  required
                />
              ) : (
                <SelectField
                  label="Call Type"
                  id={`callType-${index}`}
                  value={profile.callType || "Audio"}
                  onChange={(value) => updateProfile(index, "callType", value)}
                  options={callTypeOptions}
                  required
                />
              )}
              
              <InputField
                label="Starting Port"
                id={`startingPort-${index}`}
                value={profile.startingPort}
                onChange={(value) => updateProfile(index, "startingPort", value)}
                type="number"
                required
              />
              
              <InputField
                label="APN Name"
                id={`apnName-${index}`}
                value={profile.apnName || ""}
                onChange={(value) => updateProfile(index, "apnName", value)}
              />
              
              <InputField
                label="Start Delay (sec)"
                id={`startDelay-${index}`}
                value={profile.startDelay}
                onChange={(value) => updateProfile(index, "startDelay", value)}
                type="number"
                required
              />
              
              <InputField
                label="Duration (sec)"
                id={`duration-${index}`}
                value={profile.duration}
                onChange={(value) => updateProfile(index, "duration", value)}
                type="number"
                required
              />
              
              <SelectField
                label="Data Direction"
                id={`dataDirection-${index}`}
                value={profile.dataDirection}
                onChange={(value) => updateProfile(index, "dataDirection", value)}
                options={dataDirectionOptions}
                required
              />
              
              {(profile.dataDirection === "Both" || profile.dataDirection === "Downlink") && (
                <div className="flex gap-2">
                  <InputField
                    label="DL Bitrate"
                    id={`dlBitrate-${index}`}
                    value={profile.dlBitrate || "150"}
                    onChange={(value) => updateProfile(index, "dlBitrate", value)}
                    type="number"
                    required
                    className="flex-1"
                  />
                  <SelectField
                    label="Unit"
                    id={`dlBitrateUnit-${index}`}
                    value={profile.dlBitrateUnit || "Mbps"}
                    onChange={(value) => updateProfile(index, "dlBitrateUnit", value)}
                    options={bitRateUnitOptions}
                    className="w-24"
                  />
                </div>
              )}
              
              {(profile.dataDirection === "Both" || profile.dataDirection === "Uplink") && (
                <div className="flex gap-2">
                  <InputField
                    label="UL Bitrate"
                    id={`ulBitrate-${index}`}
                    value={profile.ulBitrate || "50"}
                    onChange={(value) => updateProfile(index, "ulBitrate", value)}
                    type="number"
                    required
                    className="flex-1"
                  />
                  <SelectField
                    label="Unit"
                    id={`ulBitrateUnit-${index}`}
                    value={profile.ulBitrateUnit || "Mbps"}
                    onChange={(value) => updateProfile(index, "ulBitrateUnit", value)}
                    options={bitRateUnitOptions}
                    className="w-24"
                  />
                </div>
              )}
            </div>
            
            {showAdvancedSettings && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-md">
                <InputField
                  label="MTU Size (bytes)"
                  id={`mtuSize-${index}`}
                  value="1500"
                  onChange={() => {}}
                  type="number"
                />
                
                <InputField
                  label="Payload Length (bytes)"
                  id={`payloadLength-${index}`}
                  value="1000"
                  onChange={() => {}}
                  type="number"
                />
                
                <SelectField
                  label="Data Loop"
                  id={`dataLoop-${index}`}
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
        ))}
        
        {userPlaneData.profileType === "Mixed" && (
          <div className="mt-4">
            <Button 
              onClick={addProfile}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Profile
            </Button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default UserPlaneSection;
