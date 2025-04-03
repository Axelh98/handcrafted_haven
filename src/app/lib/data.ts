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

	console.log('Products:', data); 

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch categories.');
	}
}

export async function fetchProducts() {
	try {
		const data = await sql`
      SELECT *
      FROM products
    `;


	console.log('Product:', data); 

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch products.');
	}
}

export async function fetchProduct(id: string) {
	try {
	  const data = await sql`
		SELECT *
		FROM products
		WHERE id = ${id}
	  `;
  
	  return data[0]; 
	} catch (error) {
	  console.error('Database Error:', error);
	  throw new Error('Failed to fetch product.');
	}
  }
  

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