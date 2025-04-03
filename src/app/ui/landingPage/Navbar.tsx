'use client';

import { Children, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useClientResize } from '@/app/hooks/useClientResize';
import styles from './navbar.module.css';

export default function Navbar({ children }: { children: React.ReactElement[] }) {
	const navID = useId();

	const { desktopWidth: dskWidth } = useClientResize(768);

	const popover = dskWidth.matches ? {} : { popover: '' };

	const childs = Children.map(children, (child, i) => <li key={i}>{child}</li>);

	return (
		<>
			{!dskWidth.matches && (
				<button className={styles.menu} popoverTarget={navID}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			)}
			<nav {...popover} id={navID} className={styles.nav}>
				<ul className={styles.navList}>{childs}</ul>
			</nav>
		</>
	);
}
