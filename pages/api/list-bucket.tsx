import { Params, credentials } from "@/utils/s3";
import { AWSError } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";

export default async function getBucketListAws() {
  const s3 = new S3(credentials);
  const params: any = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
  };
  try {
    const res: PromiseResult<S3.ListObjectsV2Output, AWSError> = await s3
      .listObjectsV2(params)
      .promise();
    return res.Contents;
  } catch (error) {
    console.log(error);
  }
}
