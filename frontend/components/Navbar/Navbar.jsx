// Next
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled, { css, keyframes } from "styled-components";

import NavPopUpModal from "./NavElements/NavPopupModal";

import {
  getLocalStorage,
  logout,
  maintainerAfterRefresh,
} from "../../helpers/auth";

const Container = styled.header`
  width: 100%;
  height: 6vh;
  z-index: 100;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  margin: auto;
`;

const Row = styled.div`
  width: 90%;
  margin: auto;
`;

const Column = styled.nav`
  display: grid;
  grid-template-columns: 2fr 4.5fr 5.5fr;
  padding: 3px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 2.5fr 3.5fr 6fr;
  }

  @media screen and (max-width: 614px) {
    grid-template-columns: 6fr 6fr;
  }
`;

const Left = styled.section``;

const Center = styled.section`
  @media screen and (max-width: 614px) {
    display: none;
  }
`;

const Hamburger = styled.section`
  display: none;

  @media screen and (max-width: 614px) {
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    cursor: pointer;
    opacity: 1;
    transition: all 0.5s ease;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #c6c6c6;
    margin: 3px;
    transition: all 0.5s ease;
  }
`;

const First = styled.section`
  width: 25px;
  height: 3px;
  background-color: #c6c6c6;
  margin: 3px;
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.burgerOpen ? "rotate(-45deg) translate(-6.5px, 6px)" : ""};
`;

const Second = styled.section`
  width: 25px;
  height: 3px;
  background-color: #c6c6c6;
  margin: 3px;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.burgerOpen ? "0" : "1")};
`;

const Third = styled.section`
  width: 25px;
  height: 3px;
  background-color: #c6c6c6;
  margin: 3px;
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.burgerOpen ? "rotate(45deg) translate(-6px, -6px)" : ""};
`;

const Right = styled.section`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.figure``;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 6px;
  color: #e8e8e8;

  @media screen and (max-width: 614px) {
    position: absolute;
    left: 0px;
    align-items: flex-start;
    height: 40vh;
    top: 6vh;
    background: #e9d1ff;
    display: ${(props) => (props.burgerOpen ? "none" : "flex")};
    flex-direction: column;
    transition: all 1s ease-in;
  }
`;

const LogoIcon = styled.i`
  font-size: 30px;
`;

const HeaderAnchor = styled.a`
  font-size: 25px;
  text-decoration: none;
  color: #494949;
`;

const Icon = styled.i`
  font-size: 10px;
  color: #007aff;
`;

const SearchBarInput = styled.input`
  display: block;
  width: 95%;
  margin: 8.4px auto;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  padding-left: 10px;

  :focus {
    outline-color: #007aff;
    border-color: #007aff;
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  color: rgb(154, 154, 154);
  font-size: 15px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  :hover {
    color: #000000;
  }
`;

const Navbar = () => {
  console.log("Navbar Constructor");

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    auth: false,
    name: "",
    role: "",
  });
  const [burgerOpen, setBurgerOpen] = useState(false);

  console.log("burger", burgerOpen);

  const checkStorage = (key) => {
    const storedData = localStorage.getItem(key);
    if (!storedData || key !== "user") {
      logout();
      setUserInfo({ auth: false, name: "", role: "" });
      Router.push("/");
    }
  };

  useEffect(() => {
    let status = maintainerAfterRefresh();

    if (status) {
      const { role } = JSON.parse(getLocalStorage("user"));
      setUserInfo({ ...userInfo, role, auth: true });
    } else {
      setUserInfo({ ...userInfo, auth: false });
    }

    const handler = ({ key }) => checkStorage(key);
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // console.log("userInfo.role", userInfo.role);

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Column>
            <Left>
              <Logo>
                <Link href="/">
                  <HeaderAnchor>
                    <LogoIcon
                      className="fas fa-angle-right"
                      style={{ color: "#81BDFF" }}
                    />
                    <b style={{ color: "black" }}>Sucr.io</b>
                  </HeaderAnchor>
                </Link>
              </Logo>
            </Left>

            <Center>
              <SearchBarInput placeholder="Search For Topics" />
            </Center>

            <Right>
              <Ul
                burgerOpen={burgerOpen}
                onClick={() => setBurgerOpen(!burgerOpen)}
              >
                <Link passHref href="/">
                  <Anchor>
                    <Icon className="fas fa-igloo" /> Home
                  </Anchor>
                </Link>
                <Link passHref href="/user/link/create">
                  <Anchor>
                    <b style={{ color: "#007AFF" }}>+</b>Submit a Link
                  </Anchor>
                </Link>

                {!userInfo.auth ? (
                  <Anchor open={open} onClick={() => setOpen(!open)}>
                    Signup/Signin
                  </Anchor>
                ) : userInfo.role == "admin" ? (
                  <React.Fragment>
                    <Link passHref href="/admin">
                      <Anchor>Admin</Anchor>
                    </Link>
                    <Anchor onClick={checkStorage}>Logout</Anchor>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link passHref href="/user">
                      <Anchor>User</Anchor>
                    </Link>
                    <Anchor onClick={checkStorage}>Logout</Anchor>
                  </React.Fragment>
                )}
              </Ul>
              <Hamburger
                burgerOpen={burgerOpen}
                onClick={() => setBurgerOpen(!burgerOpen)}
              >
                <First
                  burgerOpen={burgerOpen}
                  onClick={() => setBurgerOpen(!burgerOpen)}
                ></First>
                <Second
                  burgerOpen={burgerOpen}
                  onClick={() => setBurgerOpen(!burgerOpen)}
                ></Second>
                <Third
                  burgerOpen={burgerOpen}
                  onClick={() => setBurgerOpen(!burgerOpen)}
                ></Third>
              </Hamburger>
            </Right>
          </Column>
        </Row>
      </Container>
      <NavPopUpModal
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        open={open}
        setOpen={setOpen}
      />
    </React.Fragment>
  );
};

export default Navbar;
