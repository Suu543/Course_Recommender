import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import Router from "next/router";

import PasswordWrapper from "../../../components/Password/PasswordWrapper/PasswordWrapper";
import PasswordForm from "../../../components/Password/PasswordWrapper/PasswordForm.jsx";
import PasswordInput from "../../../components/Password/PasswordElements/PasswordInput";
import PasswordBtn from "../../../components/Password/PasswordElements/PasswordBtn.jsx";
import PasswordHeading from "../../../components/Password/PasswordElements/PasswordHeading.jsx";

import PasswordSuccess from "../../../components/Password/PasswordElements/PasswordSuccess";
import PasswordError from "../../../components/Password/PasswordElements/PasswordError";

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
    <PasswordWrapper>
      <PasswordHeading>Forgot Password</PasswordHeading>
      <PasswordForm onSubmit={handleSubmit}>
        {success && <PasswordSuccess>{success}</PasswordSuccess>}
        {error && <PasswordError>{error}</PasswordError>}
        <br />
        <PasswordInput
          type="email"
          onChange={handleChange}
          value={email}
          placeholder="Type Your Email"
          required
        />
        <br />
        <PasswordBtn>{buttonText}</PasswordBtn>
      </PasswordForm>
    </PasswordWrapper>
  );

  //   return (
  //     <div className="row">
  //       <div className="col-md-6 offset-md-3">
  //         <h1>Forgot Password</h1>
  //         <br />
  //         {passwordForgotForm()}
  //       </div>
  //       <div>
  //         <button className="btn btn-outline-warning">{buttonText}</button>
  //       </div>
  //     </div>
  //   );
};

export default ForgotPassword;
