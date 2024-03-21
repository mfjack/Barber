import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './style/globals.css';
import Footer from './_components/footer';
import AuthProvider from './_providers/auth';
import { Toaster } from '../app/_components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Barber',
	description: 'Agende com seu barbeiro e tenha qualidade na sua barba!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${inter.className} dark`}>
				<AuthProvider>
					<div className='flex-1'>{children}</div>
					<Toaster />
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
