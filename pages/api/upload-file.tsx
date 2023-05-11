import S3 from "aws-sdk/clients/s3";
import axios from "axios";

export default async function uploadFileAws(file: File){
    // try {
    //     const fileParams = {
    //         Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    //         Key: file.name,
    //         Expires: 600,
    //         ContentType: file.type
    //     };
    //     const s3 = new S3({
    //         accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    //         region: process.env.NEXT_PUBLIC_AWS_REGION,
    //         signatureVersion: "v4"
    //     })
    //     const url = await s3.getSignedUrlPromise("putObject", fileParams);
    //     await axios.put(url, file, {
    //         headers: 
    //         {
    //             "Content-type": String(file.type)
    //         }
    //     });
    //     return "Uploaded!";
    // } catch (error) {
    //     console.log(error)
    //     return error;
    // };

    const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        signatureVersion: "v4"
    });
    try {
        var params: any = {
            Body: file,
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
            Key: file.name,
            Expires: 600,
            ContentType: file.type
        };
        s3.putObject(params, function(error, data) {
            if (error){
                console.log(error)
            } else {
                return "Uploaded!"
            };
        });
    } catch (error) {
        console.log(error)
        return error;
    };
}