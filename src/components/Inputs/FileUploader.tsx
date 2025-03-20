import { Input } from "@/components/ui/input";
import { useId, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface FileUploadResponse {
  message: string;
  data: {
    url: string[];
  };
}

interface IFileUploaderProps {
  onUploadSuccess?: (urls: string[]) => void;
  onError?: (error: string) => void;
  allowMultiple?: boolean;
}

const FileUploader = ({
  onUploadSuccess,
  onError,
  allowMultiple = true,
}: IFileUploaderProps) => {
  const id = useId();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(API_BASE_URL + "/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Error: ${response.status}`);
      }

      const data: FileUploadResponse = await response.json();

      if (data.message === "success" && data.data && data.data.url) {
        if (onUploadSuccess) {
          onUploadSuccess(data.data.url);
        }
      } else {
        if (onError) {
          onError("Upload failed: " + data.message);
        }
      }
    } catch (error: unknown) {
      if (onError) {
        if (error instanceof Error) {
          onError("Upload error: " + error.message);
        } else {
          onError("Upload error: An unknown error occurred.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <Input
        id={id}
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file"
        multiple={allowMultiple} // Allow multiple files to be selected
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUploader;
