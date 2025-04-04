'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

const SearchFormSchema = z.object({
	query: z.string()
});

export type State = {
	errors?: {
		query?: string[];
	};
	message?: string | null;
};

export async function searchFromHome(prevState: State, formData: FormData) {
	const validatedFields = SearchFormSchema.safeParse({
		query: formData.get('query')
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Search Products.'
		};
	}

	const { query } = validatedFields.data;

	redirect(`/products?q=${query}`);
}
