'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Bell,
  Building2,
  ChevronDown,
  FileText,
  MessageCircle,
  Shield,
  Users,
  Vote,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/provider/AuthProvider';

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        'border-border-light bg-surface/80 backdrop-blur-sm rounded-2xl',
        'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// Step Card Component
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

export function LandingPage() {
  const user = useAuth();
  return (
    <div className="min-h-dvh bg-background overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-tertiary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-primary/15 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-4 md:px-8">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              UrbanCare
            </span>
          </div>
          {!user.isAuthenticated && (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-primary"
                >
                  შესვლა
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="rounded-xl bg-gradient-primary">
                  რეგისტრაცია
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
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
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
              >
                დაწყება
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 text-lg"
              >
                გაიგე მეტი
                <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Hero Visual */}
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
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-4 py-20 md:py-32 bg-surface/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-tertiary/10 text-tertiary text-sm font-medium mb-4">
              ფუნქციები
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              ყველაფერი რაც გჭირდება
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              მრავალფუნქციური პლატფორმა შენი კორპუსის ეფექტური მართვისთვის
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="დისკუსიები"
              description="გამოაქვეყნე პოსტები, გაუზიარე იდეები და მონაწილეობა მიიღე მეზობლებთან დისკუსიებში"
              delay={0}
            />
            <FeatureCard
              icon={<Vote className="w-6 h-6" />}
              title="გამოკითხვები"
              description="შექმენი გამოკითხვები მნიშვნელოვან საკითხებზე და მიიღე საერთო გადაწყვეტილებები"
              delay={100}
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="გადაუდებელი შეტყობინებები"
              description="სწრაფად გააფრთხილე მეზობლები გადაუდებელი სიტუაციებისა და მნიშვნელოვანი სიახლეების შესახებ"
              delay={200}
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="დოკუმენტები"
              description="შეინახე და გააზიარე მნიშვნელოვანი დოკუმენტები ერთ ადგილას"
              delay={300}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="ჩატი"
              description="პირდაპირი კომუნიკაცია მეზობლებთან რეალურ დროში"
              delay={400}
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="უსაფრთხოება"
              description="თქვენი მონაცემები დაცულია და ხელმისაწვდომია მხოლოდ თქვენი კორპუსისთვის"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
                <StepCard
                  number={1}
                  title="შექმენი ანგარიში"
                  description="გაიარე რეგისტრაცია და დაადასტურე შენი ვინაობა"
                />
                <StepCard
                  number={2}
                  title="შეუერთდი კორპუსს"
                  description="იპოვე და შეუერთდი შენს კორპუსს ან შექმენი ახალი"
                />
                <StepCard
                  number={3}
                  title="დაიწყე კომუნიკაცია"
                  description="დაკავშირდი მეზობლებთან და მონაწილეობა მიიღე საერთო საკითხებში"
                />
              </div>

              <div className="mt-10">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
                  >
                    რეგისტრაცია უფასოა
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-3xl blur-3xl" />
              <Card className="relative rounded-3xl border-border-light bg-surface/90 backdrop-blur-md p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-success/10 border border-success/20">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">
                        ჩემი კორპუსი
                      </div>
                      <div className="text-sm text-text-secondary">
                        12 აქტიური მეზობელი
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-secondary">
                      <div className="text-2xl font-bold text-primary mb-1">
                        24
                      </div>
                      <div className="text-sm text-text-secondary">პოსტი</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-secondary">
                      <div className="text-2xl font-bold text-tertiary mb-1">
                        8
                      </div>
                      <div className="text-sm text-text-secondary">
                        გამოკითხვა
                      </div>
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                    className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-gradient-primary shadow-[0_4px_20px_rgba(var(--color-primary)/0.4)] hover:shadow-[0_6px_28px_rgba(var(--color-primary)/0.5)] hover:-translate-y-1 transition-all duration-300 text-lg font-semibold"
                  >
                    უფასო რეგისტრაცია
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-10 rounded-2xl border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 text-lg"
                  >
                    შესვლა
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 border-t border-border-light bg-surface/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-text-primary">UrbanCare</span>
          </div>
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} UrbanCare. ყველა უფლება დაცულია.
          </p>
        </div>
      </footer>
    </div>
  );
}
