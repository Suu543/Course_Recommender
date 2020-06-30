import { useState, useEffect } from "react";
import axios from "axios";
import withUser from "../../withUser";
import { getCookie, isAuth } from "../../../helpers/auth";
import { API } from "../../../config";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

const Header = styled.h1`
  padding: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 8fr;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Form = styled.form``;

const FormLabel = styled.label`
  width: 90%;
  display: block;
  margin-left: 3rem;
  margin-bottom: 1rem;
  font-size: 20px;
`;

const Input = styled.input`
  width: 90%;
  margin: auto;
  margin-bottom: 3rem;
  border: 3px solid orange;
  border-radius: 15px;
  display: block;
  padding: 1rem;

  :focus {
    outline: none;
  }
`;

const Submit = styled.button`
  width: 90%;
  margin: auto;
  padding: 1rem;
  display: block;
  border: 3px solid orange;
  border-radius: 15px;
  background: white;
  color: orange;
  font-size: 1rem;

  :hover {
    background: orange;
    color: white;
  }

  :focus {
    outline: none;
  }
`;

const SuccessAlert = styled.div`
  border-radius: 15px;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #cce5ff;
  color: #5f8dbe;
`;

const ErrorAlert = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 15px;
  padding: 1rem;
  background: #f8d7da;
  color: #975057;
`;

const Wrapper = styled.div``;

const Update = ({ oldLink, token, typesData, levelsData, mediasData }) => {
  const [options, setOptions] = useState({
    types: typesData,
    levels: levelsData,
    medias: mediasData,
  });

  const [state, setState] = useState({
    title: oldLink.title,
    url: oldLink.url,
    categories: oldLink.categories,
    loadedCategories: [],
    success: "",
    error: "",
    type: oldLink.type._id,
    media: oldLink.media._id,
    level: oldLink.level._id,
  });

  const { types, levels, medias } = options;

  const {
    title,
    url,
    categories,
    loadedCategories,
    success,
    error,
    type,
    media,
    level,
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

    let dynamicUpdateURL;
    if (isAuth() && isAuth().role === "admin") {
      dynamicUpdateURL = `${API}/link/admin/${oldLink._id}`;
    } else {
      dynamicUpdateURL = `${API}/link/${oldLink._id}`;
    }

    try {
      await axios.put(
        dynamicUpdateURL,
        {
          title,
          url,
          categories,
          type,
          media,
          level,
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

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  const handleMediaChange = (e) => {
    setState({ ...state, media: e.target.value, success: "", error: "" });
  };

  const showMedias = () => (
    <React.Fragment>
      {medias.map((m, index) => (
        <Wrapper key={m._id + index}>
          <input
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            type="radio"
            onChange={handleMediaChange}
            checked={media === m._id}
            value={m._id}
            name="media"
          />
          <label>{m.media}</label>
        </Wrapper>
      ))}
    </React.Fragment>
  );

  const handleLevelChange = (e) => {
    console.log("change", e.target.value);
    setState({ ...state, level: e.target.value, success: "", error: "" });
  };

  const showLevels = () => (
    <React.Fragment>
      {levels.map((l, index) => (
        <Wrapper key={l._id + index}>
          <input
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            type="radio"
            onChange={handleLevelChange}
            checked={level === l._id}
            value={l._id}
            name="level"
          />
          <label>{l.level}</label>
        </Wrapper>
      ))}
    </React.Fragment>
  );

  const handleTypeChange = (e) => {
    setState({ ...state, type: e.target.value, success: "", error: "" });
  };

  const showTypes = () => (
    <React.Fragment>
      {types.map((t, index) => (
        <Wrapper key={t._id + index}>
          <input
            style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            type="radio"
            onChange={handleTypeChange}
            checked={type === t._id}
            value={t._id}
            name="type"
          />
          <label>{t.type}</label>
        </Wrapper>
      ))}
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
      <Header>Update Link/URL</Header>
      <Row>
        <Column>
          <Wrapper>
            <FormLabel>Category</FormLabel>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </Wrapper>
          <Wrapper style={{ marginTop: "1rem" }}>
            <FormLabel>Type</FormLabel>
            {showTypes()}
          </Wrapper>
          <Wrapper style={{ marginTop: "1rem" }}>
            <FormLabel>Medium</FormLabel>
            {showMedias()}
          </Wrapper>
          <Wrapper style={{ marginTop: "1rem" }}>
            <FormLabel>Level</FormLabel>
            {showLevels()}
          </Wrapper>
        </Column>
        <Column />
        <Column>
          <Form onSubmit={handleSubmit}>
            {success && <SuccessAlert>{success}</SuccessAlert>}
            {error && <ErrorAlert>{error}</ErrorAlert>}
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              onChange={handleTitleChange}
              value={title}
              placeholder="Type Link Title..."
            />
            <FormLabel>URL</FormLabel>
            <Input
              type="url"
              onChange={handleURLChange}
              value={url}
              placeholder="Type URL..."
            />
            <Submit disabled={!token} type="submit">
              {isAuth() || token ? "Update" : "Login to post"}
            </Submit>
          </Form>
        </Column>
      </Row>
    </Container>
  );
};

Update.getInitialProps = async ({ req, token, query }) => {
  try {
    const response = await axios.get(`${API}/link/${query.id}`);
    const types = await axios.get(`${API}/types`);
    const levels = await axios.get(`${API}/levels`);
    const medias = await axios.get(`${API}/medias`);

    console.log("response", response.data);

    return {
      oldLink: response.data,
      token,
      typesData: types.data,
      levelsData: levels.data,
      mediasData: medias.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default withUser(Update);
