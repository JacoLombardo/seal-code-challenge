import { Params, credentials } from "@/utils/s3";
import S3 from "aws-sdk/clients/s3";

export default async function createDownloadLinkAws(
  file: string,
  time: number
) {
  const s3: S3 = new S3(credentials);

  const params: Params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: file,
    Expires: time,
  };
  try {
    const object: string = await s3.getSignedUrlPromise("getObject", params);
    return object;
  } catch (error) {
    console.log(error);
  }
}
