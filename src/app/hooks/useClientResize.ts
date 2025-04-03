'use client';

import { useEffect, useState } from 'react';

export function useClientResize(width: number) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== undefined) {
				setWindowWidth(window.innerWidth);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return { desktopWidth: matchMedia(`(min-width: ${width}px)`), windowWidth };
}
