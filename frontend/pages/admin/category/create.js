import { useState, useEffect } from "react";
import axios from "axios";
import withAdmin from "../../withAdmin";
import { API } from "../../../config";

import {
  FormWrapper,
  Form,
  FormInput,
  FormBtn,
  FormSuccess,
  FormError,
  FormHeading,
  FormTextArea,
  FormImage,
  FormDiv,
} from "../../../components/Form/FormElements";

const Create = ({ user, token }) => {
  const [state, setState] = useState({
    name: "",
    content: "",
    error: "",
    success: "",
    error: "",
    formData: process.browser && new FormData(),
    buttonText: "Create",
    imageUploadText: "Upload Image",
  });

  const {
    name,
    content,
    success,
    error,
    formData,
    buttonText,
    imageUploadText,
  } = state;

  const handleChange = (name) => (e) => {
    // image는 e.target.files
    const value = name === "image" ? e.target.files[0] : e.target.value;
    const imageName =
      name === "image" ? e.target.files[0].name : "Upload Image";

    formData.set(name, value);

    setState({
      ...state,
      [name]: value,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Creating" });
    // console.log(...formData);

    try {
      const response = await axios.post(`${API}/category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Category Create Response", response);
      setState({
        ...state,
        name: "",
        content: "",
        formData: "",
        buttonText: "Created",
        imageUploadText: "Upload Image",
        success: `${response.data.name} is created!`,
      });
    } catch (error) {
      console.log("Category Create Error", error);
      setState({
        ...state,
        name: "",
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
        <FormTextArea
          onChange={handleChange("content")}
          placeholder="Type Category Contents"
          value={content}
          type="text"
          required
        />
        <br />
        <FormDiv>ImageUploadText: {imageUploadText}</FormDiv>
        <FormImage
          onChange={handleChange("image")}
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
