import { useAuth } from "@/context/AuthContext";
import AuthFormWithImage from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function CustomerRegister() {
  const { register, loading } = useAuth();

  return (
    <>
      <Nav />
      <AuthFormWithImage
        title="Customer Register"
        type="register"
        onSubmit={(email, password, name, image) =>
          register(email, password, name, image, "customer")
        }
        buttonText="Register"
        isLoading={loading}
      />
    </>
  );
}
