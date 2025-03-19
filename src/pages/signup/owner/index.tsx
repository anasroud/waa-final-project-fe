import { useAuth } from '@/context/AuthContext';
import AuthFormWithImage from '@/components/AuthForm/AuthForm';

export default function OwnerRegister() {
  const { register } = useAuth();

  return (
    <AuthFormWithImage
      title="Owner Register"
      onSubmit={(email, password, name, image) =>
        register(email, password, name, image, 'owner')
      }
      type="register"
      buttonText="Register"
    />
  );
}
