import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import NavLinks from './nav-links';
import { AppLogo } from '../app-logo';

export default function Sidebar() {
  return (
    <nav
      className={`
        border-r 
        bg-sidebar 
        text-sidebar-foreground
        md:w-64
      `}>
      <Link
        className="flex items-center gap-2 px-4 pt-6 [&>div>span]:hidden md:[&>div>span]:block"
        href="/dashboard">
        <AppLogo />
      </Link>
      <NavLinks />
      <form
        action={async () => {
          'use server';

          await signOut({ redirectTo: '/sign-in' });
        }}>
        <button
          type="submit"
          className="mt-4 w-full py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <span className="flex items-center gap-3 px-4">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </span>
        </button>
      </form>
    </nav>
  );
}
