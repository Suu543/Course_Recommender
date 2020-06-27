import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import jwt from "jsonwebtoken";
import axios from "axios";
import { API } from "../../../config";

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div``;

const Heading = styled.h1`
  margin-top: 4rem;
`;

const Button = styled.button`
  width: 100%;
  font-size: 3rem;
  text-align: center;
  background: white;
  border: 2px solid yellow;
  color: #ffc107;

  :hover {
    background: #ffc107;
    color: white;
  }
`;

const SuccessAlert = styled.div`
  min-height: 10vh;
  width: 100%;
  font-size: 3rem;
  background: #007bff;
  text-align: center;
  border: none;
  margin-top: 1rem;
  outline: none;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;
  padding: 0;
`;

const ErrorAlert = styled.div`
  min-height: 10vh;
  width: 100%;
  font-size: 3rem;
  background: #ee5a66;
  text-align: center;
  border: none;
  margin-top: 1rem;
  outline: none;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;
  padding: 0;
`;

const ActivateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });

  const { name, token, buttonText, success, error } = state;

  // useEffect method의 componentDidMount가 오직 compononet mounting이 끝나고 실행되기 때문에
  // SSR 관점에서 원하고자 하는 데이터를 랜더링하는데 적합하지않다.
  useEffect(() => {
    //   Extract Information from JWT
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setState({ ...state, name, token });
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    console.log("Activate Account!");
    setState({ ...state, buttonText: "Activating" });

    try {
      const response = await axios.post(`${API}/register/activate`, { token });
      console.log("account activate response", response);
      setState({
        ...state,
        name: "",
        token: "",
        buttonText: "Activated",
        success: response.data.message,
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate Account",
        error: error.response.data.error,
      });
    }
  };

  return (
    <Container>
      <Row>
        {success && <SuccessAlert>{success}</SuccessAlert>}
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <Heading>Hello {name}, Are you ready to activate your account?</Heading>
        <br />
        <Button onClick={clickSubmit}>{buttonText}</Button>
      </Row>
    </Container>
  );
};

export default withRouter(ActivateAccount);
