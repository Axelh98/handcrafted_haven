// import { fetchProduct } from '@/app/lib/data';
import ProductDetail from '@/app/ui/components/ProductDetail';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	// const product = await fetchProduct(id);
	console.log(id);

	const product = {
		category: 'Textiles',
		category_id: '9c5a8265-a1e4-4f42-b832-61a74b064e49',
		description: 'Unique handmade wall art.',
		image: '/products/textile-wall-art.jpg',
		price: 8000,
		product_id: 'b98cdbdf-63fe-42fe-b06c-0a5b03a49d9b',
		profile: "Lucía's Creations",
		profile_id: 'b49fc1d0-0262-44e1-9499-42833862df88',
		rating: '4.6666666666666667',
		title: 'Textile Wall Art'
	};

	return <ProductDetail product={product} />;
}
