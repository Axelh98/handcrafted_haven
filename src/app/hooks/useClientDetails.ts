'use client';

import { useEffect, useId, useRef } from 'react';

export function useClientDetails() {
	const detailsRef = useRef(null);
	const detailsID = useId();

	useEffect(() => {
		const closeDetails = (event: React.MouseEvent) => {
			const { target } = event;
			const details = detailsRef.current;

			if (details.open) {
				const stillMatch =
					!target.matches(`#${detailsID}`) &&
					!target.matches(`#${detailsID} summary`) &&
					!target.matches(`#${detailsID} li`) &&
					!target.matches(`#${detailsID} li a`);

				if (stillMatch) {
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
