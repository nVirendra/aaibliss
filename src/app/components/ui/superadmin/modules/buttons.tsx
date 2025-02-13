import { Edit, Eye, Plus } from 'lucide-react';
import Link from 'next/link';

export function CreateModule() {
  return (
    <Link
      href="/superadmin/modules/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Module</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateModule({ id }: { id: string }) {
  return (
    <Link
      href={`/superadmin/modules/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Edit className="text-blue-500 cursor-pointer hover:text-blue-700" />
    </Link>
  );
}

export function ShowModule({ id }: { id: string }) {
  return (
    <Link
      href={`/superadmin/modules/${id}/show`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Eye className="text-yellow-500 cursor-pointer hover:text-blue-700" />
    </Link>
  );
}
