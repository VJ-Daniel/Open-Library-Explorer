import { getToken } from "./authenticate";

export async function addToFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    },
  );

  const data = await res.json();

  return res.status === 200 ? data : [];
}

export async function removeFromFavourites(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    },
  );

  const data = await res.json();

  return res.status === 200 ? data : [];
}

export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  return res.status === 200 ? data : [];
}
