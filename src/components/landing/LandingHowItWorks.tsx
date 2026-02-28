import Link from 'next/link';
import { ArrowRight, Building2, Vote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}

function HowItWorksVisual() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-3xl blur-3xl" />
      <Card className="relative rounded-3xl border-border-light bg-surface/90 backdrop-blur-md p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-success/10 border border-success/20">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="font-medium text-text-primary">ჩემი კორპუსი</div>
              <div className="text-sm text-text-secondary">
                12 აქტიური მეზობელი
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface-secondary">
              <div className="text-2xl font-bold text-primary mb-1">24</div>
              <div className="text-sm text-text-secondary">პოსტი</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-secondary">
              <div className="text-2xl font-bold text-tertiary mb-1">8</div>
              <div className="text-sm text-text-secondary">გამოკითხვა</div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-text-primary">
                ახალი გამოკითხვა
              </span>
            </div>
            <div className="text-sm text-text-secondary">
              სადარბაზოს რემონტის საკითხი
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const STEPS: StepCardProps[] = [
  {
    number: 1,
    title: 'შექმენი ანგარიში',
    description: 'გაიარე რეგისტრაცია და დაადასტურე შენი ვინაობა',
  },
  {
    number: 2,
    title: 'შეუერთდი კორპუსს',
    description: 'იპოვე და შეუერთდი შენს კორპუსს ან შექმენი ახალი',
  },
  {
    number: 3,
    title: 'დაიწყე კომუნიკაცია',
    description:
      'დაკავშირდი მეზობლებთან და მონაწილეობა მიიღე საერთო საკითხებში',
  },
];

export function LandingHowItWorks() {
  return (
    <section className="relative z-10 px-4 py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              როგორ მუშაობს
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              დაიწყე 3 მარტივი ნაბიჯით
            </h2>
            <div className="space-y-8">
              {STEPS.map((step) => (
                <StepCard key={step.number} {...step} />
              ))}
            </div>
            <div className="mt-10">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] lg:hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] lg:hover:-translate-y-1 lg:active:translate-y-0 transition-all duration-300 text-lg font-semibold"
                >
                  რეგისტრაცია უფასოა
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
