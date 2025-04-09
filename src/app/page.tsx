import Hero from '@/app/ui/landingPage/Hero';
import Carousel from '@/app/ui/Carousel';

export default async function Page() {
	return (
		<main>
			<Hero />
			<br />
			<Carousel params={{ qty: '6' }} />
		</main>
	);
}
