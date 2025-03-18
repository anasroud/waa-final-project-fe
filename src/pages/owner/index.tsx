import Nav from '@/components/Nav/Nav'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import PropertiesTable from '@/components/PropertiesTable/PropertiesTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CircleDollarSign, HouseIcon, HousePlus } from 'lucide-react'

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
                <Tabs defaultValue="my-properties" className="w-full">
                    <ScrollArea>
                        <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
                            <TabsTrigger
                                value="my-properties"
                                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <HouseIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                My Properties
                            </TabsTrigger>
                            <TabsTrigger
                                value="offers"
                                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <CircleDollarSign className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                Offers
                            </TabsTrigger>
                            <TabsTrigger
                                value="sold-properties"
                                className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <HousePlus className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                Sold Properties
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <TabsContent value="my-properties">
                        <PropertiesTable />
                    </TabsContent>
                    <TabsContent value="offers">
                        <p className="text-muted-foreground pt-1 text-center text-lg">Offers content coming soon</p>
                    </TabsContent>
                    <TabsContent value="sold-properties">
                        <p className="text-muted-foreground pt-1 text-center text-lg">Sold properties content coming soon</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Owner