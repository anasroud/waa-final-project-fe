import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function OwnerLogin() {
  const { login } = useAuth();

  return (
    <>
      <Nav />
      <AuthForm
        title="Owner Login"
        onSubmit={(email, password) => login(email, password, "owner")}
        buttonText="Login"
        role="owner"
      />
    </>
  );
}
