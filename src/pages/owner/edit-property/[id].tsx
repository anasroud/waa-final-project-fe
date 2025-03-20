import { useRouter } from "next/router";
import PropertyForm from "@/components/PropertyForm/PropertyForm";
import Nav from "@/components/Nav/Nav";

const EditPropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Nav />
      <PropertyForm propertyId={id as string} isEditing={true} />
    </>
  );
};

export default EditPropertyPage;
