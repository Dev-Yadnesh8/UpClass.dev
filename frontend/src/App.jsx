import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { signIn } from "./features/auth/authSlice";
import { Loader } from "./components";

// function App({ children }) {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("auth");

//     if (savedUser) {
//       try {
//         const userData = JSON.parse(savedUser);
//         dispatch(signIn({ ...userData.user }));
//       } catch (error) {
//         console.error("Failed to parse user from localStorage", error);
//       }
//     }

//     setLoading(false);
//   }, [dispatch]);

//   if (loading) return <Loader message="Authenticating User..." />;

//   return children;
// }

// export default App;
