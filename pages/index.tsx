import Inputs from "@/components/Inputs";
import { FileProvider } from "@/context/fileContext";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FileProvider>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "#fff" }}>
                Upload
              </Nav.Link>
              <Nav.Link href="/list">List</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Inputs />
      </FileProvider>
    </>
  );
}
