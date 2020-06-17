import Link from "next/link";
import axios from "axios";
import { API } from "../config";

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((c, i) => (
      <Link href="/">
        <a style={{ border: "1px solid red" }}>
          <div>
            <div>
              <div>
                <img
                  src={c.image && c.image.url}
                  alt={c.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
              <div>{c.name}</div>
            </div>
          </div>
        </a>
      </Link>
    ));

  return (
    <div>
      <div>
        <h1>Browser Tutorials/Courses</h1>
      </div>
      <div>{listCategories()}</div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);

  return {
    categories: response.data,
  };
};

export default Home;
