'use client';

import Link from 'next/link';
import { ArrowRight, Building2, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/i18n';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-urbancare-full bg-primary text-white flex items-center justify-center font-bold text-urbancare-2xl shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
        <p className="text-urbancare-base text-text-secondary">{description}</p>
      </div>
    </div>
  );
}

function HowItWorksVisual() {
  const t = useTranslation();

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-urbancare-4xl blur-3xl" />
      <Card className="relative rounded-urbancare-4xl border-border-light bg-surface/90 backdrop-blur-md p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-urbancare-3xl bg-success/10 border border-success/20">
            <div className="w-10 h-10 rounded-urbancare-full bg-success/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="font-medium text-text-primary">{t.landing.myBuilding}</div>
              <div className="text-urbancare-base text-text-secondary">
                {t.landing.activeNeighbors.replace('{count}', '12')}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-urbancare-xl bg-surface-secondary">
              <div className="text-urbancare-5xl font-bold text-primary mb-1">24</div>
              <div className="text-urbancare-base text-text-secondary">{t.landing.post}</div>
            </div>
            <div className="p-4 rounded-urbancare-xl bg-surface-secondary">
              <div className="text-urbancare-5xl font-bold text-tertiary mb-1">8</div>
              <div className="text-urbancare-base text-text-secondary">{t.landing.newPoll}</div>
            </div>
          </div>
          <div className="p-4 rounded-urbancare-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-4 h-4 text-primary" />
              <span className="text-urbancare-base font-medium text-text-primary">
                {t.landing.newPoll}
              </span>
            </div>
            <div className="text-urbancare-base text-text-secondary">
              {t.landing.entranceRenovation}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function LandingHowItWorks() {
  const t = useTranslation();

  const steps: StepCardProps[] = [
    {
      number: 1,
      title: t.landing.createAccountStep,
      description: t.landing.registerAndVerify,
    },
    {
      number: 2,
      title: t.landing.joinBuildingStep,
      description: t.landing.findOrCreateBuilding,
    },
    {
      number: 3,
      title: t.landing.startCommunication,
      description: t.landing.connectWithNeighbors,
    },
  ];

  return (
    <section className="relative z-10 px-4 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-urbancare-full bg-primary/10 text-primary text-urbancare-base font-medium mb-4">
              {t.landing.howItWorks}
            </span>
            <h2 className="text-urbancare-7xl md:text-urbancare-8xl font-bold text-text-primary mb-6">
              {t.landing.threeSimpleSteps}
            </h2>
            <div className="space-y-8">
              {steps.map((step) => (
                <StepCard key={step.number} {...step} />
              ))}
            </div>
            <div className="mt-10">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-urbancare-3xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-urbancare-2xl font-semibold"
                >
                  {t.landing.registrationFree}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <HowItWorksVisual />
        </div>
      </div>
    </section>
  );
}
