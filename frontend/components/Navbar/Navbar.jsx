// Next
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { API } from "../../config";
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
  grid-template-columns: 2fr 6fr 4fr;
  padding: 3px;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 2fr 5fr 5fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 2.5fr 3.5fr 6fr;
  }

  @media screen and (max-width: 614px) {
    width: 100%;
    grid-template-columns: 6fr 6fr;
  }
`;

const Left = styled.section``;

const Center = styled.section`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 614px) {
    display: none;
  }
`;

const SearchResultsContainer = styled.section`
  position: fixed;
  left: 21.6%;
  top: 3.8%;
  display: ${(props) => (props.search ? "flex" : "none")};
  flex-direction: column;
  z-index: 200;
  width: 16%;
  background: white;
  border-radius: 5px;
  color: #007aff;

  @media screen and (max-width: 1100px) {
    left: 21.4%;
  }

  @media screen and (max-width: 768px) {
    left: 25%;
  }

  @media screen and (max-width: 614px) {
    display: none;
  }
`;

// EEF4FA
const SearchResultElem = styled.section`
  padding: 4px;
  color: #383838;
  font-size: 12px;
  cursor: pointer;

  :hover {
    background: #007aff;
    color: #383838;
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
  background-color: #adadad;
  margin: 3px;
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.burgerOpen ? "" : "rotate(-45deg) translate(-6.5px, 6px)"};
`;

const Second = styled.section`
  width: 25px;
  height: 3px;
  background-color: #c6c6c6;
  margin: 3px;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.burgerOpen ? "1" : "0")};
`;

const Third = styled.section`
  width: 25px;
  height: 3px;
  background-color: #c6c6c6;
  margin: 3px;
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.burgerOpen ? "" : "rotate(45deg) translate(-6px, -6px)"};
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
    background: #208294;
    display: ${(props) => (props.burgerOpen ? "none" : "flex")};
    flex-direction: column;
    transition: all 0.5s ease-in;
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
  box-shadow: 0 0 10px #719ece;
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
  font-size: 15px;
  color: black;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  :hover {
    color: #000000;
  }
`;

const Navbar = () => {
  console.log("Navbar Constructor");

  const [search, setSearch] = useState([]);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    auth: false,
    name: "",
    role: "",
  });
  const [burgerOpen, setBurgerOpen] = useState(false);

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

  const listSearch = async (params) => {
    try {
      let response = await axios.post(`${API}/categories/search`, {
        search: params,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const clickChange = async (e) => {
    let searchResults;
    searchResults = await listSearch(e.target.value);
    console.log("searchResults", searchResults.data);
    if (searchResults.data == undefined) setSearch(false);
    else if (searchResults.data.length > 0) setSearch(searchResults.data);
    else setSearch(false);
  };

  const loadSearchResults = () => (
    <SearchResultsContainer search={search}>
      {search.length > 0 &&
        search.map((category, index) => (
          <Link key={category._id + index} href={`/links/${category.slug}`}>
            <SearchResultElem>{category.name}</SearchResultElem>
          </Link>
        ))}
    </SearchResultsContainer>
  );

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
              <SearchBarInput
                onChange={clickChange}
                placeholder="Search For Topics"
              />
            </Center>

            <Right>
              <Ul
                burgerOpen={burgerOpen}
                onClick={() => setBurgerOpen(!burgerOpen)}
              >
                <Link passHref href="/">
                  <Anchor>
                    <Icon className="fas fa-igloo" />{" "}
                    <b style={{ color: "black" }}>Home</b>
                  </Anchor>
                </Link>
                <Link passHref href="/user/link/create">
                  <Anchor>
                    <b style={{ color: "#007AFF" }}>+</b>
                    <b style={{ color: "black" }}>Submit a Link</b>
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
      {loadSearchResults()}
    </React.Fragment>
  );
};

export default Navbar;
