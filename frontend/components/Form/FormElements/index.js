import styled from "styled-components";

const FormWrapper = styled.div`
  display: grid;
  grid-auto-rows: 10vh 45vh;
`;

const Form = styled.form`
  margin-top: 1rem;
`;

const FormInput = styled.input`
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

const FormTextArea = styled.textarea`
  width: 70%;
  margin: auto;
  border: 3px solid orange;
  min-height: 50%;
  border-radius: 15px;
  display: block;
  padding: 1rem;
  resize: none;

  :focus {
    outline: none;
  }
`;

const FormImage = styled.input`
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

const FormDiv = styled.div`
  width: 70%;
  margin: auto;
  padding-bottom: 0.5rem;
`;

const FormBtn = styled.button`
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

const FormSuccess = styled.div`
  border-radius: 15px;
  width: 70%;
  margin: auto;
  padding: 1rem;
  background: #cce5ff;
  color: #5f8dbe;
`;

const FormError = styled.div`
  width: 70%;
  margin: auto;
  border-radius: 15px;
  padding: 1rem;
  background: #f8d7da;
  color: #975057;
`;

const FormHeading = styled.h1`
  margin: auto;
`;

export {
  FormWrapper,
  Form,
  FormInput,
  FormBtn,
  FormSuccess,
  FormError,
  FormHeading,
  FormTextArea,
  FormImage,
  FormDiv,
};
