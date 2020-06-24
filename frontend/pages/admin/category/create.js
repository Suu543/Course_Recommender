import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import {
  FormWrapper,
  Form,
  FormInput,
  FormBtn,
  FormSuccess,
  FormError,
  FormHeading,
  FormTextDiv,
  FormImage,
  FormDiv,
} from "../../../components/Form/FormElements";

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
    <FormWrapper>
      <FormHeading>Create Category</FormHeading>
      <Form onSubmit={handleSubmit}>
        {success && <FormSuccess>{success}</FormSuccess>}
        {error && <FormError>{error}</FormError>}
        <br />
        <FormInput
          onChange={handleChange("name")}
          placeholder="Type Category Name Here"
          value={name}
          type="text"
          required
        />
        <br />
        <FormTextDiv>
          <ReactQuill
            theme="bubble"
            value={content}
            onChange={handleContent}
            placeholder="write something"
          />
        </FormTextDiv>
        <br />
        <FormDiv>ImageUploadText: {imageUploadButtonName}</FormDiv>
        <FormImage
          ref={inputFileReference}
          onChange={handleImage}
          accept="image/*"
          type="file"
          required
        />
        <br />
        <FormBtn>{buttonText}</FormBtn>
      </Form>
    </FormWrapper>
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
