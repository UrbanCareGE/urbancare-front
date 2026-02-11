import Link from 'next/link';
import { useEffect, useState } from 'react';

type LoginFooterProps = {
  className?: string;
};

export const LoginFooter = ({ className }: LoginFooterProps) => {
  return (
    <div>
      {/*<div className={`text-center py-6 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>*/}
      {/*    <p className="text-text-secondary text-sm">*/}
      {/*        არ გაქვთ ანგარიში?{" "}*/}
      {/*        <Link*/}
      {/*            href="/auth/register"*/}
      {/*            className="text-primary font-semibold hover:text-primary-dark transition-colors"*/}
      {/*        >*/}
      {/*            შექმნა*/}
      {/*        </Link>*/}
      {/*    </p>*/}
      {/*</div>*/}

      {/*/!* Terms *!/*/}
      {/*<div className={`text-center pb-8 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>*/}
      {/*    <p className="text-text-muted text-xs leading-relaxed">*/}
      {/*        By continuing, you agree to our{" "}*/}
      {/*        <Link href="/terms"*/}
      {/*              className="text-text-secondary underline underline-offset-2 hover:text-primary">*/}
      {/*            Terms of Service*/}
      {/*        </Link>{" "}*/}
      {/*        and{" "}*/}
      {/*        <Link href="/privacy"*/}
      {/*              className="text-text-secondary underline underline-offset-2 hover:text-primary">*/}
      {/*            Privacy Policy*/}
      {/*        </Link>*/}
      {/*    </p>*/}
      {/*</div>*/}
    </div>
  );
};
