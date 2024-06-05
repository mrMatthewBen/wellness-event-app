import { logout } from "@/utils/auth";

const logoutButton = () => {
  return <button onClick={logout}>Logout</button>;
};

export default logoutButton;
