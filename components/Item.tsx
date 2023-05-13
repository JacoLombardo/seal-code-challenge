import getFileAws from "@/pages/api/get-file";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "@/styles/cards.module.css";
import moment from "moment";
import Modal from "@/components/Modal";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";
import { downloadObject } from "@/pages/list";

interface Res {
  object: PromiseResult<S3.GetObjectOutput, AWSError>;
  url: string;
}

interface Props {
  file: string;
  showSelect: boolean;
  selected: downloadObject[];
  setSelected: Dispatch<SetStateAction<downloadObject[]>>;
}

export default function Item({
  file,
  showSelect,
  selected,
  setSelected,
}: Props) {
  const [icon, setIcon] = useState<string>("/icons/image.png");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [show, setShow] = useState<boolean>(false);
  const [showSelected, setShowSelected] = useState<boolean>(false);

  const getFile = async () => {
    const res: Res | undefined = await getFileAws(file);
    if (res) {
      const object: PromiseResult<S3.GetObjectOutput, AWSError> = res.object;
      const url: string = res.url;
      setDate(moment(object.LastModified).format("MMMM Do YYYY, h:mm:ss a"));
      if (object.ContentType?.includes("image")) {
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
      const response: Response = await fetch(url);
      const result: Blob = await response.blob();
      const blobUrl: string = URL.createObjectURL(result);
      setDownloadUrl(blobUrl);
    }
  };

  const selectFile = () => {
    selected.push({
      url: downloadUrl,
      name: file,
    });
    setShowSelected(true);
  };

  const deselectFile = () => {
    setSelected((current) =>
      current.filter((item) => {
        return item.url !== downloadUrl && item.name !== file;
      })
    );
    setShowSelected(false);
  };

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Card style={{ width: "9rem" }} className={styles.card}>
        <div
          style={{
            position: "relative",
          }}
        >
          <Card.Img variant="top" src={icon} alt={file} title={file} />
          {icon.includes("https") && (
            <Image
              src="/icons/image.png"
              alt="image"
              title="image"
              width={25}
              height={25}
              className={styles.imageIcon}
            />
          )}
        </div>
        <div>
          <p className={styles.date}>{date}</p>
          <Card.Title>{file}</Card.Title>
          {showSelect ? (
            <a onClick={showSelected ? deselectFile : selectFile}>
              <Image
                src={showSelected ? "/icons/selected.png" : "/icons/select.png"}
                alt={showSelected ? "/icons/selected.png" : "/icons/select.png"}
                title={
                  showSelected ? "/icons/selected.png" : "/icons/select.png"
                }
                width={26}
                height={26}
                className={styles.selectIcon}
              />
            </a>
          ) : (
            <a href={downloadUrl} download={file}>
              <Image
                src="/icons/download.png"
                alt="download"
                title="download"
                width={25}
                height={25}
                className={styles.downloadIcon}
              />
            </a>
          )}
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
      <Modal setShow={setShow} show={show} file={file} />
    </>
  );
}
