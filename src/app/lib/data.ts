import postgres from 'postgres';
import { formatCurrency } from './utils';
import { RawProductForCard } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// FUNCTION FOR FETCHING BEST RATED PRODUCTS
// FUNCTION FOR FETCHING BEST RATED PRODUCTS
// FUNCTION FOR FETCHING BEST RATED PRODUCTS
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

// FUNCTION FOR FETCHING ALL CATEGORIES
// FUNCTION FOR FETCHING ALL CATEGORIES
// FUNCTION FOR FETCHING ALL CATEGORIES
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

/* ---------------------  *******     FUNCTIONS ABOUT PRODUCTS *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT PRODUCTS *******   --------------------- */
/* ---------------------  *******     FUNCTIONS ABOUT PRODUCTS *******   --------------------- */


/* >>>>>>>> GET FUNCTIONS ABOUT PRODUCTS <<<<<<< */
/* >>>>>>>> GET FUNCTIONS ABOUT PRODUCTS <<<<<<< */
/* >>>>>>>> GET FUNCTIONS ABOUT PRODUCTS <<<<<<< */


// FUNCTION FOR FETCHING ALL PRODUCTS
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


// FUNCTION FOR FETCHING A SINGLE PRODUCT
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


/* >>>>>> POST FUNCTIONS ABOUT PRODUCTS <<<<<<<< */
/* >>>>>> POST FUNCTIONS ABOUT PRODUCTS <<<<<<<< */
/* >>>>>> POST FUNCTIONS ABOUT PRODUCTS <<<<<<<< */

// FUNCTION FOR CREATING A PRODUCT
export async function createProduct(product: Product) {
	try {
		const data = await sql`
      INSERT INTO products (name, description, image_url, price, profile_id, category_id)
      VALUES (${product.name}, ${product.description}, ${product.image_url}, ${product.price}, ${product.profile_id}, ${product.category_id})
    `;
  
		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to create product.');
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

// FUNCTION FOR FETCHING A SINGLE PROFILE
export async function fetchProfile(id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM profiles
      WHERE id = ${id}
    `;
  
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch profile.');
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