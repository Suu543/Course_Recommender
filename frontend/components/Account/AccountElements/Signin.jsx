import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NavAnchor from "../../Navbar/NavElements/NavAnchor";
import axios from "axios";
import { API } from "../../../config";
import { ShowSuccessAlert, ShowErrorAlert } from "../../../helpers/alert";
import {
  SigninWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";
import { authenticate, isAuth } from "../../../helpers/auth";

const Signin = ({ setUserInfo, over, setOver, open, setOpen }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });

  const emailReference = useRef(null);
  const passwordReference = useRef(null);

  const clearInputFields = () => {
    emailReference.current.value = "";
    passwordReference.current.value = "";
  };

  const { email, password, error, success, buttonText } = state;

  // const checkAuth = () => {
  //   return isAuth() && isAuth().role == "admin"
  //     ? Router.push("/admin")
  //     : Router.push("/user");
  // };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Logging in...",
    });

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });

      const { name, role } = response.data.user;

      console.log("login-data", response.data);
      // console.log("response", response);
      // console.log("Signin-Response", response); // User Token > data > token / user
      authenticate(response, () => {
        setOpen(!open);
        setUserInfo({ auth: true, name, role });
        // checkAuth();
        setState({ ...state, buttonText: "Login" });
        clearInputFields();
      });
    } catch (error) {
      console.log("Signin-Error", error);

      setState({
        ...state,
        buttonText: "Login",
        error: error.response.data.error,
      });
    }
  };

  return (
    <SigninWrapper over={over}>
      <Field>
        <b>Sign In</b>
        <br />
        <h3>Login to Continue</h3>
        {success && <ShowSuccessAlert>{success}</ShowSuccessAlert>}
        {error && <ShowErrorAlert>{error}</ShowErrorAlert>}
      </Field>
      <form onSubmit={handleSubmit}>
        <Field>
          <label>Email</label>
          <Input
            type="email"
            onChange={handleChange("email")}
            placeholder="이메일을 입력해주세요..."
            ref={emailReference}
          />
        </Field>
        <Field>
          <label>Password</label>
          <Input
            type="password"
            onChange={handleChange("password")}
            placeholder="비밀번호를 입력해주세요..."
            ref={passwordReference}
          />
        </Field>
        <Field>
          <Button>{buttonText}</Button>
        </Field>
      </form>
      <Field>
        <SmallButton onClick={() => setOver(!over)}>
          Doesn't have an account yet?
        </SmallButton>
      </Field>
      <Field>
        <SmallButton>
          <Link passHref href="/auth/password/forgot">
            <a open={open} onClick={() => setOpen(!open)}>
              Forgot Password?
            </a>
          </Link>
        </SmallButton>
      </Field>
    </SigninWrapper>
  );
};

export default Signin;
