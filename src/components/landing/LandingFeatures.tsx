'use client';

import {
  Bell,
  FileText,
  MessageCircle,
  Shield,
  Users,
  Vote,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

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
        'border-border-light bg-surface/80 backdrop-blur-sm rounded-urbancare-3xl',
        'lg:hover:shadow-lg lg:hover:-translate-y-1 transition-all duration-300',
        'animate-slide-up'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-urbancare-xl bg-primary/10 flex items-center justify-center mb-4">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-urbancare-2xl font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-urbancare-base text-text-secondary leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export function LandingFeatures() {
  const t = useTranslation();

  const features: FeatureCardProps[] = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t.landing.discussions,
      description: t.landing.discussionsDesc,
      delay: 0,
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: t.landing.polls,
      description: t.landing.pollsDesc,
      delay: 100,
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t.landing.urgentNotifications,
      description: t.landing.urgentNotificationsDesc,
      delay: 200,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: t.landing.documents,
      description: t.landing.documentsDesc,
      delay: 300,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t.landing.chatTitle,
      description: t.landing.chatDesc,
      delay: 400,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t.landing.security,
      description: t.landing.securityDesc,
      delay: 500,
    },
  ];

  return (
    <section
      id="features"
      className="relative z-10 px-4 py-20 md:py-32 bg-surface/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-urbancare-full bg-tertiary/10 text-tertiary text-urbancare-base font-medium mb-4">
            {t.landing.features}
          </span>
          <h2 className="text-urbancare-7xl md:text-urbancare-8xl font-bold text-text-primary mb-4">
            {t.landing.everythingYouNeed}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t.landing.multiFunctionalPlatform}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
