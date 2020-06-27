import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

const LinkHeader = styled.h1`
  padding: 1rem;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 8fr;
`;

const ElementContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const LinkForm = styled.form``;

const LinkLabel = styled.label`
  width: 90%;
  display: block;
  margin-left: 3rem;
  margin-bottom: 1rem;
  font-size: 20px;
`;

const LinkInput = styled.input`
  width: 90%;
  margin: auto;
  margin-bottom: 3rem;
  border: 3px solid orange;
  border-radius: 15px;
  display: block;
  padding: 1rem;

  :focus {
    outline: none;
  }
`;

const LinkSubmit = styled.button`
  width: 90%;
  margin: auto;
  padding: 1rem;
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
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #cce5ff;
  color: #5f8dbe;
`;

const ErrorAlert = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 15px;
  padding: 1rem;
  background: #f8d7da;
  color: #975057;
`;

export {
  Container,
  LinkHeader,
  LinkContainer,
  ElementContainer,
  LinkLabel,
  LinkForm,
  LinkInput,
  LinkSubmit,
  SuccessAlert,
  ErrorAlert,
};
