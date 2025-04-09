import FilterList from '@/app/ui/products/FilterList';
import GridProducts from '@/app/ui/products/GridProducts';

export default async function Page() {
	return (
		<div className='product-list-page'>
			{/* Columna de filtros */}
			<FilterList />

			{/* Columna de productos */}
			<GridProducts />
		</div>
	);
}
