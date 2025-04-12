import postgres from 'postgres';
import {
	ProductSearch,
	RawProductDetail,
	RawProductForCard,
	ReviewForCard,
	SellerProfileDetail
} from './definitions';
import { Category, Product } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ***** SQL FOR LAYOUT COMPONENTS IN FIRST INSTANCE ***** */

// FETCH CATEGORIES LIST
export async function fetchCategories() {
	try {
		const data = await sql<Category[]>`
      SELECT id, name
      FROM categories
    `;

		const categories = data.map((row) => ({
			id: row.id,
			name: row.name
		}));

		return categories;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch categories.');
	}
}

/* ***** SQL FOR LANDING COMPONENTS IN FIRST INSTANCE ***** */

// FETCH BEST RATED PRODUCTS
export async function fetchBestRatedProducts(qty: number, profileId?: string) {
	try {
		const data = await sql<RawProductForCard[]>`
			SELECT p.id id, p.name name, p.image_url image_url, price, profile_id, s.name profile_name, AVG(rate) rate_avg
      FROM products p
			JOIN profiles s
			ON p.profile_id = s.id
      JOIN rates r
      ON p.id = r.product_id
			${profileId ? sql`WHERE profile_id = ${profileId}` : sql``}
      GROUP BY p.id, profile_name
      ORDER BY rate_avg DESC
      ${qty && sql`LIMIT ${qty}`}
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch best rated products.');
	}
}

/* ***** SQL FOR PRODUCT DETAIL COMPONENTS ***** */

// FETCH PRODUCT DETAIL BY ID
export async function fetchProductDetail(id: string) {
	try {
		const [product] = await sql<RawProductDetail[]>`
		SELECT p.name title, p.description description, p.image_url image, p.price price, p.profile_id profile_id, s.name profile, p.category_id category_id, c.name category, AVG(rate) rating, COUNT(DISTINCT rv.id) count
		FROM products p
		JOIN profiles s
		ON p.profile_id = s.id
		JOIN categories c
		ON p.category_id = c.id
    JOIN reviews rv
		ON p.id = rv.product_id
		JOIN rates r
		ON p.id = r.product_id
		WHERE p.id = ${id}
		GROUP BY p.id, s.name, c.name;
	  `;

		return { ...product, rating: Number(product.rating) };
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch product.');
	}
}

// FETCH PRODUCT REVIEWS FOR PRODUCT ID
export async function fetchReviewsByProduct(id: string) {
	try {
		const data = await sql<ReviewForCard[]>`
		SELECT id, name, content, post_date
		FROM reviews r
		WHERE r.product_id = ${id}
		ORDER BY post_date DESC
	  `;

		const reviews = data.map((review) => ({ ...review, post_date: new Date(review.post_date) }));

		return reviews;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch reviews.');
	}
}

// FETCH PRODUCT REVIEWS FOR PRODUCT ID IMPLETENTING PAGINATION
const ITEMS_PER_REQ = 3;

export async function fetchReviewsByProductPaginated(id: string, iteration: number) {
	const offset = (iteration - 1) * ITEMS_PER_REQ;

	try {
		const data = await sql<ReviewForCard[]>`
		SELECT id, name, content, post_date
		FROM reviews r
		WHERE r.product_id = ${id}
		ORDER BY post_date DESC
		LIMIT ${ITEMS_PER_REQ} OFFSET ${offset}
	  `;

		const reviews = data.map((review) => ({ ...review, post_date: new Date(review.post_date) }));

		return reviews;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch reviews.');
	}
}

// FETCH PRODUCT REVIEWS TOTAL PAGES FOR PAGINATION
export async function fetchReviewsByProductPages(id: string) {
	try {
		const [data] = await sql`
		SELECT COUNT(*)
		FROM reviews
		WHERE product_id = ${id}
		GROUP BY product_id
	  `;

		const totalPages = Math.ceil(Number(data.count) / ITEMS_PER_REQ);

		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch reviews pages.');
	}
}

// POST PRODUCT REVIEW
export async function insertReview(name: string, content: string, product_id: string) {
	try {
		await sql`
			INSERT INTO reviews (name, content, product_id, post_date)
			VALUES (${name}, ${content}, ${product_id}, NOW())
	  `;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to insert reviews.');
	}
}

/* ***** SQL FOR SELLER PROFILE COMPONENTS ***** */

// FETCH SELLER PROFILE DETAIL
export async function fetchSellerProfile(id: string) {
	try {
		const [data] = await sql<SellerProfileDetail[]>`
      SELECT name, about, phone, email, image_url, user_id
      FROM profiles
      WHERE id = ${id}
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch seller profile.');
	}
}

