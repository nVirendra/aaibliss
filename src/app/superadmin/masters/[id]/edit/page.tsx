import Form from '@/app/components/ui/superadmin/master/edit-form';
import Breadcrumbs from '@/app/components/ui/superadmin/master/Breadcrumb';
import { fetchMasterById } from '@/app/lib/actions';
import { notFound } from 'next/navigation';

const EditMaster = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const response = await fetchMasterById(id);
  if (!response.success) {
    notFound();
  }
  const masterData = JSON.parse(JSON.stringify(response.result));

  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Masters', href: '/superadmin/masters' },
            {
              label: 'Edit Master',
              href: `/superadmin/masters/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form master={masterData} />
      </div>
    </main>
  );
};

export default EditMaster;
