import axios from "axios";
import React, { useState } from "react";
import {
  SignupWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";

const Signup = ({ over, setOver }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmed: "",
    error: "",
    success: "",
  });

  const { name, email, password, confirmed, error, success } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value, error: "", success: "" });
    // console.log(name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == confirmed) {
      try {
        let req = await axios.post("http://localhost:8000/api/register", {
          name,
          email,
          password,
        });

        console.log(req.data.message);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (password === confirmed) {
  //     // console.table({ name, email, password, confirmed });
  //     axios
  //       .post("http://localhost:8000/api/register", {
  //         name,
  //         email,
  //         password,
  //       })
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <SignupWrapper over={over}>
      <Field>
        <b>Register</b> <br />
        <small>Create Your Account</small>
      </Field>
      <form onSubmit={handleSubmit}>
        <Field>
          <label>Username</label>
          <Input
            value={name}
            onChange={handleChange("name")}
            placeholder="이름을 입력해주세요!"
            type="text"
          />
        </Field>
        <Field>
          <label>Eamil</label>
          <Input
            value={email}
            onChange={handleChange("email")}
            type="email"
            placeholder="이메일을 입력해주세요!"
          />
        </Field>
        <Field>
          <label>Password</label>
          <Input
            value={password}
            onChange={handleChange("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
          />
        </Field>
        <Field>
          <label>Confirm Password</label>
          <Input
            value={confirmed}
            onChange={handleChange("confirmed")}
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요!"
          />
        </Field>

        <Field>
          <Button>Register Now!</Button>
        </Field>
      </form>
      <Field>
        <SmallButton onClick={() => setOver(!over)}>Back to Login</SmallButton>
      </Field>
    </SignupWrapper>
  );
};

export default Signup;
