import uploadFileAws from "@/pages/api/upload-file";
import { createContext, ReactNode, useState } from "react";

export type FileContextValue = {
  files: File[];
  message: string | null;
  storeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadFile: () => void;
};
const initialFileContext: FileContextValue = {
  files: [],
  message: null,
  storeFile: () => {},
  uploadFile: () => {},
};

// ** Create Context
export const FileContext = createContext<FileContextValue>(initialFileContext);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(
    initialFileContext.message
  );

  const storeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i: number = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
    }
  };
  const uploadFile = async () => {
    var returnData: string = await uploadFileAws(files);
    setMessage(returnData);
    setFiles([]);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <FileContext.Provider value={{ files, message, storeFile, uploadFile }}>
      {children}
    </FileContext.Provider>
  );
};
