import { notFound } from 'next/navigation';
import { fetchModuleById } from '@/app/lib/actions';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';

interface ModuleProps {
  params: { id: string };
}

export default async function ModuleDetailPage({ params }: ModuleProps) {
  const param = await params;
  const id = param.id;
  const response = await fetchModuleById(id);

  if (!response.success) {
    notFound();
  }

  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Modules', href: '/superadmin/modules' },
            {
              label: 'Edit Module',
              href: `/superadmin/modules/${id}/edit`,
              active: true,
            },
          ]}
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{response.result.module_name}</h1>
          <p className="mt-2 text-gray-600">{response.result.description}</p>
          <p className="mt-2">
            <strong>Code:</strong> {response.result.module_code}
          </p>
          <p className="mt-2">
            <strong>Base Price:</strong> ${response.result.base_price}
          </p>
          <p className="mt-2">
            <strong>Status:</strong> {response.result.status}
          </p>
        </div>
      </div>
    </main>
  );
}
