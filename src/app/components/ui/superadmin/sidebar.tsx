import NavLinks from './nav-links';

const SuperadminSidebar = () => {
  return (
    <aside className="bg-white w-64 p-4 border-r flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <NavLinks />
      </div>
      <button className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg">
        Logout
      </button>
    </aside>
  );
};

export default SuperadminSidebar;
