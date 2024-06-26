'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug, FaUser } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const LINKS = [
	{ label: 'Profile', path: '/profile' },
	{ label: 'Issues', path: '/issues' },
	{ label: 'My Issues', path: '/issues/my' },
]

const Navbar = () => {
	const currentPath = usePathname()

	const logoutHandler = async () => {
		signOut()
	}
	const { data: session } = useSession()

	return (
		<nav className='flex h-[8vh] border-b sm:space-x-8 justify-between px-2 sm:px-8 mb-5 items-center'>
			<div className=' space-x-4 flex'>
				<Link className='text-2xl ' href='/'>
					<FaBug className='text-violet-600' />
				</Link>
				{session && (
					<ul className='flex space-x-6'>
						{LINKS.map(link => (
							<Link
								className={classNames({
									'text-zinc-900 border-b-2 border-zinc-900 ':
										currentPath === link.path,
									'text-zinc-500': currentPath !== link.path,
									'hover:text-zinc-800 transition-colors font-medium text-xl':
										true,
								})}
								key={link.path}
								href={link.path}>
								<li className='sm:text-2xl text-lg'>{link.label}</li>
							</Link>
						))}
					</ul>
				)}
			</div>
			<div>
				{session ? (
					<div className='flex space-x-4'>
						<Button onClick={logoutHandler} size={'sm'}>
							Logout
						</Button>
						<Link href={'/profile'}>
							<Avatar>
								{session.user?.image && session.user.name && (
									<AvatarImage
										src={session.user.image}
										alt={session.user.name}
									/>
								)}
								<AvatarFallback>
									<FaUser />
								</AvatarFallback>
							</Avatar>
						</Link>
					</div>
				) : (
					<Button size={'sm'}>
						<Link className='flex items-center gap-2 ' href='/auth/login'>
							<FaUser /> <p className='text-lg  '>Login</p>
						</Link>
					</Button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
