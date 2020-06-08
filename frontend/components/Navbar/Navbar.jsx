// Next
import Link from "next/link";
import React, { useState } from "react";

// Wrapper
import Header from "./NavWrapper/Header";
import NavContainer from "./NavWrapper/NavContainer";

// NavElements
import NavLogo from "./NavElements/NavLogo";
import Nav from "./NavElements/Nav";
import NavAnchor from "./NavElements/NavAnchor";
import NavUl from "./NavElements/NavUl";
import NavPopUpModal from "./NavElements/NavPopupModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
              <Link passHref href="/home">
                <NavAnchor>Home</NavAnchor>
              </Link>
              <NavAnchor open={open} onClick={() => setOpen(!open)}>
                Signup/Signin
              </NavAnchor>
            </NavUl>
          </Nav>
        </NavContainer>
      </Header>
      <NavPopUpModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default Navbar;
