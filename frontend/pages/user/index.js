// import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

const User = ({ user }) => {
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
      <h1>Hello World This is User Page!</h1>
      <p>{name}</p>
      <p>{role}</p>
      <p>{email}</p>
      <p>{username}</p>
    </div>
  );
};

// https://stackoverflow.com/questions/46349879/jwt-why-we-need-bearer-word
// User.getInitialProps = async ({ req }) => {
//   const token = getCookie("token", req);

//   try {
//     const response = await axios.get(`${API}/user`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//         contentType: "application/json",
//       },
//     });

//     return { user: response.data };
//   } catch (error) {
//     if (error.response.status === 401) {
//       return { user: "no user" };
//     }
//   }
// };

export default withUser(User);
