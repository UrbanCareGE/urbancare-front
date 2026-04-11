import React from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/i18n';

interface AddCarInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const AddCarInput = ({
  value,
  onChange,
  onConfirm,
  onCancel,
}: AddCarInputProps) => {
  const t = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={onChange}
        placeholder={t.cars.examplePlaceholder}
        className="flex-1"
        autoFocus
      />
      <button
        onClick={onConfirm}
        className="w-8 h-8 flex justify-center items-center bg-success lg:hover:bg-success-hover lg:active:scale-95 rounded-urbancare-full transition-colors duration-200"
      >
        <Check size={18} className="text-white" />
      </button>
      <button
        onClick={onCancel}
        className="w-8 h-8 flex justify-center items-center bg-error lg:hover:bg-error-hover lg:active:scale-95 rounded-urbancare-full transition-colors duration-200"
      >
        <X size={18} className="text-white" />
      </button>
    </div>
  );
};

export default AddCarInput;