/* ***** SQL FOR PRODUCTS COMPONENTS ***** */

// FETCH FILTERED PRODUCTS
export async function fetchFilteredProducts({ query, category, seller }: ProductSearch) {
	const searchConditions = [];
	const categoryConditions = [];
	const sellerConditions = [];

	if (query) {
		searchConditions.push(sql`p.name ILIKE ${'%' + query + '%'}`);
	}

	if (category) {
		categoryConditions.push(sql`c.id = ${category}`);
	} else if (query) {
		searchConditions.push(sql`c.name ILIKE ${'%' + query + '%'}`);
	}

	if (seller) {
		sellerConditions.push(sql`s.id = ${seller}`);
	} else if (query) {
		searchConditions.push(sql`s.name ILIKE ${'%' + query + '%'}`);
	}

	let where = sql``;

	const allConditions = [];

	if (searchConditions.length > 0) {
		let searchClause = sql`(`;

		for (let i = 0; i < searchConditions.length; i++) {
			if (i > 0) {
				searchClause = sql`${searchClause} OR `;
			}
			searchClause = sql`${searchClause} ${searchConditions[i]}`;
		}

		searchClause = sql`${searchClause})`;
		allConditions.push(searchClause);
	}

	if (categoryConditions.length > 0) {
		allConditions.push(categoryConditions[0]);
	}

	if (sellerConditions.length > 0) {
		allConditions.push(sellerConditions[0]);
	}

	if (allConditions.length > 0) {
		where = sql`WHERE `;
		for (let i = 0; i < allConditions.length; i++) {
			if (i > 0) {
				where = sql`${where} AND `;
			}
			where = sql`${where} ${allConditions[i]}`;
		}
	}

	try {
		const data = await sql<RawProductForCard[]>`
			SELECT p.id id, p.name name, p.image_url image_url, p.price price, p.profile_id profile_id, s.name profile_name, AVG(rate) rate_avg
			FROM products p
			JOIN profiles s 
			ON p.profile_id = s.id
			JOIN categories c 
			ON p.category_id = c.id
			JOIN rates r 
			ON p.id = r.product_id
			${where}
			GROUP BY p.id, s.name;
			`;

		return data;
	} catch (error) {
		console.error('Datab Error:', error);
		throw new Error('Failed to fetch filtered products.');
	}
}

// FUNCTION FOR FETCHING PRODUCTS BY CATEGORY
export async function fetchProductByCategory(categoryId: string) {
	try {
		const data = await sql`
      SELECT *
      FROM products
      WHERE category_id = ${categoryId}
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch products by category.');
	}
}

// FUNCTION FOR FETCHING A PRODUCT BY USER
export async function fetchProductByUser(userId: string) {
	try {
		const data = await sql`
      SELECT *
      FROM products
      WHERE profile_id = ${userId}
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch products by user.');
	}
}

/* >>>>>> CRUD PRODUCTS <<<<<<<< */
/* >>>>>> CRUD PRODUCTS <<<<<<<< */
/* >>>>>> CRUD PRODUCTS <<<<<<<< */

// lib/data.ts

