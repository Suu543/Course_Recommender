import axios from "axios";
import { API } from "../config";
import { getCookie } from "../helpers/auth";

const withAdmin = (Page) => {
  const WithAdminUser = (props) => <Page {...props} />;
  WithAdminUser.getInitialProps = async ({ req, res }) => {
    const token = getCookie("token", req);
    let user = null;

    if (token) {
      try {
        const response = await axios.get(`${API}/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        });
        user = response.data;
      } catch (error) {
        if (error.response.status === 401) {
          user = null;
        }
      }
    }

    if (user === null) {
      // redirect
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    } else {
      return {
        ...(Page.getInitialProps
          ? await Page.getInitialProps({ req, res })
          : {}),
        user,
        token,
      };
    }
  };

  return WithAdminUser;
};

export default withAdmin;