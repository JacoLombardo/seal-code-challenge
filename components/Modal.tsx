import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import styles from "@/styles/cards.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import createDownloadLinkAws from "@/pages/api/create-download-link";
import Image from "next/image";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  file: string;
}

export default function Input({ show, setShow, file }: Props) {
  const [url, setUrl] = useState<string>("");
  const [time, setTime] = useState<number>(300);

  const getDownloadLink = async () => {
    const res: string | undefined = await createDownloadLinkAws(file, +time);
    if (res) {
      setUrl(res);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  const handleClose = () => {
    setUrl("");
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Create download link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Expiration time:</p>
          <select
            id="time"
            name="time"
            onChange={(e: any) => {
              setTime(e.target.value);
            }}
          >
            <option value="300">5 minutes</option>
            <option value="3600">1 hour</option>
            <option value="10800">3 hours</option>
          </select>
          <br />
          <br />
          {url && (
            <div>
              <a
                href={url}
                target="_blank"
                download={file}
                style={{ overflowWrap: "break-word" }}
              >
                {url}
              </a>
              <a onClick={copyLink} className={styles.copyIcon}>
                <Image
                  src={"/icons/copy.png"}
                  alt="copy"
                  title="copy link"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={getDownloadLink}>
            Get Download Link
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
}
