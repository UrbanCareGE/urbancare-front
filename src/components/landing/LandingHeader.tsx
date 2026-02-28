import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/provider/AuthProvider';

export function LandingHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="relative z-10 px-4 py-4 md:px-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-text-primary">UrbanCare</span>
        </div>

        {!isAuthenticated && (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary lg:hover:text-primary"
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
  );
}
