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
    <div className="min-h-dvh bg-background overflow-x-hidden">
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
