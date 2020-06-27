import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { getCookie } from "../../helpers/auth";
import { API, APP_NAME } from "../../config";
import moment from "moment";
import Head from "next/head";
import renderHTML from "react-render-html";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const Title = styled.h1`
  color: #383838;
  font-size: 24px;
`;

const Image = styled.img`
  margin-right: 1rem;
  width: 100px;
  height: 100px;
`;

const RowHeader = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  border: 2px solid #eee;
  padding: 1rem;
  @media all and (max-width: 768px) {
    grid-template-columns: 12fr;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  flex-flow: row;
`;

const ColumnHeaderContent = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Content = styled.div`
  color: #7b7b7b;
  font-size: 15px;
  margin-top: 4px;
`;

const RowBody = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 9fr 3fr;

  @media all and (max-width: 768px) {
    grid-template-columns: 12fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-flow: column;
`;

const LeftColumnBodyHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ColumnBodySort = styled.div`
  display: flex;
  flex-flow: row;

  button {
    border: none;
    font-size: 13px;
    margin-left: 10px;
    background: white;
    outline: none;
  }
`;

const LeftColumnBodyParagraph = styled.p`
  color: #383838;
  padding: 0 0 0 20px;
`;

const LinkContainer = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LinkRow = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  background: #ffffff;
`;

const LinkColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const LinkNumberOfClicksWrapper = styled.div`
  align-self: center;
  justify-self: center;
  width: 62px;
  height: 68px;
  background: #f5f5f5;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover,
  :active {
    background: #e6dbdb;
    color: #ffffff;
  }
`;

const LinkNumberOfClicks = styled.span`
  color: #464646;

  i {
    color: #808080;
    font-size: 20px;
  }
`;

const LinkDetailsWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const LinkTitle = styled.div`
  a {
    text-decoration: none;
  }

  span {
    color: #464646;
    font-size: 18px;
    font-weight: 500;
  }
`;

const LinkSubmitter = styled.div`
  margin-bottom: 9px;
  span {
    font-size: 15px;
    color: #7b7b7b;
  }
`;

const LinkDetails = styled.div`
  span {
    margin-right: 10px;
    border-radius: 5px;
    height: 3px;
    color: #007aff;
    background: #eef4fa;
    padding: 4px 8px;
    font-size: 11px;
    font-weight: bold;
  }
`;

const LeftColumnBodyContent = styled.div`
  img {
    background-color: #fafafa;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-height: 60vh;
`;

const RightColumnHeader = styled.div`
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;

  h5 {
  }
`;

const RightColumnContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background: #ffffff;
  padding: 10px 0px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin: 1px 0 1px 0;

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -1px);
  }
`;

const SmallImage = styled.img`
  cursor: pointer;
  width: 60px;
  height: 60px;

  margin: 0px 15px 0px 15px;
`;

const RightColumnSection = styled.div``;

const Links = ({
  categories,
  query,
  category,
  links,
  totalLinks,
  linksLimit,
  linkSkip,
  token,
  userLikes,
}) => {
  const [allLinks, setAllLinks] = useState(links);
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalLinks);
  const [likes, setLikes] = useState(
    token !== null && userLikes ? userLikes : ""
  );
  const [sort, setSort] = useState(false);

  const stripHTML = (data) => data.replace(/<\/?[^>]+(>|$)/g, "");

  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={stripHTML(category.content.substring(0, 160))}
      />
      <meta property="og:title" content={category.name} />
      <meta property="og:description" content={stripHTML(category.content)} />
      <meta property="og:image" content={category.image.url} />
      <meta property="og:image:secure_url" content={category.image.url} />
    </Head>
  );

  const handleClick = async (linkId) => {
    if (token !== null) {
      const userId = token._id;
      const response = await axios.put(`${API}/click-count`, {
        linkId,
        userId,
      });
      loadUpdatedLinks();
    } else {
      alert("Please Signin to hit the like button");
    }
  };

  const loadUpdatedLinks = async () => {
    if (token !== null) {
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      const response = await axios.post(`${API}/category/${query.slug}`);
      setLikes(userResponse.data.likes);
      setAllLinks(response.data.links);
    } else {
      const response = await axios.post(`${API}/category/${query.slug}`);
      setAllLinks(response.data.links);
    }
  };

  const loadPopularLinks = async () => {
    const response = await axios.get(`${API}/link/popular/${query.slug}`);
    // console.log("response", response.data.links);
    setSort(true);
    setAllLinks(response.data.links);
  };

  const loadRecentLinks = async () => {
    const response = await axios.post(`${API}/category/${query.slug}`);
    setSort(false);
    setAllLinks(response.data.links);
  };

  const loadMore = async () => {
    let toSkip = skip + limit;
    // console.log("toSkip", toSkip);
    const response = await axios.post(`${API}/category/${query.slug}`, {
      skip: toSkip,
      limit,
    });
    setAllLinks([...allLinks, ...response.data.links]);
    // console.log("allLinks", allLinks);
    // console.log("response.data.links.length", response.data.links.length);
    setSize(response.data.links.length);
    setSkip(toSkip);
  };

  const listOfLinks = () =>
    allLinks.map((link, index) => (
      <LinkRow key={link._id + index}>
        <LinkColumn>
          {token !== null && likes.includes(link._id) ? (
            <LinkNumberOfClicksWrapper
              style={{ background: "#4daf4e" }}
              onClick={(e) => handleClick(link._id)}
            >
              <LinkNumberOfClicks>
                <i className="fa fa-caret-up" style={{ color: "#FFFFFF" }} />
              </LinkNumberOfClicks>
              <LinkNumberOfClicks style={{ color: "#FFFFFF" }}>
                {link.clicks}
              </LinkNumberOfClicks>
            </LinkNumberOfClicksWrapper>
          ) : (
            <LinkNumberOfClicksWrapper onClick={(e) => handleClick(link._id)}>
              <LinkNumberOfClicks>
                <i className="fa fa-caret-up"></i>
              </LinkNumberOfClicks>
              <LinkNumberOfClicks>{link.clicks}</LinkNumberOfClicks>
            </LinkNumberOfClicksWrapper>
          )}

          <LinkDetailsWrapper>
            <LinkTitle>
              <a href={link.url} target="_blank">
                <span>{link.title}</span>
              </a>
            </LinkTitle>
            <LinkSubmitter>
              <span>
                {moment(link.createdAt).fromNow()} Submitted by{" "}
                {link.postedBy.name}
              </span>
            </LinkSubmitter>
            <LinkDetails>
              <span>{link.type}</span>
              <span>{link.medium}</span>
              {link.categories.map((category, index) => (
                <span key={index}>{category.name}</span>
              ))}
            </LinkDetails>
          </LinkDetailsWrapper>
        </LinkColumn>
      </LinkRow>
    ));

  const loadInterests = () =>
    categories.map((c, index) => (
      <Link href={`/links/${c.slug}`} key={c._id}>
        <RightColumnContent>
          <RightColumnSection>
            <SmallImage src={c.image && c.image.url} alt={c.name} />
          </RightColumnSection>
          <RightColumnSection>
            <h4>{c.name}</h4>
          </RightColumnSection>
        </RightColumnContent>
      </Link>
    ));

  return (
    <React.Fragment>
      {head()}
      <Container>
        <RowHeader>
          <ColumnHeader>
            <Image src={category.image.url} alt={category.name} />
            <ColumnHeaderContent>
              <Title>{category.name} - URL/LINKS</Title>
              <Content>{renderHTML(category.content || "")}</Content>
            </ColumnHeaderContent>
          </ColumnHeader>
        </RowHeader>
        <RowBody>
          <LeftColumn>
            <LeftColumnBodyHeader>
              <LeftColumnBodyParagraph>
                {category.name} Tutorials
              </LeftColumnBodyParagraph>
              {sort ? (
                <ColumnBodySort>
                  <button
                    style={{ color: "black" }}
                    onClick={() => loadPopularLinks()}
                  >
                    <span>
                      <i className="fas fa-arrow-up" />
                      Upvote
                    </span>
                  </button>
                  <button
                    style={{ color: "#AEA6BA" }}
                    onClick={() => loadRecentLinks()}
                  >
                    <i className="fas fa-arrow-up" />
                    <span>Recent</span>
                  </button>
                </ColumnBodySort>
              ) : (
                <ColumnBodySort>
                  <button
                    style={{ color: "#AEA6BA" }}
                    onClick={() => loadPopularLinks()}
                  >
                    <span>
                      <i className="fas fa-arrow-up" />
                      Upvote
                    </span>
                  </button>
                  <button
                    style={{ color: "black" }}
                    onClick={() => loadRecentLinks()}
                  >
                    <i className="fas fa-arrow-up" />
                    <span>Recent</span>
                  </button>
                </ColumnBodySort>
              )}
            </LeftColumnBodyHeader>
            <LeftColumnBodyContent>
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={size > 0 && size >= limit}
                loader={
                  <img key={1} src="/static/images/loading.gif" alt="loading" />
                }
              >
                <LinkContainer>{listOfLinks()}</LinkContainer>
              </InfiniteScroll>
            </LeftColumnBodyContent>
          </LeftColumn>
          <RightColumn>
            <RightColumnHeader>
              <h5>You might also be interested in...</h5>
            </RightColumnHeader>
            {loadInterests()}
          </RightColumn>
        </RowBody>
      </Container>
    </React.Fragment>
  );
};

Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 2;

  let token = jwt.decode(getCookie("token", req));

  try {
    if (token !== null) {
      const categories = await axios.get(`${API}/categories/interested`);
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      const response = await axios.post(`${API}/category/${query.slug}`, {
        skip,
        limit,
      });

      const nonDuplicatedCategories = categories.data.filter(
        (c) => c._id != response.data.category._id
      );

      return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        linksLimit: limit,
        linkSkip: skip,
        token,
        userLikes: userResponse.data.likes,
        categories: nonDuplicatedCategories,
      };
    } else {
      const categories = await axios.get(`${API}/categories/interested`);
      const response = await axios.post(`${API}/category/${query.slug}`, {
        skip,
        limit,
      });

      return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        linksLimit: limit,
        linkSkip: skip,
        token,
        userLikes: "",
        categories: nonDuplicatedCategories,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default Links;
