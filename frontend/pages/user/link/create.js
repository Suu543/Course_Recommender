import { useState, useEffect } from "react";
import axios from "axios";
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

const Label = styled.label`
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

const Create = ({ token, typesData, levelsData, mediasData }) => {
  const [options, setOptions] = useState({
    types: typesData,
    levels: levelsData,
    medias: mediasData,
  });
  const [state, setState] = useState({
    title: "",
    url: "",
    categories: [],
    loadedCategories: [],
    success: "",
    error: "",
    type: "",
    media: "",
    level: "",
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

    try {
      const response = await axios.post(
        `${API}/link`,
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
        title: "",
        url: "",
        success: "Link is created",
        error: "",
        loadedCategories: [],
        categories: [],
        type: "",
        media: "",
        level: "",
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

  const showMedia = () => (
    <React.Fragment>
      {medias &&
        medias.map((m, index) => (
          <div key={m._id + index}>
            <input
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              type="radio"
              onChange={handleMediaChange}
              checked={media === m._id}
              value={m._id}
              name="media"
            />
            <label>{m.media}</label>
          </div>
        ))}
    </React.Fragment>
  );

  const handleTypeChange = (e) => {
    setState({ ...state, type: e.target.value, success: "", error: "" });
  };

  const showTypes = () => (
    <React.Fragment>
      {types &&
        types.map((t, index) => (
          <div key={t._id + index}>
            <input
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              type="radio"
              onChange={handleTypeChange}
              checked={type === t._id}
              value={t._id}
              name="type"
            />
            <label>{t.type}</label>
          </div>
        ))}
    </React.Fragment>
  );

  const handleLevelChange = (e) => {
    setState({ ...state, level: e.target.value, success: "", error: "" });
  };

  const showLevels = () => (
    <React.Fragment>
      {levels &&
        levels.map((l, index) => (
          <div key={l._id + index}>
            <input
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              type="radio"
              onChange={handleLevelChange}
              checked={level === l._id}
              value={l._id}
              name="level"
            />
            <label>{l.level}</label>
          </div>
        ))}
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
      <Header>Submit Link/URL</Header>
      <Row>
        <Column>
          <div>
            <Label>Category</Label>
            <ul style={{ maxHeight: "100px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Label>Type</Label>
            {showTypes()}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Label>Medium</Label>
            {showMedia()}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Label>Level</Label>
            {showLevels()}
          </div>
        </Column>
        <Column />
        <Column>
          <Form onSubmit={handleSubmit}>
            {success && <SuccessAlert>{success}</SuccessAlert>}
            {error && <ErrorAlert>{error}</ErrorAlert>}
            <Label>Title</Label>
            <Input
              type="text"
              onChange={handleTitleChange}
              value={title}
              placeholder="Type Link Title..."
            />
            <Label>URL</Label>
            <Input
              type="url"
              onChange={handleURLChange}
              value={url}
              placeholder="Type URL..."
            />
            <Submit disabled={!token} type="submit">
              {isAuth() || token ? "Post" : "Login to post"}
            </Submit>
          </Form>
        </Column>
      </Row>
    </Container>
  );
};

Create.getInitialProps = async ({ req }) => {
  try {
    const token = getCookie("token", req);
    const types = await axios.get(`${API}/types`);
    const levels = await axios.get(`${API}/levels`);
    const medias = await axios.get(`${API}/medias`);

    return {
      token,
      typesData: types.data,
      levelsData: levels.data,
      mediasData: medias.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default Create;
