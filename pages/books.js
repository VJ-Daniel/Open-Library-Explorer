import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  let queryString = { ...router.query };
  let qParts = [];
  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  } 
  else {
    queryString = "";
  }

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10&fields=key,title,first_publish_year`
      : null,
    { keepPreviousData: true },
  );

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  if (error) return <p>Error loading books.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={Object.entries(router.query)
          .map(([key, value]) => `${key}: ${value}`)
          .join(" | ")}
      />

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>

        <tbody>
          {data.docs.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(`/works/${book.key.split("/").pop()}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />

        <Pagination.Item active>{page}</Pagination.Item>

        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
