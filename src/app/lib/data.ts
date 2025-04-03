import postgres from 'postgres';
import { formatCurrency } from './utils';
import { RawProductForCard } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchBestRatedProducts() {
	try {
		const data = await sql<RawProductForCard[]>`
			SELECT p.id id, p.name name, p.image_url image_url, price, profile_id, s.name profile_name, AVG(rate) rate_avg
      FROM products p
			JOIN profiles s
			ON p.profile_id = s.id
      JOIN rates r
      ON p.id = r.product_id
      GROUP BY p.id, profile_name
      ORDER BY rate_avg DESC
      LIMIT 6
    `;

		const products = data.map((product) => ({
			...product,
			price: formatCurrency(product.price)
		}));

		return products;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch best rated products.');
	}
}

export async function fetchCategories() {
	try {
		const data = await sql`
      SELECT *
      FROM categories
    `;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch categories.');
	}
}
