import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Car, Plus } from 'lucide-react';
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
    <section className="w-full rounded-urbancare-xl overflow-hidden border-none bg-surface shadow-sm shadow-shadow/5">
      <header className="px-4 py-3 bg-surface-variant flex items-center gap-2">
        <Car className="w-5 h-5 text-foreground-primary" />
        <h3 className="font-semibold text-urbancare-base text-foreground-primary leading-tight-georgian">
          {t.cars.carNumbers}
        </h3>
        <CarInfoTooltip />
        <Button
          onClick={handleStartEditing}
          disabled={isEditing || isAdding}
          size="sm"
          className={cn(
            'ml-auto rounded-urbancare-full text-urbancare-sm transition-all lg:hover:scale-105',
            (isEditing || isAdding) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Plus className="w-4 h-4" />
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
          <p className="text-urbancare-base text-center text-text-secondary py-4">
            {t.common.loading}
          </p>
        ) : cars.length === 0 && !isEditing ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 rounded-urbancare-xl border border-dashed border-border bg-surface-variant">
            <div className="flex items-center justify-center w-10 h-10 rounded-urbancare-full bg-tertiary-container/60 text-tertiary-container-foreground [&_svg]:w-5 [&_svg]:h-5">
              <Car />
            </div>
            <p className="text-urbancare-base text-text-secondary">
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
