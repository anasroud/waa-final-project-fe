import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm/AuthForm';

export default function CustomerLogin() {
  const { login } = useAuth();

  return (
    <AuthForm
      title="Customer Login"
      onSubmit={(email, password) => login(email, password, 'customer')}
      buttonText="Login"
    />
  );
}
