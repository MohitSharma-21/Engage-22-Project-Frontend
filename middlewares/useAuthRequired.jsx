import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuthRequired = (token) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/sign-in");
  }, [token]);
};

export default useAuthRequired;
