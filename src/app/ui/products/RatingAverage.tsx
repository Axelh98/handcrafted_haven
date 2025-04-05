import { formatRating } from '@/app/lib/utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RatingAverage({ avg }: { avg: number }) {
	return (
		<p>
			<FontAwesomeIcon icon={faStar} /> <b>{formatRating(avg)}</b>
		</p>
	);
}
