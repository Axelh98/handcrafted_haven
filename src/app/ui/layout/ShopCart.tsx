'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/app/context/CartContext'; 
import styles from './CarritoIcon.module.css'; 

export default function ShopCart() {
  const { totalItems } = useCart(); 

  return (
    <Link href='/cart' className='link'>
      <div className={styles.cartIcon}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {totalItems > 0 && (
          <span className={styles.cartCount}>{totalItems}</span> 
        )}
      </div>
    </Link>
  );
}
