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

export { ActivationWrapper, ActivationHeading, ActivationButton };
