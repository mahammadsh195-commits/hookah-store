import Link from 'next/link';

function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold">
              Hookah Store
            </Link>
          </div>
          <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-500 hover:text-gray-900">
              Cart (0)
            </Link>
            <Link href="/login" className="text-gray-500 hover:text-gray-900">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Hookah Store, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
