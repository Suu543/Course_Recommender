import { useState, useEffect } from "react";
import axios from "axios";
import withUser from "../../withUser";
import { getCookie, isAuth } from "../../../helpers/auth";
import { API } from "../../../config";
import {
  Container,
  LinkHeader,
  LinkContainer,
  ElementContainer,
  LinkLabel,
  LinkForm,
  LinkInput,
  LinkSubmit,
  SuccessAlert,
  ErrorAlert,
} from "../../../components/Link/LinkElements";

const Update = ({ oldLink, token }) => {
  const [state, setState] = useState({
    title: oldLink.title,
    url: oldLink.url,
    categories: oldLink.categories,
    loadedCategories: [],
    success: "",
    error: "",
    type: oldLink.type,
    medium: oldLink.medium,
  });

  const {
    title,
    url,
    categories,
    loadedCategories,
    success,
    error,
    type,
    medium,
  } = state;

  // load categories when component mounts using useEffect
  useEffect(() => {
    loadCategories();
  }, [success]);

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value, error: "", success: "" });
  };

  const handleURLChange = (e) => {
    setState({ ...state, url: e.target.value, error: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof categories);
    console.log("categories", categories);
    // console.log("Post to Server");
    // console.table({ title, url, categories, type, medium });
    try {
      await axios.put(
        `${API}/link/${oldLink._id}`,
        {
          title,
          url,
          categories,
          type,
          medium,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState({
        ...state,
        success: "Link is updated",
      });
    } catch (error) {
      console.log("LINK SUBMIT ERROR", error);
      setState({ ...state, error: error.response.data.error });
    }
  };

  const handleTypeClick = (e) => {
    setState({ ...state, type: e.target.value, success: "", error: "" });
  };

  const handleMediumClick = (e) => {
    setState({ ...state, medium: e.target.value, success: "", error: "" });
  };

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  const showMedium = () => (
    <React.Fragment>
      <div>
        <input
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          type="radio"
          onChange={handleMediumClick}
          checked={medium === "video"}
          value="video"
          name="medium"
        />
        <label>Video</label>
      </div>
      <div>
        <input
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          type="radio"
          onChange={handleMediumClick}
          checked={type === "book"}
          value="book"
          name="medium"
        />
        <label>Book</label>
      </div>
    </React.Fragment>
  );

  const showTypes = () => (
    <React.Fragment>
      <div>
        <input
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          type="radio"
          onChange={handleTypeClick}
          checked={type === "free"}
          value="free"
          name="type"
        />
        <label>Free</label>
      </div>
      <div>
        <input
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
          type="radio"
          onChange={handleTypeClick}
          checked={type === "paid"}
          value="paid"
          name="type"
        />
        <label>paid</label>
      </div>
    </React.Fragment>
  );

  const handleToggle = (category) => () => {
    // return the first index or - 1
    const clickedCategory = categories.indexOf(category);
    const all = [...categories];

    if (clickedCategory === -1) {
      // 없으니까 추가
      all.push(category);
    } else {
      // 있으니까 제거
      all.splice(clickedCategory, 1);
    }

    console.log("all > categories", all);
    setState({ ...state, categories: all, success: "", error: "" });
  };

  const showCategories = () => {
    return (
      loadedCategories &&
      loadedCategories.map((category, index) => (
        <li style={{ listStyle: "none", marginLeft: "1rem" }} key={index}>
          <input
            checked={categories.includes(category._id)}
            type="checkbox"
            onChange={handleToggle(category._id)}
          />
          <label style={{ marginLeft: "10px" }}>{category.name}</label>
        </li>
      ))
    );
  };

  return (
    <Container>
      <LinkHeader>Update Link/URL</LinkHeader>
      <LinkContainer>
        <ElementContainer>
          <div>
            <LinkLabel>Category</LinkLabel>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <LinkLabel>Type</LinkLabel>
            {showTypes()}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <LinkLabel>Mediun</LinkLabel>
            {showMedium()}
          </div>
        </ElementContainer>
        <ElementContainer />
        <ElementContainer>
          <LinkForm onSubmit={handleSubmit}>
            {success && <SuccessAlert>{success}</SuccessAlert>}
            {error && <ErrorAlert>{error}</ErrorAlert>}
            <LinkLabel>Title</LinkLabel>
            <LinkInput
              type="text"
              onChange={handleTitleChange}
              value={title}
              placeholder="Type Link Title..."
            />
            <LinkLabel>URL</LinkLabel>
            <LinkInput
              type="url"
              onChange={handleURLChange}
              value={url}
              placeholder="Type URL..."
            />
            <LinkSubmit disabled={!token} type="submit">
              {isAuth() || token ? "Update" : "Login to post"}
            </LinkSubmit>
          </LinkForm>
        </ElementContainer>
      </LinkContainer>
    </Container>
  );
};

Update.getInitialProps = async ({ req, token, query }) => {
  const response = await axios.get(`${API}/link/${query.id}`);
  return { oldLink: response.data, token };
};

export default withUser(Update);
