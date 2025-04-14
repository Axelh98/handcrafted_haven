'use client';

import { useEffect, useState } from 'react';

export function useClientResize(width: number) {
  const [windowWidth, setWindowWidth] = useState<number>(0); // Inicializa con un valor predeterminado

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
  }, []); // Este efecto se ejecuta solo una vez, cuando el componente se monta en el cliente

  return {
    desktopWidth: windowWidth >= width, // Esto compara el tamaño actual con el umbral proporcionado
    windowWidth
  };
}
