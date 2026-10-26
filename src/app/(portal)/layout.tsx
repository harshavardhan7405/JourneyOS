import { redirect } from 'next/navigation';
import { getCurrentUserFromServer } from '@/lib/auth';
import { Layout, Footer, Sidebar } from '@/components/portal/layout';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserFromServer();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <Layout user={user}>
      {children}
    </Layout>
  );
}
