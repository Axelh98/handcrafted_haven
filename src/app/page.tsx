// GLOBAL STYLES
import '@/app/globals.css';

// COMPONENTS
import Header from '@/app/ui/landingPage/Header';
import HeroSection from '@/app/ui/landingPage/HeroSection';
import SectionCard from '@/app/ui/landingPage/SectionCard';

export default function Home() {
	return (
		<>
			<Header />
			<HeroSection />
			<SectionCard />
		</>
	);
}
