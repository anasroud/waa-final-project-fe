import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { BedDouble, DollarSign, ShowerHead, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Property {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    price: number;
    bedroomCount: number;
    bathroomCount: number;
    status: string;
}

const PropertiesTable = () => {
    const router = useRouter();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch('/api/properties');
            if (!response.ok) throw new Error('Failed to fetch properties');
            const data = await response.json();
            setProperties(data.properties);
            setLoading(false);
        } catch (err) {
            console.log(err);

            setError('Failed to load properties');
            setLoading(false);
        }
    };

    const handleEdit = (propertyId: string) => {
        router.push(`/owner/edit-property/${propertyId}`);
    };

    const handleDelete = async (propertyId: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;

        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete property');
            fetchProperties(); // Refresh the list
        } catch (err) {
            console.log(err);

            setError('Failed to delete property');
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Property Details</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {properties.map((property) => (
                    <TableRow key={property.id}>
                        <TableCell>
                            <div className="text-sm font-medium">{property.title}</div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                {property.address}, {property.city}, {property.state} {property.zipCode}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                    <BedDouble className="mr-1" />
                                    {property.bedroomCount}
                                </span>
                                <span className="flex items-center">
                                    <ShowerHead className="mr-1" />
                                    {property.bathroomCount}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center text-sm">
                                <DollarSign className="mr-2 text-green-500" />
                                ${property.price.toLocaleString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            {property.status === 'AVAILABLE' && (
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(property.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(property.id)}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default PropertiesTable;