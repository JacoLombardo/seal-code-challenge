import getBucketListAws from "./api/list-bucket";
import Item from "@/components/Item";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import styles from "@/styles/cards.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Button } from "react-bootstrap";

export interface downloadObject {
  url: string;
  name: string;
}

export default function List({ stringList }: { stringList: string }) {
  const list: Object[] = JSON.parse(stringList);
  const [selected, setSelected] = useState<downloadObject[]>([]);
  const [showSelect, setShowSelect] = useState<boolean>(false);

  const downloadFiles = () => {
    for (let i: number = 0; i < selected.length; i++) {
      const a: HTMLAnchorElement = document.createElement("a");
      a.href = selected[i].url;
      a.download = selected[i].name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      <Head>
        <title>SEAL App</title>
        <meta name="SEAL App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Upload</Nav.Link>
            <Nav.Link href="/list" style={{ color: "#fff" }}>
              List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.buttonsContainer}>
        {showSelect && (
          <Button variant="secondary" onClick={downloadFiles}>
            Download
          </Button>
        )}
        {showSelect ? (
          <Button
            variant="secondary"
            onClick={() => {
              setShowSelect((prevCheck) => !prevCheck);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              setShowSelect((prevCheck) => !prevCheck);
            }}
          >
            Select files
          </Button>
        )}
      </div>
      <h1 className={styles.title}>List of files</h1>

      <div className={styles.cardContainer}>
        {list &&
          list.map((item: any, index: any) => {
            return (
              <Item
                key={index}
                file={item.Key}
                showSelect={showSelect}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const list: Object[] | undefined = await getBucketListAws();
    const stringList: string = JSON.stringify(list);
    return {
      props: {
        stringList,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
