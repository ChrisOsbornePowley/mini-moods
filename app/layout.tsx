import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

export const metadata: Metadata = {
	title: 'Mini Moods',
	description: 'Track your mood with an emoji and short comment',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='flex flex-col min-h-screen'>
				<Header />
				<main className='flex-1 flex flex-col items-center justify-center mx-auto w-full max-w-2xl px-4'>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
