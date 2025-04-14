'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/ui/layout/Navbar'), { ssr: false });

export default Navbar;
