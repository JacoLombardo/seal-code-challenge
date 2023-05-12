import { credentials } from "@/utils/s3";
import S3 from "aws-sdk/clients/s3";

export default async function uploadFileAws(files: File[]) {
  const s3 = new S3(credentials);
  for (let i = 0; i < files.length; i++) {
    const params: any = {
      Body: files[i],
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: files[i].name,
      Expires: 600,
      ContentType: files[i].type,
    };
    try {
      s3.putObject(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
  return "Uploaded!";
}
