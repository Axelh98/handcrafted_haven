'use client';

import { useActionState } from 'react';
import { useClientReviews } from '@/app/hooks/useClientReviews';
import { postReview, State } from '@/app/lib/actions';
import { ReviewForCard } from '@/app/lib/definitions';

export default function Reviews({ id }: { id: string }) {
	const initialState: State = { message: null, errors: {} };
	const { reviews }: { reviews: ReviewForCard[] } = useClientReviews(id);

	const postReviewWithId = postReview.bind(null, id);

	const [state, formAction] = useActionState(postReviewWithId, initialState);

	return (
		<section>
			<article>
				<ul>
					{reviews.map(({ id, name, content, post_date }) => (
						<li key={id}>
							<b>{name}</b>
							<p>{content}</p>
							<i>{post_date.toLocaleString()}</i>
						</li>
					))}
				</ul>
			</article>
			<form action={formAction}>
				<label>
					Name:
					<input name='name' id='name' type='text' required />
				</label>
				<label>
					Comments:
					<textarea name='content' id='content' required></textarea>
				</label>
				<button>Submit</button>
			</form>
			{state.errors?.name && state.errors.name.map((error: string) => console.error(error))}
			{state.errors?.content && state.errors.content.map((error: string) => console.error(error))}
		</section>
	);
}
