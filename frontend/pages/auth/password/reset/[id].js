import { useState, useEffect } from "react";
import axios from "axios";
import Router, { withRouter } from "next/router";
import { API } from "../../../../config";
import jwt from "jsonwebtoken";

import {
  FormWrapper,
  Form,
  FormInput,
  FormBtn,
  FormSuccess,
  FormError,
  FormHeading,
} from "../../../../components/Form/FormElements";

const ResetPassword = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    newPassword: "",
    confirmed: "",
    buttonText: "Reset Password",
    success: "",
    error: "",
  });

  const {
    name,
    token,
    newPassword,
    confirmed,
    buttonText,
    success,
    error,
  } = state;

  useEffect(() => {
    const decoded = jwt.decode(router.query.id);
    if (decoded)
      setState({ ...state, name: decoded.name, token: router.query.id });
  }, [router]);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value, error: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("state", state);
    setState({ ...state, buttonText: "Sending" });

    if (newPassword === confirmed) {
      try {
        const response = await axios.put(`${API}/reset-password`, {
          resetPasswordLink: token,
          newPassword,
        });

        console.log("response", response);

        setState({
          ...state,
          newPassword: "",
          buttonText: "Done",
          success: response.data.message,
        });

        setTimeout(() => {
          Router.push("/");
        }, 2000);
      } catch (error) {
        console.log("Reset Password Error", error);
        setState({
          ...state,
          buttonText: "Forgot Password",
          error: error.response.data.error,
        });
      }
    } else {
      setState({ ...state, error: "확인 비밀번호가 일치하지 않습니다..." });
    }
  };

  return (
    <FormWrapper>
      <FormHeading>Hello {name}, Ready to Reset Password?</FormHeading>
      <Form onSubmit={handleSubmit}>
        {success && <FormSuccess>{success}</FormSuccess>}
        {error && <FormError>{error}</FormError>}
        <br />
        <FormInput
          type="password"
          onChange={handleChange("newPassword")}
          value={newPassword}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          required
        />
        <br />
        <FormInput
          type="password"
          onChange={handleChange("confirmed")}
          value={confirmed}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          required
        />
        <br />
        <FormBtn>{buttonText}</FormBtn>
      </Form>
    </FormWrapper>
  );
};

export default withRouter(ResetPassword);
