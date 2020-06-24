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

const Update = ({ oldCategory, token }) => {
  const [state, setState] = useState({
    name: oldCategory.name,
    error: "",
    success: "",
    buttonText: "Update",
    imagePreview: oldCategory.image.url,
    image: "",
  });

  const [content, setContent] = useState(oldCategory.content);

  const [imageUploadButtonName, setImageUploadButtonName] = useState(
    "Upload image"
  );

  const { name, success, error, buttonText, image, imagePreview } = state;

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
          setState({
            ...state,
            image: uri,
            success: "",
            error: "",
          });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Updating" });
    // console.log(...formData);
    console.table({ name, image, content });

    try {
      const response = await axios.put(
        `${API}/category/${oldCategory.slug}`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Category Update Response", response);
      setState({
        ...state,
        imagePreview: response.data.image.url,
        success: `${response.data.name} is updated!`,
      });
      setContent(response.data.content);
    } catch (error) {
      console.log("Category Create Error", error);
      setState({
        ...state,
        buttonText: "Update",
        error: error.response.data.error,
      });
    }
  };

  return (
    <FormWrapper>
      <FormHeading>Update Category</FormHeading>
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
        <FormDiv>
          <span>
            ImagePreview
            <br />
            <img src={imagePreview} alt="image" height="40" />
          </span>
        </FormDiv>
        <FormDiv>ImageUploadText: {imageUploadButtonName} </FormDiv>
        <FormImage
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

Update.getInitialProps = async ({ req, query, token }) => {
  console.log("query", query);
  const response = await axios.post(`${API}/category/${query.slug}`);
  return {
    oldCategory: response.data.category,
    token,
  };
};

export default withAdmin(Update);
