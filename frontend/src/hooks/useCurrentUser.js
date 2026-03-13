import { useEffect, useState } from "react";
import API from "../services/api";

function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    API.get("/auth/current_user")
      .then((res) => {
        if (!isMounted) {
          return;
        }

        setUser(res.data || null);
        setError("");
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }

        if (err?.response?.status === 401) {
          localStorage.removeItem("campus_air_token");
          setUser(null);
          setError("");
          return;
        }

        console.error(err);
        setError("Unable to load your profile right now.");
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    error,
    isAdmin: user?.role === "admin",
    isAuthenticated: Boolean(user),
  };
}

export default useCurrentUser;
