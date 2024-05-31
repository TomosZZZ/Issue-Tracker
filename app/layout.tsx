import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>
					<Navbar />
					<main className='flex justify-center w-full'>{children}</main>
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	)
}
