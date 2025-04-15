'use client';

import { useEffect, useState } from 'react';

export function useClientResize(width: number) {
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		// Esto se ejecuta solo en el cliente
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Establece el tamaño de la ventana al cargar
		setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		desktopWidth: windowWidth >= width,
		windowWidth
	};
}
