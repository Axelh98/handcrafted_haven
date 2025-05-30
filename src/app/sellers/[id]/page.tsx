import Link from 'next/link';
import Image from 'next/image';
import { fetchSellerProfile } from '@/app/lib/data';
import ContactInfo from '@/app/ui/sellers/profile/ContactInfo';
import Carousel from '@/app/ui/Carousel';
import styles from '@/app/ui/sellers/profile/profile.module.css';

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;

	const profile = await fetchSellerProfile(id);

	return {
		title: profile.name || 'Default Title'
	};
}

export default async function Page({ params }: PageProps) {
	const { id } = await params;

	const profile = await fetchSellerProfile(id);

	return (
		<main className={styles.main}>
			<section className={styles.presentation}>
				<Image
					src={`/images${profile.image_url}`}
					alt={`${profile.name} logo`}
					width={200}
					height={200}
				/>
				<article>
					<h1>{profile.name}</h1>
					<p>{profile.about}</p>
					<ContactInfo title='Contact Information' phone={profile.phone} email={profile.email} />
				</article>
			</section>
			<section className={styles.prodCar}>
				<article className={styles.commandLabel}>
					<h2>Top Products</h2>
					<div>
						<Link href={`/products?seller=${id}`}>See more</Link>
					</div>
				</article>
				<Carousel params={{ qty: '6', profile: id }} />
			</section>
		</main>
	);
}
