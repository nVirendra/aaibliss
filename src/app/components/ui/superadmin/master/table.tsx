import { UpdateMaster } from './buttons';

import { DeleteMaster } from './buttons';
import { MasterField } from '@/app/lib/definitions';

export async function TableData({ masters }: { masters: MasterField[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table className="min-w-full text-left text-gray-600 border">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-4">S.No</th>
            <th className="p-4">Name</th>
            <th className="p-4">Code</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {masters.length > 0 ? (
            masters.map((item: MasterField, index: number) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.master_name}</td>
                <td className="p-4">{item.master_code}</td>
                <td className="p-4 flex items-center space-x-3">
                  <UpdateMaster id={item._id} />
                  <DeleteMaster id={item._id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
