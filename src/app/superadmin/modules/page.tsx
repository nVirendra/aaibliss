import { CreateModule } from '@/app/components/ui/superadmin/modules/buttons';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';
import Search from '@/app/components/ui/superadmin/modules/search';
import TableData from '@/app/components/ui/superadmin/modules/table';

const Module = () => {
  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Modules', href: '/superadmin/modules', active: true },
          ]}
        />

        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Modules</h1>
          <CreateModule />
        </div>

        <Search />
        <TableData />
      </div>
    </main>
  );
};

export default Module;
