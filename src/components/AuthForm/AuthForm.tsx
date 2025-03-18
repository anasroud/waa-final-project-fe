import { useId, useState } from "react";
import FileInput from "../Inputs/FileInput";
import EmailInput from "../Inputs/InputWithIcon";
import PasswordSignUp from "../Inputs/PasswordSIgnUp";
import PasswordLogIn from "../Inputs/PasswordLogin";
import NormalInput from "../Inputs/Input";
import { AtSignIcon } from "lucide-react";

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
};

export default function AuthFormWithImage({
  title,
  onSubmit,
  buttonText,
  type = "login",
}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(email, password, name, image);
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
              label="Enter your Name"
              placeHolder="Name"
              type="text"
              setValue={setName}
            />
          )}
          <EmailInput
            Icon={AtSignIcon}
            placeholder="Email"
            label="Enter Your Email"
            type="email"
            setValue={setEmail}
          />
          {type === "register" ? (
            <PasswordSignUp setPassword={setPassword} />
          ) : (
            <PasswordLogIn setPassword={setPassword} />
          )}
          {type === "register" && <FileInput setImage={setImage} />}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
