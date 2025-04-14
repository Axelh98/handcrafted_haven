'use client';

import Link from 'next/link';
import { formatCurrency } from '@/app/lib/utils';
import AddToCartButton from '@/app/ui/cart/AddToCartButton';
import styles from '@/app/ui/products/detail/DetailPresentation.module.css';

type Props = {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  category: string;
  profileId: string;
  profile: string;
  image_url: string;
};

export default function DetailPresentation({
  id,
  title,
  description,
  price,
  categoryId,
  category,
  profileId,
  profile,
  image_url,
}: Props) {
  return (
    <article className={styles.detailPresentation}>
      <Link href={`/products?category=${categoryId}`}>
        <h5>{category}</h5>
      </Link>
      <h2>{title}</h2>
      <h4>
        Seller: <Link href={`/sellers/${profileId}`}>{profile}</Link>
      </h4>
      <p className={styles.description}>
        <b>Description:</b> {description}
      </p>
      <p>
        <b>{formatCurrency(price)}</b>
      </p>
      <div>
        <AddToCartButton
          product={{
            id,
            name: title,
            price,
            image_url,
          }}
        />
      </div>
    </article>
  );
}
