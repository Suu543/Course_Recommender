import React from "react";
import {
  SigninWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";

import { showSuccessAlert, showErrorAlert } from "./alert";

const Signin = ({ over, setOver }) => {
  return (
    <SigninWrapper over={over}>
      <Field>
        <b>Sign In</b>
        <br />
        <small>Login to Continue</small>
      </Field>
      <form>
        <Field>
          <label>Email</label>
          <Input type="text" placeholder="이메일을 입력해주세요..." />
        </Field>
        <Field>
          <label>Password</label>
          <Input type="password" placeholder="비밀번호를 입력해주세요..." />
        </Field>
        <Field>
          <Button>Sign In</Button>
        </Field>
      </form>
      <Field>
        <SmallButton onClick={() => setOver(!over)}>
          Doesn't have an account yet?
        </SmallButton>
      </Field>
      <Field>
        <SmallButton>Trouble signing in?</SmallButton>
      </Field>
    </SigninWrapper>
  );
};

export default Signin;
