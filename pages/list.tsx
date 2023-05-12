import getBucketListAws from "./api/list-bucket";
import Item from "@/components/Item";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import styles from "@/styles/cards.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function List({ stringList }: { stringList: string }) {
  const list: Object[] = JSON.parse(stringList);

  return (
    <>
      <Head>
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
      <h1 className={styles.title}>List of files</h1>
      <div className={styles.cardContainer}>
        {list &&
          list.map((item: any, index: any) => {
            return <Item key={index} file={item} />;
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
