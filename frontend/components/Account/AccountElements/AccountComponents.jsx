import React from "react";
import styled from "styled-components";

const SigninWrapper = styled.div``;
const SignupWrapper = styled.div``;

const Field = styled.div`
  margin: 1rem 1rem;
  font-size: 1rem;

  b {
    font-size: 1.5rem;
  }

  small {
    color: #a2a2a2;
    font-weight: normal;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem 0.5rem;
    font-size: 0.9rem;

    b {
      font-size: 1rem;
    }

    small {
      color: #a2a2a2;
      font-weight: normal;
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  font-size: 16px;
  background: #e2e2e2;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    background: #e2e2e2;
    width: 100%;
    height: 25px;
    padding: 0 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
    border-radius: 5px;
  }
`;

const SmallButton = styled.button`
  color: white;
  font-size: 10px;
  background: #68aff7;
  width: 50%;
  height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;

  :active {
    background: #008ab8;
  }
`;

const Button = styled.button`
  color: white;
  font-size: 16px;
  background: #00a6de;
  width: 100%;
  height: 35px;
  border: none;
  margin-top: 1rem;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;

  :active {
    background: #008ab8;
  }

  @media screen and (max-width: 600px) {
    color: white;
    font-size: 12px;
    background: #00a6de;
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    text-shadow: 0 -1px #00506b;
  }
`;

export { SigninWrapper, SignupWrapper, Field, Input, SmallButton, Button };
