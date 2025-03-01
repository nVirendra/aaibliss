import { Metadata } from 'next';
import Form from '../components/ui/create-form';
import { fetchGroupMasters } from '../lib/data';
export const metadata: Metadata = {
  title: 'Register',
};

export default async function Register() {
  const masterData = await fetchGroupMasters();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <Form masterData={masterData} />
    </div>
  );
}
