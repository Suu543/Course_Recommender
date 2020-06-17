import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import Router from "next/router";

import {
  FormWrapper,
  Form,
  FormInput,
  FormBtn,
  FormSuccess,
  FormError,
  FormHeading,
} from "../../../components/Form/FormElements";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    buttonText: "Forgot Password",
    success: "",
    error: "",
  });

  const { email, buttonText, success, error } = state;

  const handleChange = (e) => {
    setState({ ...state, error: "", success: "", email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("post email to ", email);
    try {
      const response = await axios.put(`${API}/forgot-password`, { email });
      //   console.log("FORGOT PASSWORD", response);
      setState({
        ...state,
        email: "",
        buttonText: "Done",
        success: response.data.message,
      });
    } catch (error) {
      console.log("FORGOT PW ERROR", error);
      setState({
        ...state,
        buttonText: "FORGOT PASSWORD",
        error: error.response.data.error,
      });
    }
  };

  return (
    <FormWrapper>
      <FormHeading>Forgot Password</FormHeading>
      <Form onSubmit={handleSubmit}>
        {success && <FormSuccess>{success}</FormSuccess>}
        {error && <FormError>{error}</FormError>}
        <br />
        <FormInput
          type="email"
          onChange={handleChange}
          value={email}
          placeholder="Type Your Email"
          required
        />
        <br />
        <FormBtn>{buttonText}</FormBtn>
      </Form>
    </FormWrapper>
  );
};

export default ForgotPassword;
