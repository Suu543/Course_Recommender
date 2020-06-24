import axios from "axios";
import { API } from "../config";
import { getCookie } from "../helpers/auth";

const withUser = (Page) => {
  const WithAuthUser = (props) => <Page {...props} />;
  WithAuthUser.getInitialProps = async ({ req, res, query }) => {
    const token = getCookie("token", req);

    let user = null;
    let userLinks = [];

    if (token) {
      try {
        const response = await axios.get(`${API}/user`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        });

        // console.log("response in withUser", response);
        user = response.data.user;
        userLinks = response.data.links;
      } catch (error) {
        if (error.response.status === 401) {
          user = null;
        }
      }
    }

    if (user === null) {
      //redirect
      res.writeHead(302, {
        Location: "/",
      });

      res.end();
    } else {
      return {
        ...(Page.getInitialProps
          ? await Page.getInitialProps({ req, res, query })
          : {}),
        user,
        token,
        userLinks,
      };
    }
  };

  return WithAuthUser;
};

export default withUser;
