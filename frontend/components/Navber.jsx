import styled from "styled-components";
import Link from "next/link";

const Header = styled.header`
  width: 100vw;
  height: 8vh;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`;

const LogoContainer = styled.figure`
  justify-self: center;
  align-self: center;
`;

const Nav = styled.nav`
  align-self: center;
`;

const NavUl = styled.div`
  font-size: 1rem;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const NavLink = styled(Link)`
  list-style: none;
`;

const NavAnchor = styled.a`
  font-size: 1.3rem;
  text-decoration: none;
  margin: 1rem;
`;

const Navbar = () => {
  return (
    <Header>
      <Container>
        <LogoContainer>
          <h1>Hello World</h1>
        </LogoContainer>
        <Nav>
          <NavUl>
            <NavLink href="/post">
              <NavAnchor>Home</NavAnchor>
            </NavLink>
            <NavLink href="/home">
              <NavAnchor>Home</NavAnchor>
            </NavLink>
            <NavLink href="/hello">
              <NavAnchor>Home</NavAnchor>
            </NavLink>
            <NavLink href="/world">
              <NavAnchor>Home</NavAnchor>
            </NavLink>
          </NavUl>
        </Nav>
      </Container>
    </Header>
  );
};

export default Navbar;

// <Nav>
// <NavHeader>
//   <NavLeft>Stylagram</NavLeft>

//   <NavCenter>
//     <Input type="text" placeholder="Search" />
//   </NavCenter>

//   <NavRight>
//     <MenuLink href="#"></MenuLink>

//     <MenuLink href="#"></MenuLink>

//     <MenuLink href="#"></MenuLink>
//   </NavRight>
// </NavHeader>
// </Nav>
