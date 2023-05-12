import getFileAws from "@/pages/api/get-file";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "@/styles/cards.module.css";
import moment from "moment";
import Modal from "@/components/Modal";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

export default function Item({ file }: any) {
  const [icon, setIcon] = useState<string>("/icons/image.png");
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [date, setDate] = useState<string>();
  const [show, setShow] = useState<boolean>(false);

  const getFile = async () => {
    console.log("ciao");
    const res: any = await getFileAws(file.Key);
    const object: PromiseResult<S3.GetObjectOutput, AWSError> = res.object;
    const url: string = res.url;
    setDate(moment(object.LastModified).format("MMMM Do YYYY, h:mm:ss a"));
    if (object.ContentType?.includes("image")) {
      // setIcon("/icons/image.png");
      setIcon(url);
    } else if (object.ContentType?.includes("pdf")) {
      setIcon("/icons/pdf.png");
    } else if (object.ContentType?.includes("excel")) {
      setIcon("/icons/excel.png");
    } else if (object.ContentType?.includes("word")) {
      setIcon("/icons/word.png");
    } else if (object.ContentType?.includes("text")) {
      setIcon("/icons/text.png");
    }
    if (url) {
      const response: Response = await fetch(url);
      const result: Blob = await response.blob();
      const blobUrl: string = URL.createObjectURL(result);
      setDownloadUrl(blobUrl);
    }
  };

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Card style={{ width: "9rem" }} className={styles.card}>
        <Card.Img variant="top" src={icon} alt={file.Key} title={file.Key} />
        <div>
          <p className={styles.date}>{date}</p>
          <Card.Title>{file.Key}</Card.Title>
          <a href={downloadUrl} download={file.Key}>
            <Image
              src="/icons/download.png"
              alt="download"
              title="download"
              width={25}
              height={25}
              className={styles.downloadIcon}
            />
          </a>
          <a
            onClick={() => {
              setShow(true);
            }}
          >
            <Image
              src="/icons/share.png"
              alt="share"
              title="share"
              width={25}
              height={25}
              className={styles.shareIcon}
            />
          </a>
        </div>
      </Card>
      <Modal setShow={setShow} show={show} file={file.Key} />
    </>
  );
}
