import Card from "react-bootstrap/Card";

export default function PageHeader({ text, subtext }) {
  return (
    <Card className="bg-light shadow-sm mb-4">
      <Card.Body>
        <Card.Title as="h1" className="mb-2">
          {text}
        </Card.Title>
        {subtext ? <Card.Text className="text-muted">{subtext}</Card.Text> : null}
      </Card.Body>
    </Card>
  );
}