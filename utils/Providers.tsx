'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export const Providers = ({ children }: React.PropsWithChildren) => {
	const client = new QueryClient()

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
