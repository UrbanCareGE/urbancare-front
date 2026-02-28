import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function LandingCTA() {
  return (
    <section className="relative z-10 px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-3xl border-border-light bg-gradient-to-br from-primary/10 via-surface to-tertiary/10 backdrop-blur-md overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              მზად ხარ დასაწყებად?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              შეუერთდი ათასობით მომხმარებელს, რომლებიც უკვე სარგებლობენ
              UrbanCare-ით
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-lg font-semibold"
                >
                  უფასო რეგისტრაცია
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 rounded-2xl border-2 border-border lg:hover:border-primary lg:hover:text-primary lg:active:scale-[0.98] transition-all duration-300 text-lg"
                >
                  შესვლა
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
