'use client';

import { Children, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useClientResize } from '@/app/hooks/useClientResize';
import styles from '@/app/ui/layout/navbar.module.css';
import { Providers } from '@/app/ui/providers';

export default function Navbar({ children }: { children: React.ReactElement[] }) {
  const navID = useId();
  const { desktopWidth: dskWidth } = useClientResize(768); // Umbral para la visualización en desktop

  const popover = dskWidth ? undefined : ''; // Solo asigna popover si el tamaño es menor

  const childs = Children.map(children, (child, i) => <li key={i}>{child}</li>);

  return (
    <>
      <Providers>
        {!dskWidth && (
          <button className={styles.menu} popoverTarget={navID}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <nav popover={popover} id={navID} className={styles.nav}>
          <ul className={styles.navList}>{childs}</ul>
        </nav>
      </Providers>
    </>
  );
}
