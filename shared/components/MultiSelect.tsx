import { Control, FieldValue, UseControllerProps } from 'react-hook-form'

//// Imported from shadcn form
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import ReactSelect, { GroupBase, OptionsOrGroups } from 'react-select'
import { cn } from '@/lib/utils'

interface Option {
	label: string
	value?: string | number
	options?: Option[]
	[key: string]: any
}

interface Props extends UseControllerProps {
	options?: OptionsOrGroups<Option, GroupBase<Option>> | undefined
	isMulti?: boolean
	label: string
	control: Control<FieldValue<any>>
	isSearchable?: boolean
}
export const MultiSelect = (props: Props) => {
	const { options, isMulti, name, label, control, isSearchable, defaultValue } =
		props

	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			render={({ field }) => (
				<FormItem className='m-1'>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<ReactSelect
							{...field}
							name={name}
							isMulti={isMulti}
							unstyled={true}
							isSearchable={isSearchable}
							hideSelectedOptions={true}
							classNames={{
								control: e =>
									cn(
										`rounded-md border`,
										`border-input px-3 py-1 text-sm`,
										e.isFocused ? 'ring-1 ring-ring' : ''
									),
								indicatorSeparator: () => 'bg-gray-100 mx-2',
								dropdownIndicator: () => 'text-gray-400',
								menu: () =>
									cn(
										'absolute top-0 mt-1 text-sm z-10 w-full',
										'rounded-md border bg-popover shadow-md overflow-x-hidden'
									),
								option: () =>
									cn(
										'cursor-default',
										'rounded-sm py-1.5 m-1 px-2 text-sm outline-none',
										'focus:bg-gray-200 hover:bg-gray-200 w-auto'
									),
								noOptionsMessage: () => 'p-5',
								multiValue: () => 'bg-gray-200 px-2 p-1 rounded mr-2',
								input: () => 'text-sm overflow-x-hidden',
							}}
							options={options}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
