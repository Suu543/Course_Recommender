import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { API } from "../../../config";
import { ShowSuccessAlert, ShowErrorAlert } from "../../Helper/alert";
import {
  SigninWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";

const Signin = ({ over, setOver }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const { email, password, error, success, buttonText } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Logging in..." });

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });

      console.log("Signin-Response", response); // User Token > data > token / user
    } catch (error) {
      console.log("Signin-Error", error);

      setState({
        ...state,
        buttonText: "Login",
        error: error.response.data.error,
      });
    }
  };

  return (
    <SigninWrapper over={over}>
      <Field>
        <b>Sign In</b>
        <br />
        <h3>Login to Continue</h3>
        {success && <ShowSuccessAlert>{success}</ShowSuccessAlert>}
        {error && <ShowErrorAlert>{error}</ShowErrorAlert>}
      </Field>
      <form onSubmit={handleSubmit}>
        <Field>
          <label>Email</label>
          <Input
            type="text"
            onChange={handleChange("email")}
            placeholder="이메일을 입력해주세요..."
          />
        </Field>
        <Field>
          <label>Password</label>
          <Input
            type="password"
            onChange={handleChange("password")}
            placeholder="비밀번호를 입력해주세요..."
          />
        </Field>
        <Field>
          <Button>{buttonText}</Button>
        </Field>
      </form>
      <Field>
        <SmallButton onClick={() => setOver(!over)}>
          Doesn't have an account yet?
        </SmallButton>
      </Field>
      <Field>
        <SmallButton>Trouble signing in?</SmallButton>
      </Field>
    </SigninWrapper>
  );
};

export default Signin;
