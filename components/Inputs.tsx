import { FileContext } from "@/context/fileContext";
import { useContext } from "react";
import styles from "@/styles/cards.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Input() {
  const { storeFile, uploadFile, message } = useContext(FileContext);

  return (
    <>
      <h1 className={styles.title}>Upload File:</h1>
      <div className={styles.inputContainer}>
        <InputGroup className="mb-3">
          <Form.Control
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              storeFile(e);
            }}
            multiple
            accept="application/msword, application/vnd.ms-excel, text/plain, application/pdf, image/*"
          />
          <Button variant="secondary" onClick={uploadFile}>
            Upload
          </Button>
        </InputGroup>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
