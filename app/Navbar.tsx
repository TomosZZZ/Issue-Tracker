import Link from 'next/link'
import React from 'react'
import { FaBug } from 'react-icons/fa'

const Navbar = () => {
	const links = [
		{ label: 'Dashboard', path: '/' },
		{ label: 'Issues', path: '/issues' },
	]
	return (
		<nav className='flex h-14 border-b space-x-8 px-8 mb-5 items-center'>
			<Link className='text-xl' href='/'>
				<FaBug />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(link => (
					<Link
						className=' text-zinc-500 hover:text-zinc-800 transition-colors'
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
