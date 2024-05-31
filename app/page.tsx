import { Card } from '@/components/ui/card'
import { FaPen, FaUsers } from 'react-icons/fa'
import { FaArrowTrendUp } from 'react-icons/fa6'
export default function Home() {
	return (
		<div className='w-full justify-center items-center flex-wrap  flex flex-col  '>
			<h1 className='text-3xl text-center font-bold '>Track all your issues</h1>
			<div className='gap-10 flex justify-around mt-10'>
				<Card className=' w-[250px] h-[300px] shadow-violet-300 shadow-lg py-4'>
					<div className='flex items-center justify-center'>
						<FaUsers className='text-7xl text-violet-500' />
					</div>
					<div className='pt-8'>
						<h3 className='text-xl text-center font-bold'>Team work</h3>
						<p className='text-center text-gray-600'>
							Track all your issues with your team
						</p>
					</div>
				</Card>
				<Card className=' w-[250px] h-[300px]  shadow-violet-300 shadow-lg'>
					<div className='flex items-center justify-center pt-6'>
						<FaPen className='text-7xl text-violet-500' />
					</div>
					<div className='pt-8'>
						<h3 className='text-xl text-center font-bold'>Editing</h3>
						<p className='text-center text-gray-600'>Easily edit your issues</p>
					</div>
				</Card>
				<Card className=' w-[250px] h-[300px]  shadow-violet-300 shadow-lg'>
					<div className='flex items-center justify-center pt-6'>
						<FaArrowTrendUp className='text-7xl text-violet-500' />
					</div>
					<div className='pt-8'>
						<h3 className='text-xl text-center font-bold'>
							Boost productivity
						</h3>
						<p className='text-center text-gray-600'>
							Finish your tasks faster
						</p>
					</div>
				</Card>
			</div>
		</div>
	)
}
