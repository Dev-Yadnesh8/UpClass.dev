import toast from "react-hot-toast";

export default function handleApiError(error,endpoint,fallback = "Something went wrong"){
     const result = error?.response?.data;
      if (!result) {
        console.error("Server connection failed");
        toast.error("Unable to connect to server. Please try again later.");
      } else {
        console.error(`API-ERROR ON ${endpoint}`, error);
        toast.error(result.message || fallback);
      }
}