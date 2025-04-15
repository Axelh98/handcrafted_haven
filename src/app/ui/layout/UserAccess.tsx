'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useClientDetails } from '@/app/hooks/useClientDetails';

export default function UserAccess() {
	const { data: session, status } = useSession();
	const { detailsID, detailsRef } = useClientDetails();

	return (
		<>
			{!session && status !== 'loading' && (
				<Link href='/login' className='link'>
					Login
				</Link>
			)}

			{status === 'loading' && <p className='link'>Loading...</p>}

			{session && (
				<details id={detailsID} ref={detailsRef}>
					<summary className='link'>Welcome, {session.user.name}!</summary>
					<ul>
						<li>
							<Link href='/user' className='link'>
								Profile
							</Link>
						</li>
						<li>
							<Link
								href='#'
								className='link'
								onClick={(e) => {
									e.preventDefault();
									signOut();
								}}>
								Logout
							</Link>
						</li>
					</ul>
				</details>
			)}
		</>
	);
}
