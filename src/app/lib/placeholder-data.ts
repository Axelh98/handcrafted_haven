const users = [
	{
		id: '8046efca-5989-44d5-bcbc-de956b104111',
		name: 'Ana Torres',
		email: 'ana@crafts.com',
		password: 'anatorres123'
	},
	{
		id: '4bf9662d-51ec-44ad-b4a8-5000f65897a6',
		name: 'Carlos Ruiz',
		email: 'carlos@wwonders.com',
		password: 'carlosruiz456'
	},
	{
		id: '4a0028ad-5017-4672-962a-99e2db4736e4',
		name: 'Lucía Gómez',
		email: 'lucia@lcreations.com',
		password: 'luciagomez789'
	}
];

const categories = [
	{ id: 'b8026b33-20ba-473d-9fda-fb848c0aa0b9', name: 'Ceramics' },
	{ id: '146a4d4f-d384-492a-bfaa-0ecf2c23e271', name: 'Woodwork' },
	{ id: '9c5a8265-a1e4-4f42-b832-61a74b064e49', name: 'Textiles' },
	{ id: 'bd1f8ddb-d959-45cc-8784-d9d4db61ff8f', name: 'Jewelry' },
	{ id: '74d14707-19f2-4044-a58e-09af5795f7e3', name: 'Paintings' },
	{ id: 'c492cfb6-fad5-4b74-b2bc-04fa009a97d7', name: 'Sculptures' },
	{ id: '052fee69-fac6-46f3-b6d6-9f78b3550c87', name: 'Glasswork' }
];

const sellerProfiles = [
	{
		id: '5f1e13c6-fca5-44f6-9347-fd3a9ff9b05f',
		name: 'Crafts by Ana',
		about: 'Handmade ceramics and pottery.',
		phone: '123456789',
		email: 'contact@craftsbyana.com',
		image_url: '/sellers/crafts-by-ana.png',
		user_id: users[0].id
	},
	{
		id: '15c6206b-c477-49ed-8901-8feac67ca8dc',
		name: 'Wood Wonders',
		about: 'Unique handmade woodwork.',
		phone: '987654321',
		email: 'info@woodwonders.com',
		image_url: '/sellers/wood-wonders.png',
		user_id: users[1].id
	},
	{
		id: 'b49fc1d0-0262-44e1-9499-42833862df88',
		name: "Lucía's Creations",
		about: 'Beautiful textile art.',
		phone: '456123789',
		email: 'hello@luciascreations.com',
		image_url: '/sellers/lucia-creations.png',
		user_id: users[2].id
	}
];

