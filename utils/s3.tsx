interface Credentials {
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
  region: string | undefined;
  signatureVersion: string | undefined;
}

export interface Params {
  Bucket: string | undefined;
  Key: File | string;
  Expires: number;
}

export const credentials: Credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  signatureVersion: "v4",
};
