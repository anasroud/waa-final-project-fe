import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm/AuthForm';

export default function OwnerLogin() {
  const { login } = useAuth();

  return (
    <AuthForm
      title="Owner Login"
      onSubmit={(email, password) => login(email, password, 'owner')}
      buttonText="Login"
    />
  );
}
