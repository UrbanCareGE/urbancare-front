'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/i18n';

export function LandingCTA() {
  const t = useTranslation();

  return (
    <section className="relative z-10 px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <Card className="urbancare-rounded-4xl border-border-light bg-gradient-to-br from-primary/10 via-surface to-tertiary/10 backdrop-blur-md overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="urbancare-text-7xl md:urbancare-text-8xl font-bold text-text-primary mb-4">
              {t.landing.readyToStart}
            </h2>
            <p className="text-text-secondary urbancare-text-2xl mb-8 max-w-xl mx-auto">
              {t.landing.joinThousands}
            </p>
            <div className="flex justify-center">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 urbancare-rounded-3xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 urbancare-text-2xl font-semibold"
                >
                  {t.auth.signIn}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
