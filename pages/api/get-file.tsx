import S3 from "aws-sdk/clients/s3";

export default async function getBucketListAws(file: File){

    const s3 = new S3({
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
                region: process.env.NEXT_PUBLIC_AWS_REGION,
                signatureVersion: "v4"
            })
    try {
        var params: any = {
            Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, 
            Key: "140e51a9-a097-4e3a-8362-0d7a35598971.jpg"
            // Key: file.name
        };
        s3.getObject(params, function(error, data) {
            if (error){
                console.log(error)
            } else {
                console.log(data);
                return data;
            };
        });
    } catch (error) {
        console.log(error)
        return error;
    };
};
