import { useEffect, useState } from "react";
import withAdmin from "../withAdmin";
import Link from "next/link";

import {
  Wrapper,
  DashboardWrapper,
  DashboardContentWrapper,
  DashboardContent,
} from "../../components/Dashboard/DashboardWrapper/DashboardWrapper";

import { DashboardBoard } from "../../components/Dashboard/DashboardElements/Board";

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
    <Wrapper>
      <h1 style={{ marginBottom: "2rem" }}>Admin Dashboard</h1>
      <DashboardWrapper>
        <DashboardBoard style={{ background: " #2298F1" }}>
          <DashboardContentWrapper>
            <DashboardContent>
              <h1>
                <Link href="/admin/category/create">
                  <a>Create Category</a>
                </Link>
              </h1>
            </DashboardContent>
          </DashboardContentWrapper>
        </DashboardBoard>
        <DashboardBoard style={{ background: "#66B92E" }}>
          <DashboardContentWrapper>
            <DashboardContent>
              <h1>
                <Link href="/admin/category/read">
                  <a>Read All Categories</a>
                </Link>
              </h1>
            </DashboardContent>
          </DashboardContentWrapper>
        </DashboardBoard>
        <DashboardBoard style={{ background: "#DA932C" }}>3</DashboardBoard>
        <DashboardBoard style={{ background: "#D65B4A" }}>4</DashboardBoard>
      </DashboardWrapper>
    </Wrapper>
  );
};
export default withAdmin(Admin);

// <div>
// <h1>Admin Dashboard</h1>
// <Link href="/admin/category/create">
//   <a>Create Category</a>
// </Link>
// </div>
