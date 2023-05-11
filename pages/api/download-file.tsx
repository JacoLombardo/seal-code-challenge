import S3 from "aws-sdk/clients/s3";
import { GetObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import axios from "axios";
import { Credentials } from "aws-sdk";

export default async function downloadFileAws(){

    // const s3 = new S3({
    //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    //     region: process.env.NEXT_PUBLIC_AWS_REGION,
    //     signatureVersion: "v4"
    // });
    // try {
    //     var params: any = {
    //         Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, 
    //         Key: "140e51a9-a097-4e3a-8362-0d7a35598971.jpg"
    //         // Key: file.name
    //     };
    //     s3.getObject(params, function(error, data) {
    //         if (error){
    //             console.log(error)
    //         } else {
    //             console.log(data);
    //             return data;
    //         };
    //     });
    // } catch (error) {
    //     console.log(error)
    //     return error;
    // };

    
    //     {

    //     // accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //     // secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    //     region: process.env.NEXT_PUBLIC_AWS_REGION,
    //     credentials Credentials
    //     // signatureVersion: "v4"
    // }
    
    // const credentials = {
    //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    // }

    // const config = {
    //     region: process.env.NEXT_PUBLIC_AWS_REGION,
    //     credentials
    // }
    // const S3ClientConfig({
    //     credentials: credentials,
        
    // })

    // const client = new S3Client()

    //     const command = new GetObjectCommand({
    //       Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    //       Key: "140e51a9-a097-4e3a-8362-0d7a35598971.jpg"
    //     });
      
    //     try {
    //       const response = await client.send(command);
    //       // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    //       const str = await response.Body?.transformToString();
    //       console.log(str);
    //     } catch (err) {
    //       console.error(err);
    //     }
};
    