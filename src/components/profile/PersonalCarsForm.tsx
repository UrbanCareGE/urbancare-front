import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFetchCar } from '@/hooks/query/user/cars/use-fetch-car';
import { useAddCar } from '@/hooks/query/user/cars/use-add-car';
import { useDeleteCar } from '@/hooks/query/user/cars/use-delete-car';
import { CarDTO } from '@/model/dto/auth.dto';
import { type TranslationKeys, useTranslation } from '@/i18n';
import CarInfoTooltip from '@/components/profile/personal-cars/CarInfoTooltip';
import AddCarInput from '@/components/profile/personal-cars/AddCarInput';
import CarPlateItem from '@/components/profile/personal-cars/CarPlateItem';
import DeleteCarDialog from '@/components/profile/personal-cars/DeleteCarDialog';

const licensePlateSchema = (t: TranslationKeys) =>
  z
    .string()
    .min(1, t.cars.numberRequired)
    .max(13, t.cars.maxCharacters)
    .regex(/^[A-Z0-9]+$/, t.cars.onlyLatinAndNumbers);

const PersonalCarsForm = () => {
  const t = useTranslation();

  const licencePlateSchema = licensePlateSchema(t);
  const { data, isPending: isCarFetching } = useFetchCar();
  const { mutateAsync: addCarMutate, isPending: isAdding } = useAddCar();
  const { mutateAsync: deleteCarMutate, isPending: isDeleting } =
    useDeleteCar();
  const cars = (data as CarDTO[]) ?? [];

  const [isEditing, setIsEditing] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<CarDTO | null>(null);

  const handleDeleteClick = (car: CarDTO) => {
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
    const result = licencePlateSchema.safeParse(licensePlate);
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

  return (
    <section className="w-full urbancare-rounded-3xl overflow-hidden border-none bg-surface shadow-sm shadow-shadow/5">
      <header className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
        <div className="w-10 h-10 urbancare-rounded-xl bg-tertiary-container text-tertiary-container-foreground flex items-center justify-center">
          <Car className="w-5 h-5" />
        </div>
        <h3 className="font-semibold urbancare-text-base text-text-primary leading-tight-georgian">
          {t.cars.carNumbers}
        </h3>
        <CarInfoTooltip />
        <Button
          onClick={handleStartEditing}
          disabled={isEditing || isAdding}
          size="sm"
          className={cn(
            'ml-auto urbancare-rounded-full urbancare-text-sm transition-all lg:hover:scale-105',
            (isEditing || isAdding) && 'opacity-50 cursor-not-allowed'
          )}
        >
          დამატება
        </Button>
      </header>

      <div className="p-4 sm:p-5 space-y-4">
        {isEditing && (
          <AddCarInput
            value={licensePlate}
            onChange={handleInputChange}
            onConfirm={handleAddCar}
            onCancel={handleCancel}
          />
        )}

        {isCarFetching ? (
          <p className="urbancare-text-base text-center text-text-secondary py-4">
            {t.common.loading}
          </p>
        ) : cars.length === 0 && !isEditing ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 urbancare-rounded-xl border border-dashed border-border bg-surface-variant">
            <div className="flex items-center justify-center w-10 h-10 urbancare-rounded-full bg-tertiary-container/60 text-tertiary-container-foreground [&_svg]:w-5 [&_svg]:h-5">
              <Car />
            </div>
            <p className="urbancare-text-base text-text-secondary">
              {t.cars.noCarsAdded}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {cars.map((car) => (
              <CarPlateItem
                key={car.id}
                car={car}
                onDelete={handleDeleteClick}
                disabled={isDeleting}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteCarDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </section>
  );
};

export default PersonalCarsForm;
