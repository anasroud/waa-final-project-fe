import { useRouter } from 'next/router';
import PropertyForm from '@/components/PropertyForm/PropertyForm';

const EditPropertyPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return <PropertyForm propertyId={id as string} isEditing={true} />;
};

export default EditPropertyPage;