// Next
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";

// Wrapper
import Header from "./NavWrapper/Header";
import NavContainer from "./NavWrapper/NavContainer";

// NavElements
import NavLogo from "./NavElements/NavLogo";
import Nav from "./NavElements/Nav";
import NavAnchor from "./NavElements/NavAnchor";
import NavUl from "./NavElements/NavUl";
import NavPopUpModal from "./NavElements/NavPopupModal";

import { logout, maintainerAfterRefresh } from "../../helpers/auth";

const Navbar = () => {
  console.log("Navbar Constructor");

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    auth: false,
    name: "",
    role: "",
  });

  const checkStorage = (key) => {
    console.log("key", key);
    const storedData = localStorage.getItem(key);
    if (!storedData || key !== "user") {
      logout();
      setUserInfo({ auth: false, name: "", role: "" });
      Router.push("/");
    }
  };

  useEffect(() => {
    const status = maintainerAfterRefresh();

    if (!userInfo.auth) {
      setUserInfo({ ...userInfo, auth: status });
    }

    const handler = ({ key }) => checkStorage(key);
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <React.Fragment>
      <Header>
        <NavContainer>
          <NavLogo>
            <Link href="/">
              <h1>Sucr.io</h1>
            </Link>
          </NavLogo>
          <Nav>
            <NavUl>
              <Link passHref href="/">
                <NavAnchor>Home</NavAnchor>
              </Link>
              <Link passHref href="/home">
                <NavAnchor>+Submit a Link</NavAnchor>
              </Link>

              {!userInfo.auth ? (
                <NavAnchor open={open} onClick={() => setOpen(!open)}>
                  Signup/Signin
                </NavAnchor>
              ) : userInfo.role == "admin" ? (
                <React.Fragment>
                  <Link passHref href="/admin">
                    <NavAnchor>Admin</NavAnchor>
                  </Link>
                  <NavAnchor onClick={checkStorage}>Logout</NavAnchor>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link passHref href="/user">
                    <NavAnchor>User</NavAnchor>
                  </Link>
                  <NavAnchor onClick={checkStorage}>Logout</NavAnchor>
                </React.Fragment>
              )}
            </NavUl>
          </Nav>
        </NavContainer>
      </Header>
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
