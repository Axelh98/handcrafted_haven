'use client';

import { useActionState } from 'react';
import { formatDate } from '@/app/lib/utils';
import { postReview, State } from '@/app/lib/actions';
import { useClientReviews } from '@/app/hooks/useClientReviews';
import styles from '@/app/ui/products/detail/Reviews.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Reviews({ id }: { id: string }) {
	const initialState: State = { message: '', errors: {} };
	const { reviews, reqMoreReviews, isLast } = useClientReviews(id);

	const postReviewWithId = postReview.bind(null, id);

	const [state, formAction] = useActionState(
		postReviewWithId as (state: State, payload: FormData) => Promise<State>,
		initialState
	);

	return (
		<section className={styles.reviewSection}>
			<article>
				<ul className={styles.reviews}>
					{reviews.map(({ id, name, content, post_date }) => (
						<li key={id} className={styles.reviewCard}>
							<p>
								<b>{name}</b>
								<i>{formatDate(post_date)}</i>
							</p>
							<p>{content}</p>
						</li>
					))}
					{!isLast && (
						<button onClick={reqMoreReviews}>
							<FontAwesomeIcon icon={faArrowDown} />
						</button>
					)}
				</ul>
			</article>
			<form action={formAction} className={styles.form}>
				<label>
					Name
					<input name='name' id='name' type='text' required />
				</label>
				<label>
					Comments
					<textarea name='content' id='content' required></textarea>
				</label>
				<button>Submit</button>
			</form>
			{state.errors?.name &&
				state.errors.name.map((error: string) => {
					console.error(error);
					return <></>;
				})}
			{state.errors?.content &&
				state.errors.content.map((error: string) => {
					console.error(error);
					return <></>;
				})}
		</section>
	);
}
