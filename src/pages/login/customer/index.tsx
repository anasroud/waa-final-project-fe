import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function CustomerLogin() {
  const { login } = useAuth();

  return (
    <>
      <Nav />
      <AuthForm
        title="Customer Login"
        onSubmit={(email, password) => login(email, password, "customer")}
        buttonText="Login"
        role="customer"
      />
    </>
  );
}
