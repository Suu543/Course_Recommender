import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API } from "../../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import withAdmin from "../../withAdmin";
import { getCookie } from "../../../helpers/auth";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
`;

const Header = styled.div`
  height: 35vh;
  background: linear-gradient(#e66465, #9198e5);
  h1 {
    color: white;
    padding: 4rem;
  }
`;

const Row = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 12fr;
  margin: auto;
`;

const Column = styled.div`
  max-height: 60vh;
  position: relative;
  top: -150px;
  z-index: 10;
  min-height: 25vh;
  background: #f8f6f7;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Table = styled.ul`
  width: 90%;
  margin: auto;
  border-radius: 10px;
`;

const TableRow = styled.li`
  display: flex;
  flex-flow: column wrap;
  margin-bottom: 2rem;
  border-radius: 4px;
  padding: 25px 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -1px);
  }

  :hover,
  :active {
    background: #eee;
  }
`;

const TableColumn = styled.div`
  a {
    text-decoration: none;
    color: #464646;
    font-size: 15px;
  }

  span {
    color: #7b7b7b;
    font-size: 12px;
  }
`;
const TableBadge = styled.div`
  span {
    cursor: pointer;
    font-size: 10px;
    display: inline-block;
    margin: 5px;
    background: #cce5ff;
    color: #396ea7;
    padding: 4px;
    border-radius: 5px;
  }
`;

const Links = ({ token, links, totalLinks, linksLimit, linkSkip }) => {
  const [allLinks, setAllLinks] = useState(links);
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalLinks);

  const confirmDelete = (e, id) => {
    e.preventDefault();
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/link/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("LINK DELETE SUCCESS", response);
      process.browser && window.location.reload();
    } catch (error) {
      console.log("LINK DELETE", error);
    }
  };

  const loadMore = async () => {
    let toSkip = skip + limit;
    console.log("toSkip", toSkip);
    const response = await axios.post(
      `${API}/links`,
      {
        skip: toSkip,
        limit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAllLinks([...allLinks, ...response.data]);
    // console.log("allLinks", allLinks);
    // console.log("response.data.links.length", response.data.links.length);
    setSize(response.data.length);
    setSkip(toSkip);
  };

  // 5개가 있음면 5, 4, 3 - 2, 1,
  const listOfLinks = () =>
    allLinks.map((link, index) => (
      <Table key={link._id + index}>
        <TableRow>
          <TableColumn>
            <a href={link.url} target="_blank">
              <h3>{link.title}</h3>
            </a>
          </TableColumn>
          <TableColumn>
            <span>
              {moment(link.createdAt).fromNow()} Submitted by{" "}
              {link.postedBy.name}
            </span>
          </TableColumn>
          <TableBadge>
            <span>{link.clicks} clicks</span>
            <span>{link.type}</span>
            <span>{link.medium}</span>
            {link.categories.map((category, index) => (
              <span
                style={{
                  background: "#FFF3CD",
                  color: "#A18533",
                }}
                key={index}
              >
                {category.slug}
              </span>
            ))}
            <br />
            <Link href={`/user/link/${link._id}`}>
              <span
                style={{
                  background: "#D1ECF1",
                  color: "#36757F",
                }}
              >
                <a>Update</a>
              </span>
            </Link>
            <span
              onClick={(e) => confirmDelete(e, link._id)}
              style={{ background: "#F8D7DA", color: "#E33F4E" }}
            >
              Delete
            </span>
          </TableBadge>
        </TableRow>
      </Table>
    ));

  return (
    <Container>
      <Header>
        <h1>ALL Links</h1>
      </Header>
      <Row>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={size > 0 && size >= limit}
          loader={<img key={1} src="/static/images/loading.gif" />}
        >
          <Column>{listOfLinks()}</Column>
        </InfiniteScroll>
      </Row>
    </Container>
  );
};

Links.getInitialProps = async ({ req }) => {
  let skip = 0;
  let limit = 5;

  const token = getCookie("token", req);

  const response = await axios.post(
    `${API}/links`,
    {
      skip,
      limit,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    links: response.data,
    totalLinks: response.data.length,
    linksLimit: limit,
    linkSkip: skip,
    token,
  };
};

export default withAdmin(Links);
