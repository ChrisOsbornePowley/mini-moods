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
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
