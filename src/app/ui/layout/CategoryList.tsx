'use client';

import Link from 'next/link';
import { useClientDetails } from '@/app/hooks/useClientDetails';
import { useClientCategories } from '@/app/hooks/useClientCategories';

export default function CategoryList({ summary }: { summary: string }) {
	const { detailsID, detailsRef } = useClientDetails();
	const { categories } = useClientCategories();

	return (
		<details id={detailsID} ref={detailsRef}>
			<summary className='link'>{summary}</summary>
			<ul>
				{categories.map(({ id, name }) => (
					<li key={id}>
						<Link href={`/products/?category=${id}`} className='link'>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</details>
	);
}
