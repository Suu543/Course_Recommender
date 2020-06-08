import React from "react";
import {
  SigninWrapper,
  Field,
  SmallButton,
  Button,
  Input,
} from "./AccountComponents";

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
          <label>Username</label>
          <Input type="text" />
        </Field>
        <Field>
          <label>Password</label>
          <Input type="password" />
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
