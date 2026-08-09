import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import PageHeader from "@/components/PageHeader";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { favouritesAtom } from "@/store";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <PageHeader text="Login" subtext="Enter your login information below:" />

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <Alert variant="danger" className="mt-3">
            {warning}
          </Alert>
        )}

        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
