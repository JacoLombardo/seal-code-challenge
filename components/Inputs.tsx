import { FileContext } from "@/context/fileContext"
import { useContext } from "react"

export default function Input(){
    const {storeFile, uploadFile, message} = useContext(FileContext);

    return(
        <>
        <p>Upload File:</p>
        <input type="file" onChange={(e) => {storeFile(e)}}/>
        <input type="button" onClick={uploadFile} defaultValue="Upload" />
        <p>{message}</p>
        </>
    )
}