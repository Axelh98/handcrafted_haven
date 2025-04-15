'use client';

import { faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/app/ui/sellers/profile/ContactInfo.module.css';

type Props = { title: string; phone: string; email: string };

export default function ContactInfo({ title, phone, email }: Props) {
	return (
		<address>
			<h3>{title}</h3>
			<p className={styles.item}>
				<FontAwesomeIcon icon={faPhone} />
				{phone}
			</p>
			<p className={styles.item}>
				<FontAwesomeIcon icon={faAt} />
				{email}
			</p>
		</address>
	);
}
