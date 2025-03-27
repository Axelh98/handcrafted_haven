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
	image_url: string;
	price: number;
	profile_id: string;
	category_id: string;
}

interface Review {
	id: string;
	name: string;
	content: string;
	post_date: string;
	product_id: string;
}

interface Rate {
	id: string;
	rate: number;
	rate_date: string;
	product_id: string;
}

export type { User, SellerProfile, Category, Product, Review, Rate };
