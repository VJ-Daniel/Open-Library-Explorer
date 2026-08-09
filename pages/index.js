/*********************************************************************************
 *  WEB422 – Assignment 3
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: VJ Daniel Uy Student ID: 106680242 Date: ________________
 *
 *  Vercel App (Deployed) Link: _____________________________________________________
 *
 ********************************************************************************/

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== ""),
      ),
    });
  };

  return (
    <>
      <PageHeader
        text="Find your next great read"
        subtext="Search our collection of books and explore author details, genres, and more."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author<span className="text-danger">*</span>
          </label>
          <input
            id="author"
            type="text"
            className={`form-control ${errors.author ? "is-invalid" : ""}`}
            {...register("author", { required: "Author is required" })}
          />
          {errors.author ? (
            <div className="invalid-feedback">{errors.author.message}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            {...register("title")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className="form-control"
            {...register("subject")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            id="language"
            type="text"
            className="form-control"
            {...register("language")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="first_publish_year" className="form-label">
            First Publish Year
          </label>
          <input
            id="first_publish_year"
            type="text"
            className="form-control"
            {...register("first_publish_year")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </>
  );
}
