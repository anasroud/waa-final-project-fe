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
        onSubmit={(email, password, name, image) =>
          register(email, password, name, image, "owner")
        }
        type="register"
        buttonText="Register"
      />
    </>
  );
}