const products = [
	{
		id: '80f8981e-76e7-4d77-803c-c3199b70ba62',
		name: 'Rustic Vase',
		description: 'A handmade ceramic vase.',
		image_url: '/products/rustic-vase.jpg',
		price: 2500,
		profile_id: sellerProfiles[0].id,
		category_id: categories[0].id
	},
	{
		id: 'd56efe8f-df4d-4f7a-826c-9458727f0377',
		name: 'Clay Plate Set',
		description: 'Set of decorative clay plates.',
		image_url: '/products/clay-plate-set.jpg',
		price: 4000,
		profile_id: sellerProfiles[0].id,
		category_id: categories[0].id
	},
	{
		id: '85769103-591a-4658-903c-de82033b17a2',
		name: 'Wooden Chair',
		description: 'Elegant handcrafted wooden chair.',
		image_url: '/products/wooden-chair.jpg',
		price: 12000,
		profile_id: sellerProfiles[1].id,
		category_id: categories[1].id
	},
	{
		id: '90984d48-51c5-4d22-b032-a5d2d31a2e88',
		name: 'Carved Table',
		description: 'Unique carved wooden table.',
		image_url: '/products/carved-table.jpg',
		price: 20000,
		profile_id: sellerProfiles[1].id,
		category_id: categories[1].id
	},
	{
		id: '2071da33-9c27-4077-b276-9d6471ffbf66',
		name: 'Knitted Scarf',
		description: 'Warm and colorful scarf.',
		image_url: '/products/knitted-scarf.jpg',
		price: 3000,
		profile_id: sellerProfiles[2].id,
		category_id: categories[2].id
	},
	{
		id: 'd80faa36-f2c0-4711-b1af-7c58b93d24f0',
		name: 'Patchwork Quilt',
		description: 'Intricate patchwork quilt.',
		image_url: '/products/patchwork-quilt.jpg',
		price: 15000,
		profile_id: sellerProfiles[2].id,
		category_id: categories[2].id
	},
	{
		id: '4351e53c-ca9a-4a66-9c22-ac8dff724b72',
		name: 'Wooden Bowl',
		description: 'Smooth wooden bowl.',
		image_url: '/products/wooden-bowl.jpg',
		price: 3500,
		profile_id: sellerProfiles[1].id,
		category_id: categories[1].id
	},
	{
		id: '0b504f32-b6ce-4aad-99be-99c35264fdb3',
		name: 'Ceramic Mug',
		description: 'Hand-painted ceramic mug.',
		image_url: '/products/ceramic-mug.jpg',
		price: 1500,
		profile_id: sellerProfiles[0].id,
		category_id: categories[0].id
	},
	{
		id: 'b98cdbdf-63fe-42fe-b06c-0a5b03a49d9b',
		name: 'Textile Wall Art',
		description: 'Unique handmade wall art.',
		image_url: '/products/textile-wall-art.jpg',
		price: 8000,
		profile_id: sellerProfiles[2].id,
		category_id: categories[2].id
	}
];

const reviews = [
	{
		name: 'John Doe',
		content: 'Fantastic quality!',
		post_date: '2025-03-24',
		product_id: products[0].id
	},
	{
		name: 'Jane Smith',
		content: 'Loved the craftsmanship!',
		post_date: '2025-03-25',
		product_id: products[0].id
	},
	{
		name: 'Alice Brown',
		content: 'Great addition to my decor.',
		post_date: '2025-03-26',
		product_id: products[0].id
	},
	{
		name: 'Michael Carter',
		content: 'Absolutely stunning!',
		post_date: '2025-03-24',
		product_id: products[1].id
	},
	{
		name: 'Sarah Lee',
		content: 'Perfectly made.',
		post_date: '2025-03-25',
		product_id: products[1].id
	},
	{
		name: 'Tom Wilson',
		content: 'High-quality craftsmanship.',
		post_date: '2025-03-26',
		product_id: products[1].id
	},
	{
		name: 'Rebecca Green',
		content: 'Comfortable and stylish.',
		post_date: '2025-03-24',
		product_id: products[2].id
	},
	{
		name: 'Oscar Hughes',
		content: 'An excellent purchase.',
		post_date: '2025-03-25',
		product_id: products[2].id
	},
	{
		name: 'Ella Foster',
		content: 'Beautiful and unique.',
		post_date: '2025-03-26',
		product_id: products[2].id
	}
];

const reviews2 = [
	{
		name: 'Maria Lopez',
		content: 'Beautiful scarf, perfect for winter!',
		post_date: '2025-03-24',
		product_id: products[4].id
	},
	{
		name: 'David Kim',
		content: 'High-quality and warm.',
		post_date: '2025-03-25',
		product_id: products[4].id
	},
	{
		name: 'Sandra Cruz',
		content: 'I love the vibrant colors!',
		post_date: '2025-03-26',
		product_id: products[4].id
	},
	{
		name: 'Emily Johnson',
		content: 'Fits perfectly in my living room.',
		post_date: '2025-03-24',
		product_id: products[3].id
	},
	{
		name: 'Oliver Stone',
		content: 'Unique design and very sturdy.',
		post_date: '2025-03-25',
		product_id: products[3].id
	},
	{
		name: 'Cynthia Brown',
		content: 'Impressive craftsmanship.',
		post_date: '2025-03-26',
		product_id: products[3].id
	},
	{
		name: 'Victor Hughes',
		content: 'A cozy addition to my home.',
		post_date: '2025-03-24',
		product_id: products[5].id
	},
	{
		name: 'Patricia White',
		content: 'Intricate and well-made.',
		post_date: '2025-03-25',
		product_id: products[5].id
	},
	{
		name: 'George Miller',
		content: 'Perfect for my guest bedroom.',
		post_date: '2025-03-26',
		product_id: products[5].id
	}
];

