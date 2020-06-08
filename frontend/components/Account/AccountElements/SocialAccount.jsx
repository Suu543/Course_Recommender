import styled from "styled-components";
import React from "react";

const SocialWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  display: relative;
`;

const SocialTitle = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 2rem;
`;

const SocialField = styled.div`
  border-radius: 4px;
  width: 80%;
  height: 55px;
  padding: 0 10px;
  border: none;
  outline: none;
  overflow-x: hidden;
  align-self: center;
`;

const SocialFacebook = styled.a`
  display: block;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  background-color: #3b5998;
  padding: 0.2rem;
`;

const SocialGoogle = styled.a`
  display: block;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  background-color: #dd4b39;
  padding: 0.2rem;
`;

const SocialGithub = styled.a`
  display: block;
  color: white;
  font-size: 1.1rem;
  text-decoration: none;
  background-color: #24292e;
  padding: 0.2rem;
`;

const PopupClose = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
  font-size: 2rem;
  top: 0;
  right: 3%;
  cursor: pointer;
`;

const SocialAccount = ({ open, setOpen }) => {
  return (
    <SocialWrapper>
      <PopupClose onClick={() => setOpen(!open)}>X</PopupClose>
      <SocialTitle>Login With Social Media</SocialTitle>
      <SocialField>
        <SocialFacebook>
          <i></i>Login with Facebook
        </SocialFacebook>
      </SocialField>
      <SocialField>
        <SocialGoogle>
          <i></i>Login with Google+
        </SocialGoogle>
      </SocialField>
      <SocialField>
        <SocialGithub>
          <i></i>Login with Github
        </SocialGithub>
      </SocialField>
    </SocialWrapper>
  );
};

export default SocialAccount;
