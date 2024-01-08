'use client'
import React from 'react'
import { Form } from '@/components/ui/form'

import { createIssueSchema } from '@/features/issue/types/validationSchemas'
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
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { createIssue } from '@/shared/utils'

type IssueFormSchema = z.infer<typeof createIssueSchema>
export const NewIssueForm = () => {
	const form = useForm<IssueFormSchema>({
		resolver: zodResolver(createIssueSchema),
	})

	const { toast } = useToast()
	const router = useRouter()
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form

	const createIssueMutation = useMutation({
		mutationFn: createIssue,
		onSuccess: () => {
			toast({
				title: 'Success!',
				description: 'Creating issue succeed.',
			})
			router.replace('/issues')
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			})
		},
	})

	const onSubmit = async (data: IssueFormSchema) => {
		createIssueMutation.mutate(data)
	}

	return (
		<Card className='w-[60%] flex justify-center shadow-xl shadow-violet-200'>
			<Form {...form}>
				<form
					className='p-4 w-3/4 flex flex-col space-y-8 '
					onSubmit={handleSubmit(onSubmit)}>
					<FormField
						control={control}
						name='title'
						defaultValue={''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-lg' htmlFor='title'>
									Title
								</FormLabel>
								<FormControl>
									<Input id='title' placeholder='Issue Title:' {...field} />
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
								<FormLabel className='text-lg' htmlFor='description'>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										id='description'
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
							className=' bg-violet-600 text-white text-lg font-medium hover:bg-violet-800'
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
