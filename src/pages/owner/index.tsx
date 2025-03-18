import Nav from '@/components/Nav/Nav'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

function Owner() {
    const router = useRouter();

    return (
        <div>
            <Nav />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Property Owner Dashboard</h1>
                    <Button onClick={() => router.push('/owner/create-property')}>
                        Create Property
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Owner