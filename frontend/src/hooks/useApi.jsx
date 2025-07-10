import { useEffect, useState } from "react";
import useAxiosPrivateInstance from "./useAxiosPvt";

function useApi(path) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivateInstance();

  useEffect(() => {
    if (!path) return;
    

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axiosPrivate.get(path);

        if (response.data?.success) {
          setData(response.data.data);
        } else {
          throw new Error(response.data?.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("GET API error:", err);
        if (err.response.status == 404) {
          setData([]); // manually handling 404 to set empty list
        } else {
          setError(err.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { isLoading, data, error };
}

export default useApi;
