import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticated } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { favouritesAtom } from "@/store";

const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard(props) {
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  useEffect(() => {
    updateAtom();

    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split("?")[0];

    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>;
}
