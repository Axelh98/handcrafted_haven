import { z } from 'zod';
import NextAuth from 'next-auth';

declare module 'next-auth' {
	  interface Session {
	    user: {
	      id: string;
	      name: string;
	      email: string;
	    };
	  }
	
	  interface User {
	    id: string;
	    name: string;
	    email: string;
	  }
	}
	

interface User {
	id: string;
	name: string;
	email: string;
	password: string;
}

interface Category {
	id: string;
	name: string;
}

interface SellerProfile {
	id: string;
	name: string;
	about: string;
	phone: string;
	email: string;
	image_url: string;
	user_id: string;
}

interface Product {
	id: string;
	name: string;
	description: string;
	image_url?: string;
	price: number;
	profile_id: string;
	category_id: string;
}

interface Review {
	id: string;
	name: string;
	content: string;
	post_date: Date;
	product_id: string;
}

interface Rate {
	id: string;
	rate: number;
	rate_date: string;
	product_id: string;
}

interface RawProductForCard {
	id: string;
	name: string;
	image_url: string;
	price: number;
	profile_id: string;
	profile_name: string;
	rate_avg: number;
}

interface RawProductDetail {
	title: string;
	description: string;
	image: string;
	price: number;
	profile_id: string;
	profile: string;
	category_id: string;
	category: string;
	rating: number;
	count: number;
}

type ReviewForCard = Omit<Review, 'product_id'>;

type SellerProfileDetail = Omit<SellerProfile, 'id'>;

interface ProductForCard {
	id: string;
	name: string;
	image_url: string;
	price: string;
	profile_id: string;
	profile_name: string;
	rate_avg: number;
}

export type {
	User,
	SellerProfile,
	Category,
	Product,
	Review,
	Rate,
	RawProductForCard,
	ProductForCard,
	RawProductDetail,
	ReviewForCard,
	SellerProfileDetail
};

// Signup form zod schema
// Signup form zod schema

export const SignupFormSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	password: z
		.string()
		.min(8, { message: 'Be at least 8 characters long' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Contain at least one special character.'
		})
		.trim()
});

export type FormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

// Login form zod schema
export const LoginFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).trim()
	})