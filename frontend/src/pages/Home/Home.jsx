import { useSelector } from "react-redux";

export default function Home() {
  const  {isAuthenticated,user}  = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  console.log(user);
  
  
  return (
    <>
      <h1>Home Page</h1>
      <h3>{user?.email}</h3>
    </>
  );
}
