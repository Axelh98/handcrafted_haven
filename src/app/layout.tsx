import type { Metadata } from 'next';
import { fontBody } from './ui/fonts';
import Header from './ui/layout/Header';
import './globals.css';
import { Providers } from '@/app/ui/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven'
  },
  description: 'Discover unique, handcrafted treasures made with passion.',
  metadataBase: new URL('https://handcrafted-haven-dun.vercel.app/')
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${fontBody.className} antialiased`}>


        <Providers>
          <Header />
            {children}
        </Providers>
      </body>
    </html>
  );
}
