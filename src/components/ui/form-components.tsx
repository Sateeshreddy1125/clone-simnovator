
import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
}

export const InputField = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  className,
  required = false,
  tooltip,
  disabled = false,
}: InputFieldProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center mb-1">
        <Label htmlFor={id} className="text-sm font-medium mr-1">
          {label}
        </Label>
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-500 ml-1 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border-gray-300"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  required?: boolean;
  tooltip?: string;
  disabled?: boolean;
}

export const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  className,
  required = false,
  tooltip,
  disabled = false,
}: SelectFieldProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center mb-1">
        <Label htmlFor={id} className="text-sm font-medium mr-1">
          {label}
        </Label>
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-500 ml-1 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} className="bg-white border-gray-300">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader = ({ title, className }: SectionHeaderProps) => {
  return (
    <div className={cn("bg-orange-500 text-white py-3 px-6 rounded-full inline-block", className)}>
      {title}
    </div>
  );
};
