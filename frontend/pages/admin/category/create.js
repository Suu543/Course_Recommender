import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import withAdmin from "../../withAdmin";
import styled from "styled-components";
import { API } from "../../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Container = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const Column = styled.div``;

const Heading = styled.h1`
  margin: auto;
`;

const Form = styled.form`
  margin-top: 1rem;
`;

const SuccessAlert = styled.div`
  border-radius: 15px;
  width: 70%;
  margin: auto;
  padding: 1rem;
  background: #cce5ff;
  color: #5f8dbe;
`;

const ErrorAlert = styled.div`
  width: 70%;
  margin: auto;
  border-radius: 15px;
  padding: 1rem;
  background: #f8d7da;
  color: #975057;
`;

const Input = styled.input`
  width: 70%;
  margin: auto;
  border: 3px solid orange;
  border-radius: 15px;
  display: block;
  padding: 1rem;

  :focus {
    outline: none;
  }
`;

const Content = styled.div`
  max-width: 70%;
  margin: auto;
  border: 3px solid orange;
  min-height: 50%;
  border-radius: 15px;
  display: block;
  padding: 1rem;
  resize: none;

  :focus {
    outline: none;
  }
`;

const Text = styled.div`
  width: 70%;
  margin: auto;
  padding-bottom: 0.5rem;
`;

const Image = styled.input`
  width: 70%;
  margin: auto;
  border: 3px solid orange;
  border-radius: 15px;
  display: block;
  padding: 1rem;

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 70%;
  padding: 1rem;
  margin: auto;
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

const Create = ({ user, token }) => {
  const [state, setState] = useState({
    name: "",
    error: "",
    success: "",
    buttonText: "Create",
    image: "",
  });

  const [content, setContent] = useState("");

  const inputFileReference = useRef(null);

  const clearInputFields = () => {
    inputFileReference.current.value = "";
  };

  const [imageUploadButtonName, setImageUploadButtonName] = useState(
    "Upload image"
  );

  const { name, success, error, buttonText, image, imageUploadText } = state;

  const handleContent = (e) => {
    console.log(e);
    setContent(e);
    setState({ ...state, success: "", error: "" });
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleImage = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }

    setImageUploadButtonName(e.target.files[0].name);
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        100,
        1000,
        "JPEG",
        100,
        0,
        (uri) => {
          // console.log(uri);
          setState({ ...state, image: uri, success: "", error: "" });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Creating" });
    // console.log(...formData);
    console.table({ name, image, content });

    try {
      const response = await axios.post(
        `${API}/category`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Create Response", response);
      setImageUploadButtonName("Upload Image");
      setContent("");
      setState({
        ...state,
        name: "",
        content: "",
        buttonText: "Created",
        imageUploadText: "Upload Image",
        success: `${response.data.name} is created!`,
      });
      clearInputFields();
    } catch (error) {
      console.log("Category Create Error", error);
      setState({
        ...state,
        buttonText: "Create",
        error: error.response.data.error,
      });
    }
  };

  return (
    <Container>
      <Heading>Create Category</Heading>
      <Column>
        <Form onSubmit={handleSubmit}>
          {success && <SuccessAlert>{success}</SuccessAlert>}
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <br />
          <Input
            onChange={handleChange("name")}
            placeholder="Type Category Name Here"
            value={name}
            type="text"
            required
          />
          <br />
          <Content>
            <ReactQuill
              theme="bubble"
              value={content}
              onChange={handleContent}
              placeholder="write something"
            />
          </Content>
          <br />
          <Text>ImageUploadText: {imageUploadButtonName}</Text>
          <Image
            ref={inputFileReference}
            onChange={handleImage}
            accept="image/*"
            type="file"
            required
          />
          <br />
          <Button>{buttonText}</Button>
        </Form>
      </Column>
    </Container>
  );
};

export default withAdmin(Create);

// const handleChange = (name) => (e) => {
//   // image는 e.target.files
//   const value = name === "image" ? e.target.files[0] : e.target.value;
//   const imageName =
//     name === "image" ? e.target.files[0].name : "Upload Image";

//   formData.set(name, value);

//   setState({
//     ...state,
//     [name]: value,
//     error: "",
//     success: "",
//     imageUploadText: imageName,
//   });
// };
