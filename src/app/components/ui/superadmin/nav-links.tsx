'use client';
import { usePathname } from 'next/navigation';
import { Home, Package } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';

const links = [
  { name: 'Home', href: '/superadmin/dashboard', icon: Home },
  { name: 'modules', href: '/superadmin/modules', icon: Package },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="space-y-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center p-3 w-full rounded-lg transition',
                pathname === link.href
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200'
              )}
            >
              <LinkIcon className="w-6" />
              <p className="ml-2 hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavLinks;
