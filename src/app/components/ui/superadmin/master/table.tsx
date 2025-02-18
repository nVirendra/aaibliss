import { UpdateMaster } from './buttons';
import { fetchMasters } from '@/app/lib/actions';
import { DeleteMaster } from './buttons';

export async function TableData() {
  const masters = await fetchMasters();

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
            masters.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.master_name}</td>
                <td className="p-4">{item.master_code}</td>
                <td className="p-4 flex items-center space-x-3">
                  <UpdateMaster id={item._id} />
                  <DeleteMaster id={item._id} />
                  {/* <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-md border p-2 hover:bg-gray-100"
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
                  </button> */}
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
