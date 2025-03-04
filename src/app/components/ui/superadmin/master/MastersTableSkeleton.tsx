export function MastersTableSkeleton() {
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
          {[...Array(5)].map((_, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 animate-pulse"
            >
              <td className="p-4">
                <div className="h-4 w-8 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </td>
              <td className="p-4 flex items-center space-x-3">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
