import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../../config";
import Router from "next/router";

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
    <Container>
      <Heading>Forgot Password</Heading>
      <Row>
        <Form onSubmit={handleSubmit}>
          {success && <SuccessAlert>{success}</SuccessAlert>}
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <br />
          <Input
            type="email"
            onChange={handleChange}
            value={email}
            placeholder="Type Your Email"
            required
          />
          <br />
          <Button>{buttonText}</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
