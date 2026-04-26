import { X } from 'lucide-react';
import GeoCarPlate from '@/components/common/GeoCarPlate';
import { CarDTO } from '@/model/dto/auth.dto';

interface CarPlateItemProps {
  car: CarDTO;
  onDelete: (car: CarDTO) => void;
  disabled?: boolean;
}

const CarPlateItem = ({ car, onDelete, disabled }: CarPlateItemProps) => {
  return (
    <div className="relative group">
      <GeoCarPlate licensePlate={car.licensePlate} size="md" />
      <button
        onClick={() => onDelete(car)}
        disabled={disabled}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-error urbancare-rounded-full opacity-0 group-hover:opacity-100 transition-opacity lg:active:scale-90 disabled:opacity-50"
      >
        <X size={12} className="text-white" />
      </button>
    </div>
  );
};

export default CarPlateItem;
