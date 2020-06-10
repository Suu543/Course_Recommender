import styled from "styled-components";

const ActivationWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const ActivationHeading = styled.h1`
  margin-top: 4rem;
`;

const ActivationButton = styled.button`
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

const ActivationSuccessAlert = styled.div`
  height: 10vh;
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

const ActivationErrorAlert = styled.div`
  height: 10vh;
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

export {
  ActivationWrapper,
  ActivationHeading,
  ActivationButton,
  ActivationSuccessAlert,
  ActivationErrorAlert,
};
