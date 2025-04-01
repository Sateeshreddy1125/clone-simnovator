import { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import FormLayout from "@/components/FormLayout";
import { InputField, SelectField, SectionHeader } from "@/components/ui/form-components";
import { 
  default4GCell, 
  default5GCell, 
  default5GNSACells, 
  duplexModeOptions, 
  fddBands, 
  fddBandToEarfcn, 
  mobilityOptions, 
  ratTypeOptions, 
  tddBands, 
  tddBandToEarfcn,
  bandToNrArfcn
} from "@/config/defaultValues";
import { CellConfigData } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CellSection = () => {
  const { formData, updateFormData } = useFormContext();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [bands, setBands] = useState<string[]>(fddBands);
  const cellData = formData.cell;

  useEffect(() => {
    // Initialize bands based on duplex mode of first cell
    if (cellData.cells.length > 0) {
      setBands(cellData.cells[0].duplexMode === "FDD" ? fddBands : tddBands);
    }
  }, []);

  const handleRatTypeChange = (ratType: "4G" | "5G:SA" | "5G:NSA") => {
    let updatedCells: CellConfigData[];
    
    switch (ratType) {
      case "4G":
        updatedCells = [default4GCell];
        break;
      case "5G:SA":
        updatedCells = [default5GCell];
        break;
      case "5G:NSA":
        updatedCells = [...default5GNSACells];
        break;
      default:
        updatedCells = [default4GCell];
    }
    
    updateFormData("cell", { ratType, cells: updatedCells });
  };

  const handleDuplexModeChange = (duplexMode: string, cellIndex: number) => {
    const updatedCells = [...cellData.cells];
    updatedCells[cellIndex].duplexMode = duplexMode as "FDD" | "TDD";
    
    // Update bands based on duplex mode
    const newBands = duplexMode === "FDD" ? fddBands : tddBands;
    setBands(newBands);
    
    // Select first band from the new list and update values
    const defaultBand = newBands[0];
    updatedCells[cellIndex].band = defaultBand;
    
    // Update EARFCN values based on band
    if (updatedCells[cellIndex].cellType === "4G" || updatedCells[cellIndex].cellType === "LTE") {
      const earfcnValues = duplexMode === "FDD" 
        ? fddBandToEarfcn[defaultBand] 
        : tddBandToEarfcn[defaultBand];
      
      if (earfcnValues) {
        updatedCells[cellIndex].dlEarfcn = earfcnValues.dl || "";
        updatedCells[cellIndex].ulEarfcn = earfcnValues.ul || "";
      }
    } else {
      // For 5G
      const arfcnValues = bandToNrArfcn[defaultBand];
      if (arfcnValues) {
        updatedCells[cellIndex].dlEarfcn = arfcnValues.dl || "";
        updatedCells[cellIndex].ulEarfcn = arfcnValues.ul || "";
        updatedCells[cellIndex].ssbNrArfcn = arfcnValues.ssb || "";
      }
    }
    
    updateFormData("cell", { cells: updatedCells });
  };

  const handleBandChange = (band: string, cellIndex: number) => {
    const updatedCells = [...cellData.cells];
    updatedCells[cellIndex].band = band;
    
    const duplexMode = updatedCells[cellIndex].duplexMode;
    
    if (updatedCells[cellIndex].cellType === "4G" || updatedCells[cellIndex].cellType === "LTE") {
      const earfcnValues = duplexMode === "FDD" 
        ? fddBandToEarfcn[band] 
        : tddBandToEarfcn[band];
      
      if (earfcnValues) {
        updatedCells[cellIndex].dlEarfcn = earfcnValues.dl || "";
        updatedCells[cellIndex].ulEarfcn = earfcnValues.ul || "";
      }
    } else {
      // For 5G
      const arfcnValues = bandToNrArfcn[band];
      if (arfcnValues) {
        updatedCells[cellIndex].dlEarfcn = arfcnValues.dl || "";
        updatedCells[cellIndex].ulEarfcn = arfcnValues.ul || "";
        updatedCells[cellIndex].ssbNrArfcn = arfcnValues.ssb || "";
      }
    }
    
    updateFormData("cell", { cells: updatedCells });
  };

  const updateCellField = (field: keyof CellConfigData, value: string, cellIndex: number) => {
    const updatedCells = [...cellData.cells];
    updatedCells[cellIndex][field] = value;
    updateFormData("cell", { cells: updatedCells });
  };

  const addCell = () => {
    const newCellId = `cell${cellData.cells.length + 1}`;
    const newCell = {
      ...default4GCell,
      id: newCellId
    };
    
    updateFormData("cell", { 
      cells: [...cellData.cells, newCell]
    });
  };

  const validateForm = () => {
    // Simple validation to ensure all mandatory fields are filled
    const mandatoryFields = ['ratType', 'mobility'];
    for (const field of mandatoryFields) {
      if (!cellData[field as keyof typeof cellData]) {
        return false;
      }
    }

    // Check each cell has required fields
    for (const cell of cellData.cells) {
      if (!cell.cellType || !cell.duplexMode || !cell.band || !cell.dlEarfcn || !cell.ulEarfcn) {
        return false;
      }
      
      // Check for 5G specific fields
      if (cell.cellType === "5G" && !cell.ssbNrArfcn) {
        return false;
      }
    }

    return true;
  };

  return (
    <FormLayout title="Cell Configuration" sectionKey="cell" onNext={validateForm}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="RAT Type"
            id="ratType"
            value={cellData.ratType}
            onChange={(value) => handleRatTypeChange(value as "4G" | "5G:SA" | "5G:NSA")}
            options={ratTypeOptions}
            required
          />
          
          <SelectField
            label="Mobility"
            id="mobility"
            value={cellData.mobility}
            onChange={(value) => updateFormData("cell", { mobility: value })}
            options={mobilityOptions}
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
        
        {cellData.cells.map((cell, index) => (
          <div key={cell.id} className="mt-6">
            <SectionHeader title={`Cell #${index + 1}`} className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <SelectField
                label="Cell Type"
                id={`cellType-${index}`}
                value={cell.cellType}
                onChange={(value) => updateCellField("cellType", value, index)}
                options={[
                  { label: "4G", value: "4G" },
                  { label: "5G", value: "5G" },
                  { label: "LTE", value: "LTE" }
                ]}
                required
              />
              
              <SelectField
                label="Duplex Mode"
                id={`duplexMode-${index}`}
                value={cell.duplexMode}
                onChange={(value) => handleDuplexModeChange(value, index)}
                options={duplexModeOptions}
                required
              />
              
              <SelectField
                label="Band"
                id={`band-${index}`}
                value={cell.band}
                onChange={(value) => handleBandChange(value, index)}
                options={bands.map(band => ({ label: band, value: band }))}
                required
              />
              
              <InputField
                label={cell.cellType === "5G" ? "DL-NR-ARFCN" : "DL EARFCN"}
                id={`dlEarfcn-${index}`}
                value={cell.dlEarfcn}
                onChange={(value) => updateCellField("dlEarfcn", value, index)}
                required
              />
              
              <InputField
                label={cell.cellType === "5G" ? "UL-NR-ARFCN" : "UL EARFCN"}
                id={`ulEarfcn-${index}`}
                value={cell.ulEarfcn}
                onChange={(value) => updateCellField("ulEarfcn", value, index)}
                required
              />
              
              {cell.cellType === "5G" && (
                <InputField
                  label="SSB NR-ARFCN"
                  id={`ssbNrArfcn-${index}`}
                  value={cell.ssbNrArfcn || ""}
                  onChange={(value) => updateCellField("ssbNrArfcn", value, index)}
                  required
                />
              )}
            </div>
            
            {showAdvancedSettings && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 bg-gray-100 p-4 rounded-md">
                <InputField
                  label="TX Power"
                  id={`txPower-${index}`}
                  value={"30"}
                  onChange={() => {}}
                />
                
                <InputField
                  label="RX Gain"
                  id={`rxGain-${index}`}
                  value={"0"}
                  onChange={() => {}}
                />
              </div>
            )}
          </div>
        ))}
        
        {(cellData.ratType !== "5G:NSA" || cellData.cells.length < 2) && (
          <div className="mt-4">
            <Button 
              onClick={addCell}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Cell
            </Button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default CellSection;
