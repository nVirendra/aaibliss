import { CreateMaster } from '@/app/components/ui/superadmin/master/buttons';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';
import SearchBar from '@/app/components/ui/superadmin/modules/search';
import { TableData } from '@/app/components/ui/superadmin/master/table';
import { fetchMastersBySearch } from '@/app/lib/actions';

import React from 'react';

export default async function Module(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const masters = await fetchMastersBySearch(query);

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

        <SearchBar placeholder="Search masters..." />
        <TableData masters={masters} />
      </div>
    </main>
  );
}
