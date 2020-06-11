import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SocialAccount from "./AccountElements/SocialAccount";
import Signup from "./AccountElements/Signup";
import Signin from "./AccountElements/Signin";

const AccountWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const AccountSigninWrapper = styled.div`
  position: absolute;
  width: 90%;
  height: 550px;
  background-color: #f2f2f2;
  display: grid;
  z-index: ${({ over }) => (over ? 1 : 2)};
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 310px 310px;
    height: 700px;
  }
`;

const AccountSignupWrapper = styled.div`
  position: absolute;
  width: 90%;
  height: 550px;
  background-color: #f2f2f2;
  display: grid;
  z-index: ${({ over }) => (over ? 2 : 1)};
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 350px 310px;
    height: 700px;
  }
`;

// For the Purpose of Event Delegation
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  z-index: 2;
`;

const Account = ({ userInfo, setUserInfo, open, setOpen }) => {
  const [over, setOver] = useState(false);

  return (
    <React.Fragment>
      <Overlay onClick={() => setOpen(!open)} open={open} />
      <AccountWrapper open={open}>
        <AccountSigninWrapper over={over}>
          <Signin
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            over={over}
            setOver={setOver}
            open={open}
            setOpen={setOpen}
          />
          <SocialAccount open={open} setOpen={setOpen} />
        </AccountSigninWrapper>
        <AccountSignupWrapper over={over}>
          <Signup over={over} setOver={setOver} />
          <SocialAccount open={open} setOpen={setOpen} />
        </AccountSignupWrapper>
      </AccountWrapper>
    </React.Fragment>
  );
};

export default Account;
