import FilterList from '@/app/ui/productList/FilterList';
import GridProducts from '@/app/ui/productList/GridProducts';

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
