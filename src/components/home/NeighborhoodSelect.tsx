'use client';

import React from 'react';
import { Check, ChevronDown, Loader2, MapPin, Plus } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Apartment {
  id: string;
  name: string;
  address?: string;
  image?: string;
}

interface ApartmentCardProps {
  apartment: Apartment;
  isSelected: boolean;
  isDefault?: boolean;
  onClick: () => void;
}

const ApartmentImage = ({
  src,
  alt,
  isSelected,
}: {
  src?: string;
  alt: string;
  isSelected?: boolean;
}) => {
  const fallbackImage =
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop';

  return (
    <div
      className={cn(
        'relative w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden transition-all duration-200',
        isSelected
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
          : 'ring-1 ring-border'
      )}
    >
      <img
        src={src ?? fallbackImage}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const ApartmentInfo = ({
  name,
  address,
  isDefault,
}: {
  name: string;
  address?: string;
  isDefault?: boolean;
}) => (
  <div className="flex flex-col items-start min-w-0 flex-1 gap-0.5">
    <div className="flex items-center gap-2">
      <span className="font-semibold text-sm text-foreground truncate">
        {name}
      </span>
      {isDefault && (
        <Badge
          variant="secondary"
          className="text-[10px] px-1.5 py-0 h-4 font-semibold uppercase"
        >
          Default
        </Badge>
      )}
    </div>
    <span className="text-xs text-muted-foreground flex items-center gap-1 truncate w-full">
      <MapPin className="w-3 h-3 flex-shrink-0" />
      <span className="truncate">{address ?? name}</span>
    </span>
  </div>
);

const ActiveIndicator = () => (
  <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
  </span>
);

const ApartmentCard = ({
  apartment,
  isSelected,
  isDefault,
  onClick,
}: ApartmentCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 w-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      isSelected
        ? 'bg-primary/5 border-2 border-primary'
        : 'bg-card border border-border lg:hover:border-primary/50 lg:hover:bg-accent/50 lg:active:scale-[0.98]'
    )}
  >
    <ApartmentImage
      src={apartment.image}
      alt={apartment.name}
      isSelected={isSelected}
    />
    <ApartmentInfo
      name={apartment.name}
      address={apartment.address}
      isDefault={isDefault}
    />
  </button>
);

const CurrentApartmentDisplay = ({ apartment }: { apartment: Apartment }) => (
  <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
    <ApartmentImage src={apartment.image} alt={apartment.name} />
    <ApartmentInfo name={apartment.name} address={apartment.address} />
    <ActiveIndicator />
  </div>
);

const AddLocationButton = ({ onClick }: { onClick?: () => void }) => (
  <Button
    type="button"
    variant="outline"
    className={cn(
      'w-full h-auto p-3 rounded-xl border-2 border-dashed',
      'text-muted-foreground lg:hover:text-primary lg:hover:border-primary',
      'transition-all duration-200'
    )}
    onClick={onClick}
  >
    <Plus className="w-4 h-4 mr-2" />
    Add New Location
  </Button>
);

const LoadingState = () => (
  <div className="w-full border-t border-border bg-muted/30">
    <div className="px-4 py-3">
      <Skeleton className="h-3 w-28" />
    </div>
    <div className="px-3 pb-4">
      <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
        <Skeleton className="w-11 h-11 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Loader2 className="w-4 h-4 text-muted-foreground animate-spin flex-shrink-0" />
      </div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message?: string }) => (
  <div className="w-full border-t border-border bg-muted/30">
    <div className="px-3 py-4">
      <div className="p-4 rounded-xl border-2 border-dashed border-destructive/50 bg-destructive/5">
        <p className="text-sm text-destructive font-medium">
          {message ?? 'Unable to load neighborhoods'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Please try refreshing the page
        </p>
      </div>
    </div>
  </div>
);

const EmptyState = ({ onAddLocation }: { onAddLocation?: () => void }) => (
  <div className="w-full border-t border-border bg-muted/30">
    <div className="px-3 py-4">
      <div className="p-4 rounded-xl border border-border bg-card text-center">
        <p className="text-sm text-foreground font-medium mb-1">
          No neighborhoods yet
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Join a neighborhood to get started
        </p>
        <AddLocationButton onClick={onAddLocation} />
      </div>
    </div>
  </div>
);

const SectionHeader = ({ isOpen }: { isOpen: boolean }) => (
  <div className="flex items-center justify-between px-4 py-3">
    <span className="text-sm font-semibold text-muted-foreground">
      არჩეული ლოკაცია
    </span>
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="h-auto py-1 px-2 text-xs font-semibold text-primary lg:hover:text-primary/80 lg:hover:bg-primary/5 lg:active:scale-95"
      >
        {isOpen ? 'დახურვა' : 'შეცვლა'}
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 ml-1 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </Button>
    </CollapsibleTrigger>
  </div>
);

export const NeighborhoodSelect = () => {
  const { isLoading, selectApartment, user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { apartmentId } = useParams<{ apartmentId: string }>();

  // Memoized values
  const joinedApartments = user?.joinedApartments ?? [];

  const selectedApartment = React.useMemo(
    () =>
      joinedApartments.find((apt) => apt.id === apartmentId) ??
      joinedApartments[0],
    [joinedApartments, apartmentId]
  );

  // Handlers
  const handleApartmentChange = React.useCallback(
    (newApartmentId: string) => {
      const apt = joinedApartments.find((e) => e.id === newApartmentId);
      if (!apt) return;

      selectApartment(apt.id);

      const newPath = pathname.replace(
        `/apartment/${apartmentId}`,
        `/apartment/${newApartmentId}`
      );
      router.push(newPath);
      setIsOpen(false);
    },
    [joinedApartments, selectApartment, pathname, apartmentId, router]
  );

  const handleAddLocation = React.useCallback(() => {
    router.push('/apartments/join');
  }, [router]);

  // Render states
  if (isLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return <ErrorState message="Unable to load user data" />;
  }

  if (joinedApartments.length === 0) {
    return <EmptyState onAddLocation={handleAddLocation} />;
  }

  if (!selectedApartment) {
    return <ErrorState message="No apartment selected" />;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SectionHeader isOpen={isOpen} />

      <div className="px-3 pb-4">
        {!isOpen && <CurrentApartmentDisplay apartment={selectedApartment} />}

        <CollapsibleContent className="space-y-2">
          {joinedApartments.map((apartment, index) => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              isSelected={apartment.id === selectedApartment.id}
              isDefault={index === 0}
              onClick={() => handleApartmentChange(apartment.id)}
            />
          ))}
          <AddLocationButton onClick={handleAddLocation} />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default NeighborhoodSelect;
