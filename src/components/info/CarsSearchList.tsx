'use client';

import { useState } from 'react';
import { CarInfo } from '@/model/info.dto';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

interface CarsSearchListProps {
  cars: CarInfo[];
}

const CarsSearchList = ({ cars }: CarsSearchListProps) => {
  const [search, setSearch] = useState('');

  const filteredCars = cars.filter((car) =>
    car.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 sticky top-0 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="მოძებნე ნომრით..."
            className="pl-9"
          />
        </div>
      </div>
      <ul className="px-4">
        {filteredCars.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            {search ? 'მანქანა ვერ მოიძებნა' : 'მანქანები არ არის დამატებული'}
          </p>
        ) : (
          filteredCars.map((car) => (
            <Card key={car.id} className="mb-4 px-3 py-2">
              <h3 className="font-semibold text-lg">{car.licensePlate}</h3>
              <Separator className="mt-1" />
              <p className="mt-2 text-slate-700">{car.name}</p>
              <p className="text-slate-500">{car.phone}</p>
            </Card>
          ))
        )}
      </ul>
    </div>
  );
};

export default CarsSearchList;
