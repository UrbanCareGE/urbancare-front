import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDevice } from '@/hooks/use-device';
import { useTranslation } from '@/i18n';

const CarInfoTooltip = () => {
  const { isMobile } = useDevice();
  const t = useTranslation();

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger>
          <Info className="ml-3" />
        </PopoverTrigger>
        <PopoverContent className="bg-surface-elevated text-text-primary border-border text-center">
          {t.cars.carDescription}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Info className="ml-3" />
      </HoverCardTrigger>
      <HoverCardContent className="bg-surface-elevated border-border opacity-100">
        {t.cars.carDescription}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CarInfoTooltip;