export async function fetchProducts(): Promise<Product[]> {
	try {
		const data = await sql`
      SELECT id, name, description, image_url, price, profile_id, category_id
      FROM products
    `;
		return data.map((row) => ({
			id: row.id,
			name: row.name,
			description: row.description,
			image_url: row.image_url,
			price: row.price,
			profile_id: row.profile_id,
			category_id: row.category_id
		}));
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch products.');
	}
}

export async function createProduct(product: Product): Promise<void> {
	try {
		if (
			!product.name ||
			!product.description ||
			!product.image_url ||
			!product.price ||
			!product.profile_id ||
			!product.category_id
		) {
			throw new Error('All product fields must be defined.');
		}
		await sql`
		INSERT INTO products (name, description, image_url, price, profile_id, category_id)
		VALUES (${product.name}, ${product.description}, ${product.image_url}, ${product.price}, ${product.profile_id}, ${product.category_id})
	  `;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to create product.');
	}
}

export async function updateProduct(product: Product): Promise<void> {
	try {
		if (
			!product.id ||
			!product.name ||
			!product.description ||
			!product.image_url ||
			!product.price ||
			!product.profile_id ||
			!product.category_id
		) {
			throw new Error('All product fields must be defined.');
		}
		await sql`
		UPDATE products
		SET name = ${product.name},
			description = ${product.description},
			image_url = ${product.image_url},
			price = ${product.price},
			profile_id = ${product.profile_id},
			category_id = ${product.category_id}
		WHERE id = ${product.id}
	  `;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to update product.');
	}
}

// FUNTION FOR FETCHING A SINGLE PRODUCT BY ID
export async function fetchProductById(id: string) {
	try {
		const [data] = await sql`
      SELECT *
      FROM products
      WHERE id = ${id}
    `;
		if (data.length === 0) {
			throw new Error('Product not found');
		}

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch product by id.');
	}
}

export async function deleteProduct(id: string): Promise<void> {
	try {
		await sql`
      DELETE FROM products
      WHERE id = ${id}
    `;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to delete product.');
	}
}

/* ---------------------  *******     FUNCTIONS ABOUT USERS *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT USERS *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT USERS *******   --------------------- */

/* >>>>>>>>>>> GET FUNCTIONS ABOUT USERS <<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* >>>>>>>>>>> GET FUNCTIONS ABOUT USERS <<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* >>>>>>>>>>> GET FUNCTIONS ABOUT USERS <<<<<<<<<<<<<<<<<<<<<<<<<<< */

// FUNCTION FOR FETCHING ALL USERS
export async function fetchUsers() {
	try {
		const data = await sql`
      SELECT *
      FROM users
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch users.');
	}
}

// FUNCTION FOR FETCHING A SINGLE USER
export async function fetchUser(id: string) {
	try {
		const data = await sql`
      SELECT *
      FROM users
      WHERE id = ${id}
    `;

		return data[0];
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch user.');
	}
}

/* ---------------------  *******     FUNCTIONS ABOUT PROFILES *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT PROFILES *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT PROFILES *******   --------------------- */

/* >>>>>>>>>>> GET FUNCTIONS ABOUT PROFILES <<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* >>>>>>>>>>> GET FUNCTIONS ABOUT PROFILES <<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* >>>>>>>>>>> GET FUNCTIONS ABOUT PROFILES <<<<<<<<<<<<<<<<<<<<<<<<<<< */

// FUNCTION FOR FETCHING ALL PROFILES
export async function fetchProfiles() {
	try {
		const data = await sql`
      SELECT *
      FROM profiles
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch profiles.');
	}
}

// FUNCTION FOR FETCHING A SINGLE PROFILE BY USER
export async function fetchProfileByUser(userId: string) {
	try {
		const data = await sql`
      SELECT *
      FROM profiles
      WHERE user_id = ${userId}
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch profile by user.');
	}
}
