import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from './search.module.css';

export default function Search({ placeholder }: { placeholder: string }) {
	return (
		<form className={styles['search-form']}>
			<input id='search' className={styles['search-input']} placeholder={placeholder} />
			<MagnifyingGlassIcon className={styles['search-icon']} />
		</form>
	);
}
