'use client';

import { faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = { title: string; phone: string; email: string };

export default function ContactInfo({ title, phone, email }: Props) {
	return (
		<address>
			<h3>{title}</h3>
			<p>
				<FontAwesomeIcon icon={faPhone} />
				{phone}
			</p>
			<p>
				<FontAwesomeIcon icon={faAt} />
				{email}
			</p>
		</address>
	);
}
