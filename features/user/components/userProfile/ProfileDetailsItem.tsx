type ProfileDetailsItemProps = {
	title: string
	value: string
}

export const ProfileDetailsItem = ({
	title,
	value,
}: ProfileDetailsItemProps) => {
	return (
		<li className='flex justify-between py-3 '>
			<p className='font-bold'>{title}</p>
			<p>{value}</p>
		</li>
	)
}
