'use client';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatRating } from '@/app/lib/utils';

export default function Rating({ avg, className }: { avg: number; className: string }) {
	return (
		<p className={className}>
			<FontAwesomeIcon icon={faStar} /> <b>{formatRating(avg)}</b>
		</p>
	);
}
