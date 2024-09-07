import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  maxLength,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      required
    />
  </div>
);

export default FormField;
