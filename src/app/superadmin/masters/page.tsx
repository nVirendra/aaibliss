import { CreateMaster } from '@/app/components/ui/superadmin/master/buttons';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';
import Search from '@/app/components/ui/superadmin/modules/search';
import { TableData } from '@/app/components/ui/superadmin/master/table';

const Module = () => {
  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Masters', href: '/superadmin/masters', active: true },
          ]}
        />

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Masters</h1>
          <CreateMaster />
        </div>

        <Search />
        <TableData />
      </div>
    </main>
  );
};

export default Module;
