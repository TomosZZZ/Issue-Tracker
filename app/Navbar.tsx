'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const Navbar = () => {
	const currentPath = usePathname()
	const links = [
		{ label: 'Dashboard', path: '/' },
		{ label: 'Issues', path: '/issues' },
	]

	const logoutHandler = async () => {
		signOut()
	}

	return (
		<nav className='flex h-[8vh] border-b sm:space-x-8 space-x-4 px-2 sm:px-8 mb-5 items-center'>
			<Link className='text-2xl ' href='/'>
				<FaBug className='text-violet-600' />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(link => (
					<Link
						className={classNames({
							'text-zinc-900': currentPath === link.path,
							'text-zinc-500': currentPath !== link.path,
							'hover:text-zinc-800 transition-colors font-medium text-xl': true,
						})}
						key={link.path}
						href={link.path}>
						<li className='sm:text-2xl text-lg'>{link.label}</li>
					</Link>
				))}
			</ul>

			<div>
				<Button onClick={logoutHandler}>Logout</Button>
			</div>
		</nav>
	)
}

export default Navbar
