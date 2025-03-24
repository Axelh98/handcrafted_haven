import styles from './LandingPage.module.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


export default function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className={styles.search}>
      <form className={styles["search-form"]}>
        <input
          id="search"
          className={styles["search-input"]}
          placeholder={placeholder}
        />
        <MagnifyingGlassIcon className={styles["search-icon"]} />
      </form>
    </div>
  );
}
