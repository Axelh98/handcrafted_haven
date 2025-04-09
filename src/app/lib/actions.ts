'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { insertReview } from './data';
import { revalidatePath } from 'next/cache';

const SearchFormSchema = z.object({
	query: z.string()
});

const ReviewSchema = z.object({
	name: z.string(),
	content: z.string()
});

export type State = {
	errors?: {
		query?: string[];
		name?: string[];
		content?: string[];
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

export async function postReview(id: string, prevState: State, formData: FormData) {
	const validatedFields = ReviewSchema.safeParse({
		name: formData.get('name'),
		content: formData.get('content')
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Search Products.'
		};
	}

	const { name, content } = validatedFields.data;

	try {
		await insertReview(name, content, id);
	} catch (err) {
		console.error(err);
		return {
			message: 'Database Error: Failed to Post Review.'
		};
	}

	revalidatePath(`/products/${id}`);
	redirect(`/products/${id}`);
}
