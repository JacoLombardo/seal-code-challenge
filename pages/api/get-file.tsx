import { credentials } from "@/utils/s3";
import { AWSError } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";

export default async function getFileAws(file: string) {
  const s3: S3 = new S3(credentials);

  const params: any = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: file,
  };
  try {
    const object: PromiseResult<S3.GetObjectOutput, AWSError> = await s3
      .getObject(params)
      .promise();
    const url: string = await s3.getSignedUrlPromise("getObject", params);
    return {
      object,
      url,
    };
  } catch (error) {
    console.log(error);
  }
}
