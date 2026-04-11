import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
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
    <div className="w-full space-y-3">
      <h3 className="text-urbancare-2xl text-text-primary font-semibold flex items-center">
        {t.cars.carNumbers}
        <CarInfoTooltip />
        <Button
          onClick={handleStartEditing}
          disabled={isEditing || isAdding}
          className={cn(
            'ml-auto bg-primary text-urbancare-lg transition-all lg:hover:bg-primary/80 lg:hover:scale-105 lg:active:scale-95',
            (isEditing || isAdding) && 'opacity-50 cursor-not-allowed'
          )}
        >
          დამატება
        </Button>
      </h3>

      {isEditing && (
        <AddCarInput
          value={licensePlate}
          onChange={handleInputChange}
          onConfirm={handleAddCar}
          onCancel={handleCancel}
        />
      )}

      {isCarFetching ? (
        <p className="text-urbancare-xl text-center text-text-secondary">
          {t.common.loading}
        </p>
      ) : cars.length === 0 && !isEditing ? (
        <p className="text-urbancare-xl text-center text-text-primary">
          {t.cars.noCarsAdded}
        </p>
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

      <DeleteCarDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PersonalCarsForm;
