import { Card } from '@/app/components/ui/superadmin/card';
export default function SuperAdminDashboard() {
  return (
    <main className="p-6">
      <Card className="p-4 mb-4 ">Welcome to the Super Admin Dashboard!</Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">Active Modules</Card>
      </div>
    </main>
  );
}
