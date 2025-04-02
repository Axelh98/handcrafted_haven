import postgres from 'postgres';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchBestRatedProducts(limit = 0) {
	try {
		const data = await sql`
      SELECT p.id, name, price, AVG(rate) rate
      FROM products p
      JOIN rates r
      ON p.id = r.product_id
      GROUP BY p.id
      ORDER BY rate DESC
      ${limit && `LIMIT ${limit}`}
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
