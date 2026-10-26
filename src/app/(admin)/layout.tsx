import { redirect } from 'next/navigation';
import { getCurrentUserFromServer, requireAdmin } from '@/lib/auth';
import { Layout } from '@/components/admin/layout';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminCheck = await requireAdmin();
  if (!adminCheck) redirect('/sign-in');

  const user = await getCurrentUserFromServer();
  return (
    <Layout user={user}>
      {children}
    </Layout>
  );
}
