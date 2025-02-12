import Form from '@/app/components/ui/superadmin/modules/edit-form';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';
import { fetchModuleById } from '@/app/lib/actions';
import { notFound } from 'next/navigation';

const EditModule = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
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
        <Form module={response.result} />
      </div>
    </main>
  );
};

export default EditModule;
