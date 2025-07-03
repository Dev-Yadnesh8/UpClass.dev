import { useEffect, useState } from "react";
import axios from "axios";

function useApi(path) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;
    console.log("TOKEN -", localStorage.getItem("accessToken"));

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(path, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.data?.success) {
          setData(response.data.data);
        } else {
          throw new Error(response.data?.message || "Failed to fetch data");
        }
      } catch (err) {
        console.error("GET API error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { isLoading, data, error };
}

export default useApi;
