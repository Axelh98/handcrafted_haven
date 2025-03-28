import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import {
	users,
	categories,
	sellerProfiles,
	products,
	reviews,
	reviews2,
	reviews3,
	rates,
	rates2,
	rates3
} from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(25) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

	const insertedUsers = await Promise.all(
		users.map(async (user) => {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
		})
	);

	return insertedUsers;
}

async function seedCategories() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(15) NOT NULL
    );
  `;

	const insertedCategories = await Promise.all(
		categories.map(
			(category) => sql`
        INSERT INTO categories (id, name)
        VALUES (${category.id}, ${category.name})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedCategories;
}

async function seedProfiles() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      name VARCHAR(25) NOT NULL,
      about VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email VARCHAR(30) NOT NULL,
      image_url VARCHAR(35) NOT NULL
    );
  `;

	const insertedProfiles = await Promise.all(
		sellerProfiles.map(
			(profile) => sql`
        INSERT INTO profiles (id, user_id, name, about, phone, email, image_url)
        VALUES (${profile.id}, ${profile.user_id}, ${profile.name}, ${profile.about}, ${profile.phone}, ${profile.email}, ${profile.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedProfiles;
}

async function seedProducts() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category_id UUID NOT NULL,
      profile_id UUID NOT NULL,
      name VARCHAR(25) NOT NULL,
      description VARCHAR(255) NOT NULL,
      image_url VARCHAR(35) NOT NULL,
      price INT NOT NULL
    );
  `;

	const insertedProducts = await Promise.all(
		products.map(
			(product) => sql`
        INSERT INTO products (id, category_id, profile_id, name, description, image_url, price)
        VALUES (${product.id}, ${product.category_id}, ${product.profile_id}, ${product.name}, ${product.description}, ${product.image_url}, ${product.price})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedProducts;
}

async function seedReviews() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(25) NOT NULL,
      content VARCHAR(255) NOT NULL,
      post_date DATE NOT NULL,
      product_id UUID NOT NULL
    );
  `;

	const insertedReviews = await Promise.all(
		reviews.map(
			(review) => sql`
        INSERT INTO reviews (name, content, post_date, product_id)
        VALUES (${review.name}, ${review.content}, ${review.post_date}, ${review.product_id})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedReviews;
}

async function seedRates() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

	await sql`
    CREATE TABLE IF NOT EXISTS rates (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      rate NUMERIC(2,1) NOT NULL,
      rate_date DATE NOT NULL,
      product_id UUID NOT NULL
    );
  `;

	const insertedRates = await Promise.all(
		rates.map(
			(rate) => sql`
        INSERT INTO rates (rate, rate_date, product_id)
        VALUES (${rate.rate}, ${rate.rate_date}, ${rate.product_id})
        ON CONFLICT (id) DO NOTHING;
      `
		)
	);

	return insertedRates;
}

export async function GET() {
	try {

		const result = await sql.begin((sql) => [seedUsers(), seedCategories()]);
		const result2 = await sql.begin((sql) => [seedProfiles()]);


		const result3 = await sql.begin((sql) => [seedProducts()]);
		const result4 = await sql.begin((sql) => [seedReviews()]);
		const result5 = await sql.begin((sql) => [seedRates()]);

		await Promise.all(
			reviews2.map(
				(review) => sql`
		      INSERT INTO reviews (name, content, post_date, product_id)
		      VALUES (${review.name}, ${review.content}, ${review.post_date}, ${review.product_id})
		      ON CONFLICT (id) DO NOTHING;
		    `
			)
		);

		 await Promise.all(
		 	rates2.map(
		 		(rate) => sql`
		       INSERT INTO rates (rate, rate_date, product_id)
		       VALUES (${rate.rate}, ${rate.rate_date}, ${rate.product_id})
		       ON CONFLICT (id) DO NOTHING;
		     `
		 	)
		 );

		 
		 await Promise.all(
		 	reviews3.map(
		 		(review) => sql`
		       INSERT INTO reviews (name, content, post_date, product_id)
		       VALUES (${review.name}, ${review.content}, ${review.post_date}, ${review.product_id})
		       ON CONFLICT (id) DO NOTHING;
		     `
		 	)
		 );

		 await Promise.all(
		 	rates3.map(
		 		(rate) => sql`
		       INSERT INTO rates (rate, rate_date, product_id)
		       VALUES (${rate.rate}, ${rate.rate_date}, ${rate.product_id})
		       ON CONFLICT (id) DO NOTHING;
		     `
		 	)
		 );

		return Response.json({ message: 'Database seeded successfully' });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}