import Link from "next/link";
import Card from "react-bootstrap/Card";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL9264548W.json");

  const data = await res.json();

  return {
    props: {
      book: data,
    },
  };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer - VJ Daniel" />

      <p>
        My name is VJ Daniel and I am currently studying Computer Programming
        and Analysis at Seneca Polytechnic.
      </p>

      <p>
        The book I selected for this assignment is Thirteen Reasons Why by Jay
        Asher. I chose this book because I enjoy mystery and young adult
        fiction, and I was interested in exploring how book information can be
        retrieved using the Open Library API.
      </p>

      <BookDetails book={props.book} />
    </>
  );
}