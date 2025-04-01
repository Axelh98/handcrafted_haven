import {
	Geist,
	Geist_Mono,
	Libre_Baskerville,
	Inter,
	Playfair_Display,
	Raleway,
	Poppins,
	Amatic_SC
} from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export { geistSans, geistMono };

export const fontHeading = Libre_Baskerville({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-heading'
});

export const fontBody = Inter({
	subsets: ['latin'],
	variable: '--font-body'
});

export const fontAccent = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-accent'
});

export const fontSubheading = Raleway({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-subheading'
});

export const fontLabel = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-label'
});

export const fontHandwritten = Amatic_SC({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-handwritten'
});
