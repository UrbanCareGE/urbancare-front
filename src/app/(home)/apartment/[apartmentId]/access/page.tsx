'use client';

import React, { use, useState } from 'react';
import { toast } from 'sonner';
import {
  DoorOpen,
  ArrowUpDown,
  Fence,
  Loader2,
  Power,
  PhoneCall,
} from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccessControllers } from '@/hooks/query/access/use-access-controllers';
import { useOpenDoor } from '@/hooks/query/access/use-open-door';
import { useOpenGate } from '@/hooks/query/access/use-open-gate';
import { useActivateElevator } from '@/hooks/query/access/use-activate-elevator';
import { useCallElevator } from '@/hooks/query/access/use-call-elevator';
import { cn } from '@/lib/utils';
import type {
  AccessControllerDTO,
  AccessDeviceDTO,
} from '@/model/dto/access.dto';

interface PageProps {
  params: Promise<{ apartmentId: string }>;
}

const USER_BLOCK = 'A';

interface FlatDevice {
  controllerId: string;
  deviceIndex: number;
  device: AccessDeviceDTO;
}

function flatten(
  controllers: AccessControllerDTO[],
  pick: (c: AccessControllerDTO) => AccessDeviceDTO[]
): FlatDevice[] {
  return controllers.flatMap((c) =>
    pick(c).map((device, deviceIndex) => ({
      controllerId: c.id,
      deviceIndex,
      device,
    }))
  );
}

export default function AccessPage({ params }: PageProps) {
  const { apartmentId } = use(params);
  const t = useTranslation();
  const { data: controllers, isLoading, isError } = useAccessControllers(
    apartmentId,
    USER_BLOCK
  );

  const openDoor = useOpenDoor(apartmentId);
  const openGate = useOpenGate(apartmentId);
  const activateElevator = useActivateElevator(apartmentId);
  const callElevator = useCallElevator(apartmentId, USER_BLOCK);

  const matchVar = (
    vars: { controllerId: string; deviceIndex: number } | undefined,
    controllerId: string,
    deviceIndex: number
  ) =>
    !!vars &&
    vars.controllerId === controllerId &&
    vars.deviceIndex === deviceIndex;

  if (isLoading) {
    return (
      <div className="flex-1 w-full p-3 lg:p-0 space-y-5">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full urbancare-rounded-3xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 w-full p-3 lg:p-0">
        <div className="urbancare-rounded-3xl border border-destructive/30 bg-destructive/5 p-5 urbancare-text-sm text-destructive">
          {t.access.loadFailed}
        </div>
      </div>
    );
  }

  const list = controllers ?? [];
  const doors = flatten(list, (c) => c.doors);
  const elevators = flatten(list, (c) => c.elevators);
  const gates = flatten(list, (c) => c.gates);

  if (doors.length === 0 && elevators.length === 0 && gates.length === 0) {
    return (
      <div className="flex-1 w-full p-3 lg:p-0">
        <div className="urbancare-rounded-3xl bg-surface p-6 urbancare-text-sm text-text-secondary text-center">
          {t.access.noControllers}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-3 lg:p-0 space-y-6">
      {doors.length > 0 && (
        <Section label={t.access.doors}>
          {doors.map((d) => (
            <ActionCard
              key={`${d.controllerId}-${d.deviceIndex}`}
              icon={<DoorOpen className="w-5 h-5" />}
              title={d.device.name}
              subtitle={t.access.openDoor}
              onAction={() =>
                openDoor.mutate({
                  controllerId: d.controllerId,
                  deviceIndex: d.deviceIndex,
                })
              }
              pending={
                openDoor.isPending &&
                matchVar(openDoor.variables, d.controllerId, d.deviceIndex)
              }
            />
          ))}
        </Section>
      )}

      {elevators.length > 0 && (
        <Section label={t.access.elevators}>
          <CallElevatorCard
            onCall={(floor) => callElevator.mutate({ floor })}
            pending={callElevator.isPending}
          />
          {elevators.map((d) => (
            <ActionCard
              key={`${d.controllerId}-${d.deviceIndex}`}
              icon={<Power className="w-5 h-5" />}
              title={d.device.name}
              subtitle={t.access.activate}
              onAction={() =>
                activateElevator.mutate({
                  controllerId: d.controllerId,
                  deviceIndex: d.deviceIndex,
                })
              }
              pending={
                activateElevator.isPending &&
                matchVar(
                  activateElevator.variables,
                  d.controllerId,
                  d.deviceIndex
                )
              }
            />
          ))}
        </Section>
      )}

      {gates.length > 0 && (
        <Section label={t.access.gates}>
          {gates.map((d) => (
            <ActionCard
              key={`${d.controllerId}-${d.deviceIndex}`}
              icon={<Fence className="w-5 h-5" />}
              title={d.device.name}
              subtitle={t.access.openGate}
              onAction={() =>
                openGate.mutate({
                  controllerId: d.controllerId,
                  deviceIndex: d.deviceIndex,
                })
              }
              pending={
                openGate.isPending &&
                matchVar(openGate.variables, d.controllerId, d.deviceIndex)
              }
            />
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="px-1 urbancare-text-xs font-semibold text-text-tertiary uppercase tracking-[0.1em] leading-tight-georgian">
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </section>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onAction,
  pending,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onAction: () => void;
  pending: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onAction}
      disabled={pending}
      className={cn(
        'urbancare-rounded-3xl bg-surface p-4 text-left',
        'flex flex-col gap-4 min-h-[128px]',
        'transition-all lg:hover:shadow-md lg:active:scale-[0.98]',
        'disabled:opacity-60 disabled:cursor-not-allowed'
      )}
    >
      <div className="flex items-center justify-center w-11 h-11 urbancare-rounded-2xl bg-primary/[0.08] text-primary">
        {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
      </div>
      <div className="mt-auto space-y-0.5">
        <p className="urbancare-text-base font-semibold text-text-primary truncate leading-tight-georgian">
          {title}
        </p>
        <p className="urbancare-text-xs text-text-tertiary">{subtitle}</p>
      </div>
    </button>
  );
}

function CallElevatorCard({
  onCall,
  pending,
}: {
  onCall: (floor: number) => void;
  pending: boolean;
}) {
  const t = useTranslation();
  const [floor, setFloor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(floor, 10);
    if (Number.isNaN(parsed)) {
      toast.error(t.access.floorMustBeNumber);
      return;
    }
    onCall(parsed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-2 urbancare-rounded-3xl bg-surface p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 urbancare-rounded-2xl bg-primary/[0.08] text-primary">
          <PhoneCall className="w-5 h-5" />
        </div>
        <p className="urbancare-text-base font-semibold text-text-primary leading-tight-georgian">
          {t.access.callElevator}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          inputMode="numeric"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          placeholder={t.access.floor}
          className="h-11 flex-1"
        />
        <Button
          type="submit"
          disabled={pending || floor.trim() === ''}
          className="shrink-0 h-11"
        >
          {pending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <PhoneCall className="w-4 h-4" />
          )}
          {t.access.callElevator}
        </Button>
      </div>
    </form>
  );
}
