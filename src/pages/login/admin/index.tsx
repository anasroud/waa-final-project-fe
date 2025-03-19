import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm/AuthForm';

export default function AdminLogin() {
  const { login } = useAuth();

  return (
    <AuthForm
      title="Admin Login"
      onSubmit={(email, password) => login(email, password, 'admin')}
      buttonText="Login"
    />
  );
}
