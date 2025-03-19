import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export interface IFileInputProps {
  label: string;
  setFile: (file: File) => void;
}

const FileInput = ({ label, setFile }: IFileInputProps) => {
  const id = useId();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
