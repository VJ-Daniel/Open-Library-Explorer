import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  if (favouritesList.length === 0) {
    return (
      <PageHeader
        text="Nothing Here"
        subtext="Add a book to your favourites first."
      />
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your favourite books." />

      <Row className="gy-4">
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}>
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>
  );
}
