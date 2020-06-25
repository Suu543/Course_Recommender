import { useState, useEffect } from "react";
import axios from "axios";
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

const Create = ({ token }) => {
  const [state, setState] = useState({
    title: "",
    url: "",
    categories: [],
    loadedCategories: [],
    success: "",
    error: "",
    type: "",
    medium: "",
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
    // console.log("Post to Server");
    // console.table({ title, url, categories, type, medium });
    try {
      const response = await axios.post(
        `${API}/link`,
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
        title: "",
        url: "",
        success: "Link is created",
        error: "",
        loadedCategories: [],
        categories: [],
        type: "",
        medium: "",
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
          checked={medium === "book"}
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

  const handleToggle = (c) => () => {
    // return the first index or - 1
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];

    if (clickedCategory === -1) {
      // 없으니까 추가
      all.push(c);
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
      loadedCategories.map((c, i) => (
        <li style={{ listStyle: "none", marginLeft: "1rem" }} key={i}>
          <input type="checkbox" onChange={handleToggle(c._id)} />
          <label style={{ marginLeft: "10px" }}>{c.name}</label>
        </li>
      ))
    );
  };

  return (
    <Container>
      <LinkHeader>Submit Link/URL</LinkHeader>
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
              {isAuth() || token ? "Post" : "Login to post"}
            </LinkSubmit>
          </LinkForm>
        </ElementContainer>
      </LinkContainer>
    </Container>
  );
};

Create.getInitialProps = ({ req }) => {
  const token = getCookie("token", req);
  return { token };
};

export default Create;
