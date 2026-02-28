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
        'lg:hover:shadow-lg lg:hover:-translate-y-1 transition-all duration-300',
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

const FEATURES: FeatureCardProps[] = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'დისკუსიები',
    description:
      'გამოაქვეყნე პოსტები, გაუზიარე იდეები და მონაწილეობა მიიღე მეზობლებთან დისკუსიებში',
    delay: 0,
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: 'გამოკითხვები',
    description:
      'შექმენი გამოკითხვები მნიშვნელოვან საკითხებზე და მიიღე საერთო გადაწყვეტილებები',
    delay: 100,
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'გადაუდებელი შეტყობინებები',
    description:
      'სწრაფად გააფრთხილე მეზობლები გადაუდებელი სიტუაციებისა და მნიშვნელოვანი სიახლეების შესახებ',
    delay: 200,
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'დოკუმენტები',
    description: 'შეინახე და გააზიარე მნიშვნელოვანი დოკუმენტები ერთ ადგილას',
    delay: 300,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'ჩატი',
    description: 'პირდაპირი კომუნიკაცია მეზობლებთან რეალურ დროში',
    delay: 400,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'უსაფრთხოება',
    description:
      'თქვენი მონაცემები დაცულია და ხელმისაწვდომია მხოლოდ თქვენი კორპუსისთვის',
    delay: 500,
  },
];

export function LandingFeatures() {
  return (
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
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
