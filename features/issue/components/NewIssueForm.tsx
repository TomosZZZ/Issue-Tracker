'use client'
import React from 'react'
import { Form } from '@/components/ui/form'
import { CreateIssueSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useCreateIssue } from '../api'

type CreateIssueFormData = z.infer<typeof CreateIssueSchema>

export const NewIssueForm = () => {
	const form = useForm<CreateIssueFormData>({
		resolver: zodResolver(CreateIssueSchema),
	})

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form
	const { mutate, isPending } = useCreateIssue()
	const onSubmit = async (data: CreateIssueFormData) => {
		mutate(data)
	}

	return (
		<Card className='w-[80%] flex justify-center shadow-xl shadow-violet-200 lg:w-[60%]'>
			<Form {...form}>
				<form
					className='p-4 w-3/4 flex flex-col space-y-8 '
					onSubmit={handleSubmit(onSubmit)}>
					<h1 className='text-2xl text-center font-bold '>Create New Issue</h1>
					<FormField
						control={control}
						name='title'
						defaultValue={''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-md sm:text-lg' htmlFor='title'>
									Title
								</FormLabel>
								<FormControl>
									<Input
										id='title'
										className='text-xs sm:text-lg'
										placeholder='Issue Title:'
										{...field}
									/>
								</FormControl>
								{errors.title && (
									<p className=' text-red-600 text-sm font-light'>{`${errors.title.message}`}</p>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='description'
						defaultValue={''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-md sm:text-lg' htmlFor='description'>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										id='description'
										className='text-xs sm:text-lg'
										placeholder='Issue Description:'
										{...field}
									/>
								</FormControl>
								{errors.description && (
									<p className=' text-red-600 text-sm font-light'>{`${errors.description.message}`}</p>
								)}
							</FormItem>
						)}
					/>
					<div className='text-center mt-4'>
						<Button
							disabled={isPending}
							className=' bg-violet-600  text-white text-md sm:text-lg font-medium hover:bg-violet-800'
							type='submit'
							variant={'secondary'}>
							Create
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	)
}
