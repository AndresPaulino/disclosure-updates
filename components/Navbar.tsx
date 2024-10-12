"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">Disclosure Portal</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/portal" className="text-white hover:text-gray-300">Portal</Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-white hover:text-gray-300">Admin</Link>
              )}
              <Button onClick={handleLogout} variant="outline" className="text-white hover:text-gray-300">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link href="/" className="text-white hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;