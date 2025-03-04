import { CreateMaster } from '@/app/components/ui/superadmin/master/buttons';
import Breadcrumbs from '@/app/components/ui/superadmin/modules/Breadcrumb';
import SearchBar from '@/app/components/ui/superadmin/modules/search';
import { TableData } from '@/app/components/ui/superadmin/master/table';
import { Suspense } from 'react';
import { MastersTableSkeleton } from '@/app/components/ui/superadmin/master/MastersTableSkeleton';
import Pagination from '@/app/components/ui/superadmin/master/pagination';
import { fetchtMastersPages } from '@/app/lib/actions';

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

  const totalPages = await fetchtMastersPages(query);
  console.log('total master count', totalPages);

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
        <Suspense key={query + currentPage} fallback={<MastersTableSkeleton />}>
          <TableData query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
