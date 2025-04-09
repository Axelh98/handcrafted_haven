'use client';

import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ReviewCount({ count, className }: { count: number; className: string }) {
	return (
		<p className={className}>
			<FontAwesomeIcon icon={faComments} /> <b>{count}</b>
		</p>
	);
}
