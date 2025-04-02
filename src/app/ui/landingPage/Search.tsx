import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from './search.module.css';

export default function Search({ placeholder }: { placeholder: string }) {
	return (
		<form className={styles.searchForm}>
			<input id='search' className={styles.searchInput} placeholder={placeholder} />
			<MagnifyingGlassIcon className={styles.searchIcon} />
		</form>
	);
}
