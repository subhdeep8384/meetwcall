"use client"
import ErrorState from '@/components/error-state'
import React from 'react'

const ErrorPage = () => {
    return (
        <div>
            <ErrorState title='error' description='something went wrong' />
        </div>
    )
}

export default ErrorPage
