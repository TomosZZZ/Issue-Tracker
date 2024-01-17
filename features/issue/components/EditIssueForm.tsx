'use client'
import React from 'react'
import { EditIssueSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
} from '@/components/ui/select'
import { useSearchParams } from 'next/navigation'
import { useGetIssue } from '../api/getIssue'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useEditIssue } from '../api/editIssue'

type IssueFormSchema = z.infer<typeof EditIssueSchema>

export const EditIssueForm = () => {
	const form = useForm<IssueFormSchema>({
		resolver: zodResolver(EditIssueSchema),
	})

	const searchParams = useSearchParams()
	const issueId = searchParams.get('id') as string

	const intIssueId = parseInt(issueId)

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form

	const { data, isLoading, isError, error } = useGetIssue(intIssueId)
	const { mutate, isPending } = useEditIssue()
	const issue = data?.issue

	const onSubmit = async (data: IssueFormSchema) => {
		mutate({ editedIssue: data, issueId: intIssueId })
	}
	if (!issueId) {
		return <h1>Id param in url is missing</h1>
	}
	return (
		<Card className='w-[80%]  flex justify-center shadow-xl shadow-violet-200 lg:w-[60%]'>
			{isLoading && (
				<div className='p-5'>
					<LoadingSpinner size={35} />
				</div>
			)}
			{isError && (
				<div className='p-5'>
					<p className=' text-xl'>{error.toString()}</p>
				</div>
			)}
			{!isLoading && !isError && issue && (
				<Form {...form}>
					<form
						className='p-4 w-3/4 flex flex-col space-y-8 '
						onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={control}
							name='title'
							defaultValue={issue.title}
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
							defaultValue={issue.description}
							render={({ field }) => (
								<FormItem>
									<FormLabel
										className='text-md sm:text-lg'
										htmlFor='description'>
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

						<FormField
							control={control}
							name='status'
							defaultValue={issue.status}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-md sm:text-lg' htmlFor='title'>
										Status
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value='OPEN'>OPEN</SelectItem>
												<SelectItem value='IN_PROGRESS'>IN_PROGRESS</SelectItem>
												<SelectItem value='CLOSED'>CLOSED</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									{errors.title && (
										<p className=' text-red-600 text-sm font-light'>{`${errors.title.message}`}</p>
									)}
								</FormItem>
							)}
						/>
						<div className='text-center mt-4'>
							<Button
								className=' bg-violet-600  text-white text-md sm:text-lg font-medium hover:bg-violet-800'
								type='submit'
								variant={'secondary'}
								disabled={isPending}>
								Update
							</Button>
						</div>
					</form>
				</Form>
			)}
		</Card>
	)
}
