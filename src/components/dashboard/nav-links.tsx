'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Invoices',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
    },
    { name: 'Sellers', href: '/dashboard/sellers', icon: UserGroupIcon },
  ];

  return (
    <ul className="pt-4">
      {links.map(link => (
        <Link key={link.name} href={link.href}>
          <div
            className={clsx('py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground', {
              'bg-sidebar-accent text-sidebar-accent-foreground': pathname === link.href,
            })}>
            <span className="flex items-center gap-3 px-4">
              <link.icon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </span>
          </div>
        </Link>
      ))}
    </ul>
  );
}
