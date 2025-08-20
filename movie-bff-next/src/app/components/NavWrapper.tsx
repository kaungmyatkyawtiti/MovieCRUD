import getAuthToken from "../utils/auth";
import { Nav } from "./Nav";

export default async function NavWrapper() {
  const auth = await getAuthToken();
  const isAuth = !!auth;
  return <Nav isAuth={isAuth} />
}
