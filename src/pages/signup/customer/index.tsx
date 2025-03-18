import { useAuth } from '@/context/AuthContext';
import AuthFormWithImage from '@/components/AuthForm/AuthForm';

export default function CustomerRegister() {
  const { register } = useAuth();

  return (
    <AuthFormWithImage
      title="Customer Register"
      type="register"
      onSubmit={(email, password, name, image) =>
        register(email, password, name, image, 'customer')
      }
      buttonText="Register"
    />
  );
}
