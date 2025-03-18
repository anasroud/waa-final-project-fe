import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '@/components/Nav/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Property } from '@/components/PropertyItem/PropertyItem';

interface PropertyFormProps {
    propertyId?: string;
    isEditing?: boolean;
}

const PropertyForm = ({ propertyId, isEditing = false }: PropertyFormProps) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Property>>({
        title: '',
        description: '',
        city: '',
        state: '',
        zipCode: '',
        address: '',
        price: 0,
        bedroomCount: 0,
        bathroomCount: 0,
        homeType: '',
        squareFootage: 0,
        hasParking: false,
        hasPool: false,
        hasAC: false,
        imageURLs: []
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateField = (name: string, value: any): string => {
        switch (name) {
            case 'title':
                return !value ? 'Title is required' : value.length < 3 ? 'Title must be at least 3 characters' : '';
            case 'description':
                return !value ? 'Description is required' : value.length < 10 ? 'Description must be at least 10 characters' : '';
            case 'city':
            case 'state':
                return !value ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '';
            case 'zipCode':
                return !value ? 'Zip code is required' : !/^\d{5}(-\d{4})?$/.test(value) ? 'Invalid zip code format' : '';
            case 'address':
                return !value ? 'Address is required' : '';
            case 'price':
                return !value ? 'Price is required' : value <= 0 ? 'Price must be greater than 0' : '';
            case 'bedroomCount':
            case 'bathroomCount':
                return !value ? `${name.replace('Count', ' count')} is required` : value < 0 ? 'Count must be 0 or greater' : '';
            case 'homeType':
                return !value ? 'Home type is required' : '';
            case 'squareFootage':
                return !value ? 'Square footage is required' : value <= 0 ? 'Square footage must be greater than 0' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;
        setFormData(prev => ({
            ...prev,
            [name]: numValue
        }));
        const error = validateField(name, numValue);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (isEditing && propertyId) {
                try {
                    // TODO: Replace with actual API call
                    const response = await fetch(`/api/properties/${propertyId}`);
                    if (!response.ok) throw new Error('Failed to fetch property');
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching property:', error);
                }
            }
        };

        fetchPropertyData();
    }, [isEditing, propertyId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const newErrors: Record<string, string> = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const endpoint = isEditing ? `/api/properties/${propertyId}` : '/api/properties';
                const method = isEditing ? 'PUT' : 'POST';

                const response = await fetch(endpoint, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) throw new Error('Failed to save property');
                router.push('/owner');
            } catch (error) {
                console.error('Error saving property:', error);
            }
        }
    };

    return (
        <div>
            <Nav />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">{isEditing ? 'Edit Property Listing' : 'Create New Property Listing'}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                aria-invalid={!!errors.title}
                                required
                            />
                            {errors.title && (
                                <p
                                    className="text-destructive mt-2 text-xs"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                aria-invalid={!!errors.description}
                                required
                            />
                            {errors.description && (
                                <p
                                    className="text-destructive mt-2 text-xs"
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.city}
                                    required
                                />
                                {errors.city && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.city}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.state}
                                    required
                                />
                                {errors.state && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.state}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.zipCode}
                                    required
                                />
                                {errors.zipCode && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.zipCode}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.address}
                                    required
                                />
                                {errors.address && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleNumberChange}
                                    aria-invalid={!!errors.price}
                                    required
                                />
                                {errors.price && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.price}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="bedroomCount">Bedrooms</Label>
                                <Input
                                    id="bedroomCount"
                                    name="bedroomCount"
                                    type="number"
                                    value={formData.bedroomCount}
                                    onChange={handleNumberChange}
                                    aria-invalid={!!errors.bedroomCount}
                                    required
                                />
                                {errors.bedroomCount && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.bedroomCount}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="bathroomCount">Bathrooms</Label>
                                <Input
                                    id="bathroomCount"
                                    name="bathroomCount"
                                    type="number"
                                    value={formData.bathroomCount}
                                    onChange={handleNumberChange}
                                    aria-invalid={!!errors.bathroomCount}
                                    required
                                />
                                {errors.bathroomCount && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.bathroomCount}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="homeType">Home Type</Label>
                                <Input
                                    id="homeType"
                                    name="homeType"
                                    value={formData.homeType}
                                    onChange={handleInputChange}
                                    aria-invalid={!!errors.homeType}
                                    required
                                />
                                {errors.homeType && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.homeType}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="squareFootage">Square Footage</Label>
                                <Input
                                    id="squareFootage"
                                    name="squareFootage"
                                    type="number"
                                    value={formData.squareFootage}
                                    onChange={handleNumberChange}
                                    aria-invalid={!!errors.squareFootage}
                                    required
                                />
                                {errors.squareFootage && (
                                    <p
                                        className="text-destructive mt-2 text-xs"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {errors.squareFootage}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Amenities</Label>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hasParking"
                                        checked={formData.hasParking}
                                        onCheckedChange={(checked) => handleCheckboxChange('hasParking', checked as boolean)}
                                    />
                                    <Label htmlFor="hasParking">Parking</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hasPool"
                                        checked={formData.hasPool}
                                        onCheckedChange={(checked) => handleCheckboxChange('hasPool', checked as boolean)}
                                    />
                                    <Label htmlFor="hasPool">Pool</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hasAC"
                                        checked={formData.hasAC}
                                        onCheckedChange={(checked) => handleCheckboxChange('hasAC', checked as boolean)}
                                    />
                                    <Label htmlFor="hasAC">Air Conditioning</Label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="images">Images</Label>
                            <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    // TODO: Implement image upload logic
                                    console.log('Images selected:', e.target.files);
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">{isEditing ? 'Update Property' : 'Create Property'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;