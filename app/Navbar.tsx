'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

const Navbar = () => {
	const currentPath = usePathname()
	const links = [
		{ label: 'Dashboard', path: '/' },
		{ label: 'Issues', path: '/issues' },
	]
	return (
		<nav className='flex h-14 border-b space-x-8 px-8 mb-5 items-center'>
			<Link className='text-2xl' href='/'>
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
						<li>{link.label}</li>
					</Link>
				))}
			</ul>
		</nav>
	)
}

export default Navbar
