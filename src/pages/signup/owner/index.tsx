import { useAuth } from "@/context/AuthContext";
import AuthFormWithImage from "@/components/AuthForm/AuthForm";
import Nav from "@/components/Nav/Nav";

export default function OwnerRegister() {
  const { register } = useAuth();

  return (
    <>
      <Nav />
      <AuthFormWithImage
        title="Owner Register"
        onSubmit={(email, password, name) =>
          register(email, password, name, "owner")
        }
        type="register"
        buttonText="Register"
      />
    </>
  );
}
