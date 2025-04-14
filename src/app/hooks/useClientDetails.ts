'use client';

import { useEffect, useId, useRef } from 'react';

export function useClientDetails() {
	const detailsRef = useRef<HTMLDetailsElement | null>(null);
	const detailsID = useId();

	useEffect(() => {
		const closeDetails = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			const details = detailsRef.current;

			if (details && details.open) {
				const stillMatch = details.contains(target);

				if (!stillMatch) {
					details.removeAttribute('open');
				}
			}
		};

		document.addEventListener('click', closeDetails);
		document.addEventListener('mouseover', closeDetails);

		return () => {
			document.removeEventListener('click', closeDetails);
			document.removeEventListener('mouseover', closeDetails);
		};
	}, []);

	return { detailsID, detailsRef };
}
