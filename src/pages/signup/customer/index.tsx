import { useAuth } from "@/context/AuthContext";
import AuthFormWithImage from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function CustomerRegister() {
  const { register } = useAuth();

  return (
    <>
      <Nav />
      <AuthFormWithImage
        title="Customer Register"
        type="register"
        onSubmit={(email, password, name) =>
          register(email, password, name, "customer")
        }
        buttonText="Register"
      />
    </>
  );
}
