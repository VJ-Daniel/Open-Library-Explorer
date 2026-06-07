import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function BookDetails({ book }) {
  return (
    <Container>
      <Row>
        <Col lg="4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book?.title}</h3>

          {book?.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <br />

          <h5>Characters</h5>
          {book?.subject_people?.join(", ")}

          <br />
          <br />

          <h5>Settings</h5>
          {book?.subject_places?.join(", ")}

          <br />
          <br />

          <h5>More Information</h5>
          {book?.links?.map((link, index) => (
            <span key={index}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <br />
            </span>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
