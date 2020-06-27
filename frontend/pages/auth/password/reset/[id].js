import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Router, { withRouter } from "next/router";
import { API } from "../../../../config";
import jwt from "jsonwebtoken";

const Container = styled.div`
  max-width: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const Row = styled.div``;

const Heading = styled.h1`
  margin: auto;
`;

const Form = styled.form`
  margin-top: 1rem;
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
    <Container>
      <Heading>Hello {name}, Ready to Reset Password?</Heading>

      <Row>
        <Form onSubmit={handleSubmit}>
          {success && <SuccessAlert>{success}</SuccessAlert>}
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <br />
          <Input
            type="password"
            onChange={handleChange("newPassword")}
            value={newPassword}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            required
          />
          <br />
          <Input
            type="password"
            onChange={handleChange("confirmed")}
            value={confirmed}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요!"
            required
          />
          <br />
          <Button>{buttonText}</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default withRouter(ResetPassword);
