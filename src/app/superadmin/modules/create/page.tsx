import Form from '@/app/components/ui/superadmin/modules/create-form';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';

const CreateModule = () => {
  return (
    <main className="p-6">
      <div className="min-h-screen bg-gray-50 p-8">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Dashboard', href: '/superadmin/dashboard' },
            { label: 'Modules', href: '/superadmin/modules' },
            {
              label: 'Create Module',
              href: 'create',
              active: true,
            },
          ]}
        />
        <Form />
      </div>
    </main>
  );
};

export default CreateModule;
