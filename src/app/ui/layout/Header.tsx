<<<<<<< HEAD
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { fontHeading } from "@/app/ui/fonts";
import ShopCart from "@/app/ui/layout/ShopCart";
import Search from "@/app/ui/layout/Search";
import Navbar from "@/app/ui/layout/Navbar";
import CategoryList from "@/app/ui/layout/CategoryList";
import styles from "@/app/ui/layout/header.module.css";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/" className="link">
        <figure className={styles.logo}>
          <Image
            src="/images/logo.webp"
            width={70}
            height={70}
            alt="Handcrafted Haven logo"
          />
          <figcaption>
            <p className={fontHeading.className}>Handcrafted Haven</p>
          </figcaption>
        </figure>
      </Link>

      {/* Barra de búsqueda */}
      <Search placeholder="Search products..." />

      {/* Mensaje de bienvenida */}
      {status === "authenticated" && (
        <p className="link" style={{ textAlign: "center", marginTop: "-1rem" }}>
          Welcome, {session.user.name}!
        </p>
      )}

      {/* Navbar */}
      <Navbar>
        <CategoryList summary="Products" />
        <Link href="/sellers" className="link">
          Sellers
        </Link>

        {status === "loading" ? (
          <p className="link">Loading...</p>
        ) : session ? (
          <>
            <Link href="/user" className="link">
              Profile
            </Link>

            <Link
              href="#"
              className="link"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/login" });
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link href="/login" className="link">
            Login
          </Link>
        )}

        <ShopCart />
      </Navbar>
    </header>
  );
=======
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { fontHeading } from '@/app/ui/fonts';
import ShopCart from '@/app/ui/layout/ShopCart';
import Search from '@/app/ui/layout/Search';
import Navbar from '@/app/ui/layout/ClientNavbar';
import CategoryList from '@/app/ui/layout/CategoryList';
import styles from '@/app/ui/layout/header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href='/' className='link'>
				<figure className={styles.logo}>
					<Image src='/images/logo.webp' width={70} height={70} alt='Handcrafted Haven logo' />
					<figcaption>
						<p className={fontHeading.className}>Handcrafted Haven</p>
					</figcaption>
				</figure>
			</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Search placeholder='Search products...' />
			</Suspense>
			<Navbar>
				<CategoryList summary='Products' />
				<Link href='/sellers' className='link'>
					Sellers
				</Link>
				<Link href='/contact' className='link'>
					Contact
				</Link>
				<ShopCart />
			</Navbar>
		</header>
	);
>>>>>>> 22fc9c3089a466f2173f40265e0cc38d3538bcc9
}
