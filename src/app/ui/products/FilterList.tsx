'use client';

/* Import Styles*/
import styles from '@/app/ui/products/filters.module.css';

export default function FilterList() {
	return (
		<div className={styles.filters}>
			<div className={styles.filterGroup}>
				<label className={styles.filterLabel} htmlFor='category'>
					Category
				</label>
				<select className={styles.filterSelect} id='category'>
					<option value='all'>All</option>
					<option value='electronics'>Electronics</option>
					<option value='fashion'>Fashion</option>
					<option value='home'>Home</option>
				</select>
			</div>
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
	);
}
