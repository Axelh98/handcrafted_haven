'use client';

import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/app/ui/layout/footer.module.css';
import { useClientResize } from '@/app/hooks/useClientResize';

export default function Footer() {
	const { desktopWidth } = useClientResize(768);

	const year = new Date().getFullYear();
	const university = 'BYU-Idaho';
	const course = 'WDD 430';
	const team = 'T06';

	return (
		<footer className={styles.footer}>
			<p>
				<span>
					<FontAwesomeIcon icon={faCopyright} />
					{year} Handcrafted Haven
				</span>
				{desktopWidth && ` - `}
				{!desktopWidth && ``}
				<span>
					{course} {team} {university}
				</span>
			</p>
		</footer>
	);
}
