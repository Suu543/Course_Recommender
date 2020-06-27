import { useEffect, useState } from "react";
import withAdmin from "../withAdmin";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 90vh;
  margin: auto;
  margin-top: 2rem;
`;

const Heading = styled.h1``;

const Row = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  height: 20vh;
  border-radius: 15px;
`;

const RowContent = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ColumnContent = styled.div`
  a {
    color: black;
    display: block;
    text-decoration: none;
  }
`;

const Admin = ({ user }) => {
  const [data, setData] = useState({
    name: "",
    username: "",
    role: "",
    email: "",
  });

  const { name, role, email, username } = user;

  useEffect(() => {
    setData({
      name,
      role,
      email,
      username,
    });
  }, []);

  return (
    <Container>
      <Heading style={{ marginBottom: "2rem" }}>Admin Dashboard</Heading>
      <Row>
        <Column style={{ background: " #2298F1" }}>
          <RowContent>
            <ColumnContent>
              <Heading>
                <a href="/admin/category/create">Create Category</a>
              </Heading>
            </ColumnContent>
          </RowContent>
        </Column>
        <Column style={{ background: "#66B92E" }}>
          <RowContent>
            <ColumnContent>
              <Heading>
                <Link href="/admin/category/read">
                  <a>Read All Categories</a>
                </Link>
              </Heading>
            </ColumnContent>
          </RowContent>
        </Column>
        <Column style={{ background: "#DA932C" }}>
          <RowContent>
            <ColumnContent>
              <Heading>
                <Link href="/admin/link/read">
                  <a>All Links</a>
                </Link>
              </Heading>
            </ColumnContent>
          </RowContent>
        </Column>
        <Column style={{ background: "#D65B4A" }}>
          <RowContent>
            <ColumnContent>
              <Heading>
                <Link href="/admin/link/test">
                  <a>All Links</a>
                </Link>
              </Heading>
            </ColumnContent>
          </RowContent>
        </Column>
      </Row>
    </Container>
  );
};
export default withAdmin(Admin);

// React-Quill 등 CSS가 완전히 rendering 됨을 보장하기 위해 ReFresh가 없는 Link 대신에 a 태그 사용

// <div>
// <h1>Admin Dashboard</h1>
// <Link href="/admin/category/create">
//   <a>Create Category</a>
// </Link>
// </div>
