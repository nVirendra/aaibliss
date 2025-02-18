import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteMaster } from '@/app/lib/actions';

export function CreateMaster() {
  return (
    <Link
      href="/superadmin/masters/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Master</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMaster({ id }: { id: string }) {
  return (
    <Link
      href={`/superadmin/masters/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Edit className="text-blue-500 cursor-pointer hover:text-blue-700" />
    </Link>
  );
}

export function DeleteMaster({ id }: { id: string }) {
  const deleteMasterById = deleteMaster.bind(null, id);
  return (
    <form action={deleteMasterById}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-4" />
      </button>
    </form>
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
