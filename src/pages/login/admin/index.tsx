import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function AdminLogin() {
  const { login } = useAuth();

  return (
    <>
      <Nav />
      <AuthForm
        title="Admin Login"
        onSubmit={(email, password) => login(email, password, "admin")}
        buttonText="Login"
      />
    </>
  );
}
