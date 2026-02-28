import { Building2 } from 'lucide-react';

export function LandingFooter() {
  return (
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
  );
}
