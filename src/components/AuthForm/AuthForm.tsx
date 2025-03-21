import { useRef, useState } from "react";
import EmailInput from "../Inputs/InputWithIcon";
import PasswordSignUp from "../Inputs/PasswordSIgnUp";
import PasswordLogIn from "../Inputs/PasswordLogin";
import NormalInput from "../Inputs/Input";
import { AtSignIcon } from "lucide-react";
import FileInput from "../Inputs/FileInput";
import { Button } from "react-aria-components";
import LoadingButton from "../LoadingButton";

type Props = {
  title: string;
  onSubmit: (
    email: string,
    password: string,
    name: string,
    image: File | null
  ) => Promise<void>;
  type?: "login" | "register";
  buttonText: string;
  role?: "owner" | "customer";
  isLoading?: boolean;
};

export default function AuthFormWithImage({
  title,
  onSubmit,
  buttonText,
  type = "login",
  role,
  isLoading,
}: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(
        emailRef.current?.value || "",
        passwordRef.current?.value || "",
        nameRef.current?.value || "",
        imageRef.current
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <NormalInput
              label="Name"
              placeHolder="Name"
              type="text"
              inputRef={nameRef}
            />
          )}
          <EmailInput
            Icon={AtSignIcon}
            placeholder="Email"
            label="Email"
            type="email"
            inputRef={emailRef}
          />
          {type === "register" ? (
            <PasswordSignUp inputRef={passwordRef} />
          ) : (
            <PasswordLogIn inputRef={passwordRef} />
          )}
          {type === "register" && (
            <FileInput
              label="Profile Picture"
              setFile={(file) => (imageRef.current = file)}
            />
          )}
          {!isLoading ? (
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {buttonText}
            </Button>
          ) : (
            <LoadingButton
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              label={buttonText}
            />
          )}
        </form>
        {role && (
          <div className="text-blue-500/80 pt-4 text-sm">
            <a href={`/signup/${role}`}>Don't have an account? Sign Up</a>
          </div>
        )}
      </div>
    </div>
  );
}
