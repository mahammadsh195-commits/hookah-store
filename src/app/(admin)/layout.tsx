import Link from 'next/link';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link href="/admin" className="text-xl font-bold">
          Admin Portal
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-gray-800">
          Dashboard
        </Link>
        <Link href="/admin/products" className="block px-4 py-2 rounded-md hover:bg-gray-800">
          Products
        </Link>
        <Link href="/admin/orders" className="block px-4 py-2 rounded-md hover:bg-gray-800">
          Orders
        </Link>
        <Link href="/admin/campaigns" className="block px-4 py-2 rounded-md hover:bg-gray-800">
          Campaigns
        </Link>
      </nav>
    </div>
  );
}

function Topbar() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <div className="font-medium text-gray-800">Dashboard</div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">admin@example.com</span>
        <button className="text-sm text-red-600 hover:text-red-800">Logout</button>
      </div>
    </header>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
