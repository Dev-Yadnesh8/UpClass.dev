import { useSelector } from "react-redux";

export function checkIsAdmin() {
  const { user } = useSelector((state) => state.auth);
  console.log("CHECH-IS-ADMIN--", user.roles.includes("ADMIN"));

  return user.roles.includes("ADMIN");
}
