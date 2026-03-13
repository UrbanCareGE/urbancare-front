import { useAuth } from '@/components/provider/AuthProvider';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Info, Plus, X } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useDevice } from '@/hooks/use-device';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFetchCar } from '@/hooks/query/user/cars/use-fetch-car';
import { useAddCar } from '@/hooks/query/user/cars/use-add-car';
import { useDeleteCar } from '@/hooks/query/user/cars/use-delete-car';
import { CarDTO } from '@/model/dto/auth.dto';
import { useTranslation } from '@/i18n';

const PersonalCarsForm = () => {
  const t = useTranslation();
  const { user } = useAuth();

  const licensePlateSchema = z
    .string()
    .min(1, t.cars.numberRequired)
    .max(13, t.cars.maxCharacters)
    .regex(/^[A-Z0-9]+$/, t.cars.onlyLatinAndNumbers);
  const { isMobile } = useDevice();
  const { data, isPending: isCarFetching } = useFetchCar();
  const { mutateAsync: addCarMutate, isPending: isAdding } = useAddCar();
  const { mutateAsync: deleteCarMutate, isPending: isDeleting } =
    useDeleteCar();
  const cars = (data as CarDTO[]) ?? [];

  const [isEditing, setIsEditing] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<{
    id: string;
    licensePlate: string;
  } | null>(null);

  const handleDeleteClick = (car: { id: string; licensePlate: string }) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (carToDelete) {
      await deleteCarMutate(carToDelete.id);
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setCarToDelete(null);
  };

  const handleAddCar = async () => {
    const result = licensePlateSchema.safeParse(licensePlate);
    if (!result.success) return;
    setIsEditing(false);
    await addCarMutate({ licensePlate: result.data });
    setLicensePlate('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 13);
    setLicensePlate(filtered);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLicensePlate('');
  };

  const handleStartEditing = () => {
    if (isEditing || isAdding) return;
    setIsEditing(true);
  };

  if (!user) return null;

  return (
    <div className="w-full space-y-3">
      <h3 className="text-urbancare-2xl text-text-primary font-semibold flex items-center">
        {t.cars.carNumbers}
        {isMobile ? (
          <Popover>
            <PopoverTrigger>
              <Info className={'ml-3'} />
            </PopoverTrigger>
            <PopoverContent
              className={
                'bg-tooltip text-text-primary border-border text-center'
              }
            >
              {t.cars.carDescription}
            </PopoverContent>
          </Popover>
        ) : (
          <HoverCard>
            <HoverCardTrigger>
              <Info className={'ml-3'} />
            </HoverCardTrigger>
            <HoverCardContent
              className={'bg-surface-elevated border-border opacity-100'}
            >
              {t.cars.carDescription}
            </HoverCardContent>
          </HoverCard>
        )}
        <button
          onClick={handleStartEditing}
          disabled={isEditing || isAdding}
          className={cn(
            'w-6 h-6 flex justify-center items-center ml-auto bg-primary rounded-urbancare-full text-urbancare-base transition-all lg:hover:bg-primary/80 lg:hover:scale-110 lg:active:scale-95',
            (isEditing || isAdding) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Plus size={20} className={'text-white'} />
        </button>
      </h3>

      {isCarFetching ? (
        <p className="text-urbancare-xl text-center text-text-secondary">
          {t.common.loading}
        </p>
      ) : cars.length === 0 && !isEditing ? (
        <p className={'text-urbancare-xl text-center text-text-primary'}>
          {t.cars.noCarsAdded}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {cars.map((car) => (
            <Chip
              key={car.id}
              onDelete={() => handleDeleteClick(car)}
              disabled={isDeleting}
            >
              {car.licensePlate}
            </Chip>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="flex items-center gap-2">
          <Input
            value={licensePlate}
            onChange={handleInputChange}
            placeholder={t.cars.examplePlaceholder}
            className="flex-1"
            autoFocus
          />
          <button
            onClick={handleAddCar}
            className="w-8 h-8 flex justify-center items-center bg-success lg:hover:bg-success-hover lg:active:scale-95 rounded-urbancare-full transition-colors duration-200"
          >
            <Check size={18} className="text-white" />
          </button>
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex justify-center items-center bg-error lg:hover:bg-error-hover lg:active:scale-95 rounded-urbancare-full transition-colors duration-200"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.cars.deleteCar}</DialogTitle>
            <DialogDescription>
              {t.cars.confirmDeleteCar}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleCancelDelete}>
              {t.common.no}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {t.common.yes}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  onDelete?: () => void;
  disabled?: boolean;
}

const Chip = ({
  children,
  className,
  onDelete,
  disabled,
  ...props
}: ChipProps) => {
  return (
    <Badge
      className={cn('text-urbancare-2xl flex items-center gap-1.5 pr-1.5', className)}
      {...props}
    >
      {children}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={disabled}
          className="ml-0.5 p-0.5 rounded-urbancare-full lg:hover:bg-white/20 lg:active:scale-90 transition-colors disabled:opacity-50"
        >
          <X size={14} className="text-white/70" />
        </button>
      )}
    </Badge>
  );
};

export default PersonalCarsForm;
