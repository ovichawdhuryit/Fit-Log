'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';

const Navbar = () => {
    const { plan, saved } = usePlan();
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Workouts' },
        { href: '/my-plan', label: 'My Plan' },
    ];

    const links = (
        <>
            {navLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={pathname === link.href ? 'text-[#C2F800] font-semibold' : ''}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <nav className="container mx-auto">
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link href="/" className="btn btn-ghost text-xl flex items-center gap-2">
                        <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
                        FITLOG
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 rounded-6xl">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <Link href="/my-plan" className="btn btn-sm rounded-full bg-[#C2F800] text-black border-none gap-2">
                        Plan <span className="badge badge-sm bg-black text-[#C2F800]">{plan.length}</span>
                    </Link>
                    <Link href="/my-plan" className="btn btn-sm rounded-full btn-outline gap-2">
                        Saved <span className="badge badge-sm badge-outline">{saved.length}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;