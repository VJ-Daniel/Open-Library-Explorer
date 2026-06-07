/*********************************************************************************
 *  WEB422 – Assignment 1
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: VJ Daniel Uy Student ID: 106680242 Date: June 07, 2026
 *
 ********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const author = "Jay Asher";

  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?q=author:${encodeURIComponent(author)}&page=${page}&limit=10&fields=key,title,first_publish_year`,
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

  return (
    <>
      <PageHeader text={`Novels by ${author}`} />
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>

        <tbody>
          {data?.docs?.map((book) => (
            <tr
              key={book}
              onClick={() => router.push(book.key)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} />

        <Pagination.Item>{page}</Pagination.Item>

        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