const reviews3 = [
	{
		name: 'Laura Thompson',
		content: 'Beautiful craftsmanship, I love the smooth finish!',
		post_date: '2025-03-24',
		product_id: products[6].id
	},
	{
		name: 'Michael Davis',
		content: 'Perfect size for serving snacks!',
		post_date: '2025-03-25',
		product_id: products[6].id
	},
	{
		name: 'Sophia Green',
		content: 'Adds a natural touch to my kitchen.',
		post_date: '2025-03-26',
		product_id: products[6].id
	},
	{
		name: 'Oliver Stone',
		content: 'Lovely design, feels great to hold.',
		post_date: '2025-03-24',
		product_id: products[7].id
	},
	{
		name: 'Emily Johnson',
		content: 'Keeps my coffee warm for longer, great quality!',
		post_date: '2025-03-25',
		product_id: products[7].id
	},
	{
		name: 'Jack Martin',
		content: 'Perfect for a cozy morning drink.',
		post_date: '2025-03-26',
		product_id: products[7].id
	},
	{
		name: 'Emma White',
		content: 'Truly unique, brightens up my living room.',
		post_date: '2025-03-24',
		product_id: products[8].id
	},
	{
		name: 'Lucas Brown',
		content: 'Eye-catching and beautifully crafted.',
		post_date: '2025-03-25',
		product_id: products[8].id
	},
	{
		name: 'Mia Wilson',
		content: 'A work of art, simply stunning.',
		post_date: '2025-03-26',
		product_id: products[8].id
	}
];

const rates = [
	{ rate: 5, rate_date: '2025-03-24', product_id: products[0].id },
	{ rate: 4, rate_date: '2025-03-25', product_id: products[0].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[0].id },
	{ rate: 5, rate_date: '2025-03-24', product_id: products[1].id },
	{ rate: 4, rate_date: '2025-03-25', product_id: products[1].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[1].id },
	{ rate: 4, rate_date: '2025-03-24', product_id: products[2].id },
	{ rate: 3, rate_date: '2025-03-25', product_id: products[2].id },
	{ rate: 4, rate_date: '2025-03-26', product_id: products[2].id }
];

const rates2 = [
	{ rate: 5, rate_date: '2025-03-24', product_id: products[4].id },
	{ rate: 4, rate_date: '2025-03-25', product_id: products[4].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[4].id },
	{ rate: 5, rate_date: '2025-03-24', product_id: products[3].id },
	{ rate: 5, rate_date: '2025-03-25', product_id: products[3].id },
	{ rate: 4, rate_date: '2025-03-26', product_id: products[3].id },
	{ rate: 4, rate_date: '2025-03-24', product_id: products[5].id },
	{ rate: 5, rate_date: '2025-03-25', product_id: products[5].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[5].id }
];

const rates3 = [
	{ rate: 5, rate_date: '2025-03-24', product_id: products[6].id },
	{ rate: 4, rate_date: '2025-03-25', product_id: products[6].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[6].id },
	{ rate: 5, rate_date: '2025-03-24', product_id: products[7].id },
	{ rate: 4, rate_date: '2025-03-25', product_id: products[7].id },
	{ rate: 5, rate_date: '2025-03-26', product_id: products[7].id },
	{ rate: 5, rate_date: '2025-03-24', product_id: products[8].id },
	{ rate: 5, rate_date: '2025-03-25', product_id: products[8].id },
	{ rate: 4, rate_date: '2025-03-26', product_id: products[8].id }
];

export {
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
};
