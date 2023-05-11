import Inputs from "@/components/Inputs";
import { FileContext, FileProvider } from "@/context/fileContext";
import { useContext } from "react";
import getBucketListAws from "./api/list-bucket";
import downloadFileAws from "./api/download-file";

export default function SendAws(){
    const {getBucketList} = useContext(FileContext);

    const getList = async () => {
        const list = await getBucketListAws();
        console.log(list)
    };

    const downloadFile= async () => {
        // await downloadFileAws();
    }
    
    return(
        <>
        <FileProvider>
            <Inputs />
            <input type="button" onClick={getList} defaultValue="get list" />
            <input type="button" onClick={downloadFile} defaultValue="download file" />
        </FileProvider>
        </>
    );
}