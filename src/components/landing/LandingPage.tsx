'use client';

import { LandingBackground } from './LandingBackground';
import { LandingHeader } from './LandingHeader';
import { LandingHero } from './LandingHero';
import { LandingFeatures } from './LandingFeatures';
import { LandingHowItWorks } from './LandingHowItWorks';
import { LandingJoinSection } from './LandingJoinSection';
import { LandingCTA } from './LandingCTA';
import { LandingFooter } from './LandingFooter';

export function LandingPage() {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-background">
      <LandingBackground />
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingJoinSection />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
