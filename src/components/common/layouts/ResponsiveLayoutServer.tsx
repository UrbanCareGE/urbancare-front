import { headers } from 'next/headers';
import ResponsiveLayout from './ResponsiveLayout';

interface Props {
  children: React.ReactNode;
}

export default async function ResponsiveLayoutServer({ children }: Props) {
  const headersList = await headers();
  const agent = headersList.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(agent);

  return (
    <ResponsiveLayout initialIsMobile={isMobile}>{children}</ResponsiveLayout>
  );
}
