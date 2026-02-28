import Link from 'next/link';
import { ArrowRight, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function HeroMockUI() {
  return (
    <div
      className="mt-16 relative animate-slide-up"
      style={{ animationDelay: '300ms' }}
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Card className="rounded-3xl border-border-light bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mock Thread Card */}
              <Card className="bg-surface-secondary border-border-light rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20" />
                  <div className="flex-1">
                    <div className="h-3 bg-text-tertiary/20 rounded w-20 mb-1" />
                    <div className="h-2 bg-text-tertiary/10 rounded w-16" />
                  </div>
                </div>
                <div className="h-3 bg-text-tertiary/20 rounded w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 rounded w-3/4" />
              </Card>

              {/* Mock Poll Card */}
              <Card className="bg-surface-secondary border-border-light rounded-xl p-4">
                <div className="h-3 bg-primary/30 rounded w-24 mb-4" />
                <div className="space-y-2">
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                  <div className="h-8 bg-primary/10 rounded-lg" />
                </div>
              </Card>

              {/* Mock Urgent Card */}
              <Card className="bg-surface-secondary border-border-light border-l-4 border-l-error rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-error" />
                  <div className="h-3 bg-error/30 rounded w-16" />
                </div>
                <div className="h-3 bg-text-tertiary/20 rounded w-full mb-2" />
                <div className="h-3 bg-text-tertiary/20 rounded w-2/3" />
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <section className="relative z-10 px-4 pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="animate-slide-down">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            თქვენი ბინის მართვის პლატფორმა
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight animate-slide-up">
          მართე შენი <span className="bg-gradient-primary-text">კორპუსი</span>
          <br className="hidden md:block" />
          მარტივად
        </h1>

        <p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          ერთიანი პლატფორმა მეზობლებთან კომუნიკაციისთვის, გამოკითხვებისთვის,
          გადაუდებელი შეტყობინებებისთვის და დოკუმენტების მართვისთვის
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          <Link href="/auth/register">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-lg font-semibold"
            >
              დაწყება
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 rounded-2xl border-2 border-border lg:hover:border-primary lg:hover:text-primary lg:active:scale-[0.98] transition-all duration-300 text-lg"
            >
              გაიგე მეტი
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        <HeroMockUI />
      </div>
    </section>
  );
}
