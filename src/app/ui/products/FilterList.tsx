'use client';

import { useClientFilters } from '@/app/hooks/useClientFilters';
import { useClientCategories } from '@/app/hooks/useClientCategories';
import { useClientGetProfiles } from '@/app/hooks/useClientGetProfiles';
import { BoundPrices, ProductSearch } from '@/app/lib/definitions';
import styles from '@/app/ui/products/filters.module.css';
import { formatCurrency } from '@/app/lib/utils';

type Props = {
	currentParams: ProductSearch;
	boundPrices: BoundPrices;
};

export default function FilterList({ currentParams, boundPrices }: Props) {
	const { handleFilterChange, handleRangeChange, currentPrice, filters } =
		useClientFilters(currentParams);
	const { categories } = useClientCategories();
	const { profiles } = useClientGetProfiles();

	return (
		<form className={styles.filters}>
			<div className={styles.filterGroup}>
				<label className={styles.filterLabel} htmlFor='category'>
					Select a category:
				</label>
				<select
					className={styles.filterSelect}
					name='category'
					id='category'
					onChange={handleFilterChange}
					value={filters.category || ''}>
					<option value=''>---</option>
					{categories.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.filterGroup}>
				<label className={styles.filterLabel} htmlFor='seller'>
					Select a seller:
				</label>
				<select
					className={styles.filterSelect}
					name='seller'
					id='seller'
					onChange={handleFilterChange}
					value={filters.seller || ''}>
					<option value=''>---</option>
					{profiles.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.filterGroup}>
				<label className={styles.filterLabel} htmlFor='minPrice'>
					Search by price:
				</label>
				<input
					type='range'
					name='minPrice'
					id='minPrice'
					min={`${boundPrices.min}`}
					max={`${boundPrices.max}`}
					value={currentPrice}
					onChange={handleRangeChange}
				/>{' '}
				{formatCurrency(currentPrice)}
			</div>
		</form>
	);
}
