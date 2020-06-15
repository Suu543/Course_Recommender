import { useEffect, useState } from "react";
import withAdmin from "../withAdmin";

const Admin = ({ user }) => {
  const [data, setData] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
  });

  const { name, role, email, username } = user;

  useEffect(() => {
    setData({
      name,
      role,
      email,
      username,
    });
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{name}</p>
      <p>{role}</p>
      <p>{email}</p>
      <p>{username}</p>
    </div>
  );
};
export default withAdmin(Admin);
