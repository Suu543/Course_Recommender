import { API } from "../../../config.js";

import axios from "axios";
import React, { useState } from "react";
import {
  SignupWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";

import { ShowSuccessAlert, ShowErrorAlert } from "./alert";

const Signup = ({ over, setOver }) => {
  const [state, setState] = useState({
    name: "abc",
    email: "abcdefg@something.com",
    password: "",
    confirmed: "",
    error: "",
    success: "",
    buttonText: "Register",
  });

  const {
    name,
    email,
    password,
    confirmed,
    error,
    success,
    buttonText,
  } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value, error: "", success: "" });
    // console.log(name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Registering..." });

    if (password == confirmed) {
      try {
        let response = await axios.post(`${API}/register`, {
          name,
          email,
          password,
        });

        console.log("Signup-Response", response);

        setState({
          ...state,
          name: "",
          email: "",
          password: "",
          confirmed: "",
          buttonText: "Submitted",
          success: response.data.message,
        });
      } catch (error) {
        console.log("Signup-Error", error);

        setState({
          ...state,
          buttonText: "Register",
          error: error.response.data.error,
        });
      }
    }
  };

  return (
    <SignupWrapper over={over}>
      <Field>
        <b>Register</b> <br />
        <small>Create Your Account</small>
        {success && <ShowSuccessAlert>{success}</ShowSuccessAlert>}
        {error && <ShowErrorAlert>{error}</ShowErrorAlert>}
      </Field>
      <form onSubmit={handleSubmit}>
        <Field>
          <label>Username</label>
          <Input
            value={name}
            onChange={handleChange("name")}
            placeholder="이름을 입력해주세요!"
            type="text"
            required
          />
        </Field>
        <Field>
          <label>Eamil</label>
          <Input
            value={email}
            onChange={handleChange("email")}
            type="email"
            placeholder="이메일을 입력해주세요!"
            required
          />
        </Field>
        <Field>
          <label>Password</label>
          <Input
            value={password}
            onChange={handleChange("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            required
          />
        </Field>
        <Field>
          <label>Confirm Password</label>
          <Input
            value={confirmed}
            onChange={handleChange("confirmed")}
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요!"
            required
          />
        </Field>
        <Field>
          <Button>{buttonText}</Button>
        </Field>
      </form>
      <Field>
        <SmallButton onClick={() => setOver(!over)}>Back to Login</SmallButton>
      </Field>
    </SignupWrapper>
  );
};

export default Signup;
