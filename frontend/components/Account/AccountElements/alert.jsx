import styled from "styled-components";

const ShowSuccessAlert = styled.div`
  line-height: 45px;
  color: white;
  font-size: 15px;
  background: #007bff;
  width: 100%;
  margin: auto;
  text-align: center;
  height: 45px;
  border: none;
  margin-top: 1rem;
  outline: none;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;
  padding: 0;
`;

const ShowErrorAlert = styled.div`
  line-height: 30px;
  color: black;
  font-size: 15px;
  background: #ee5a66;
  width: 100%;
  margin: auto;
  text-align: center;
  height: 35px;
  border: none;
  margin-top: 1rem;
  outline: none;
  border-radius: 5px;
  text-shadow: 0 -1px #00506b;
  padding: 0;
`;

export { ShowSuccessAlert, ShowErrorAlert };
