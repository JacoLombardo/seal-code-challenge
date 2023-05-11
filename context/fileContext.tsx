import downloadFileAws from '@/pages/api/download-file';
import getBucketListAws from '@/pages/api/list-bucket';
import uploadFileAws from '@/pages/api/upload-file';
import { createContext, ReactNode, useState } from 'react';

export type FileContextValue = {
    file: any,
    message: any,
    storeFile: (e: any) => void,
    uploadFile: () => void,
    downloadFile: (item: any) => void,
    getBucketList: () => void,
}
const initialFileContext: FileContextValue = {
    file: null,
    message: null,
    storeFile: () => {},
    uploadFile: () => {},
    downloadFile: () => {},
    getBucketList: () => {},
}
  
  // ** Create Context
  export const FileContext = createContext<FileContextValue>(initialFileContext);
  
  export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<any>(initialFileContext.file);
    const [message, setMessage] = useState<String | null>(initialFileContext.message);

    const storeFile = (e: any) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };
    const uploadFile = async () => {
        setMessage("Uploading...");
        console.log(file)
        console.log(message)
        var returnData = await uploadFileAws(file);
        setMessage(String(returnData));
        setFile(null);
    };
    const downloadFile = async (item: any) => {
        downloadFileAws(item);
    };
    const getBucketList = async () => {
        const list = await getBucketListAws();
        console.log("1")
        return list;
    };
    return (
      <FileContext.Provider value={{ file, message, storeFile, uploadFile, downloadFile, getBucketList }}>
        {children}
      </FileContext.Provider>
    );
  };