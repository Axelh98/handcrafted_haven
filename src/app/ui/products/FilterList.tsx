'use client';

import { useClientFilters } from '@/app/hooks/useClientFilters';
import { useClientCategories } from '@/app/hooks/useClientCategories';
import styles from '@/app/ui/products/filters.module.css';
import { ProductSearch } from '@/app/lib/definitions';

type Props = {
	currentParams: ProductSearch;
};

export default function FilterList({ currentParams }: Props) {
	const { handleFilterChange } = useClientFilters(currentParams);
	const { categories } = useClientCategories();

	return (
		<>
			<form className={styles.filters}>
				<div className={styles.filterGroup}>
					<label className={styles.filterLabel} htmlFor='category'>
						Category
					</label>
					<select
						className={styles.filterSelect}
						name='category'
						id='category'
						onChange={handleFilterChange}
						value={currentParams.category || ''}>
						<option value=''>---</option>
						{categories.map(({ id, name }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
					</select>
				</div>
			</form>
			<div className={styles.filters}>
				<div className={styles.filterGroup}>
					<label className={styles.filterLabel} htmlFor='price-range'>
						Price Range
					</label>
					<select className={styles.filterSelect} id='price-range'>
						<option value='all'>All</option>
						<option value='0-50'>$0 - $50</option>
						<option value='50-100'>$50 - $100</option>
						<option value='100-200'>$100 - $200</option>
					</select>
				</div>
				<div className={styles.filterGroup}>
					<label className={styles.filterLabel}>Availability</label>
					<div className={styles.filterCheckbox}>
						<input type='checkbox' id='in-stock' />
						<label htmlFor='in-stock'>In Stock</label>
					</div>
					<div className={styles.filterCheckbox}>
						<input type='checkbox' id='out-of-stock' />
						<label htmlFor='out-of-stock'>Out of Stock</label>
					</div>
				</div>
			</div>
		</>
	);
}
