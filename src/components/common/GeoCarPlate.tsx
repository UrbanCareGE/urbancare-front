import { cn } from '@/lib/utils';

interface GeoCarPlateProps {
  licensePlate: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: {
    plate: 'h-7 text-[11px] rounded-[3px] px-1',
    flag: 'w-5 text-[5px] rounded-l-[3px] gap-0',
    flagIcon: 'text-[8px]',
    letters: 'tracking-[1px] px-1.5',
  },
  md: {
    plate: 'h-9 text-urbancare-sm rounded-[4px] px-1',
    flag: 'w-6 text-[6px] rounded-l-[4px] gap-0.5',
    flagIcon: 'text-[10px]',
    letters: 'tracking-[2px] px-2',
  },
  lg: {
    plate: 'h-11 text-urbancare-base rounded-[5px] px-1.5',
    flag: 'w-7 text-[7px] rounded-l-[5px] gap-0.5',
    flagIcon: 'text-[12px]',
    letters: 'tracking-[3px] px-2.5',
  },
};

const GeoCarPlate = ({
  licensePlate,
  size = 'md',
  className,
}: GeoCarPlateProps) => {
  const config = sizeConfig[size];
  const formatted = formatPlate(licensePlate);

  return (
    <div
      className={cn(
        'inline-flex items-stretch border-[1.5px] border-[#1a1a1a] bg-white overflow-hidden shadow-sm',
        config.plate,
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-[#003399] text-white -ml-1 -my-px',
          config.flag
        )}
      >
        <span className={config.flagIcon}>🇬🇪</span>
        <span className="font-bold leading-none">GE</span>
      </div>

      {/* License plate text */}
      <div
        className={cn(
          'flex items-center justify-center font-bold text-[#1a1a1a] whitespace-nowrap',
          config.letters
        )}
        style={{ fontFamily: "'FiraGO', 'Arial Narrow', sans-serif" }}
      >
        {formatted}
      </div>
    </div>
  );
};

function formatPlate(plate: string): string {
  const clean = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();

  if (/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(clean)) {
    return `${clean.slice(0, 2)}-${clean.slice(2, 5)}-${clean.slice(5)}`;
  }

  return clean;
}

export default GeoCarPlate;
