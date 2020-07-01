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
import { options } from "../../../backend/routes/category";

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
  height: 80vh;
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
  height: 80vh;

  @media all and (max-width: 768px) {
    display: none;
  }
`;

const RightColumnHeader = styled.div`
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const RightColumnContent = styled.div`
  height: 55vh;
  border: 1px solid #007aff;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #f4f7fb;

  h3 {
    display: inline-block;
    margin-bottom: 7px;
    margin-top: 7px;
    font-size: 12px;
  }
`;

const RightColumnTypeSection = styled.section`
  margin-bottom: 4px;

  label {
    margin: 3px;

    input {
      width: 12px;
      height: 12px;
    }

    span {
      margin-left: 5px;
      font-size: 13px;
    }
  }
`;

const SmallImage = styled.img`
  cursor: pointer;
  width: 70px;
  height: 70px;
`;

const BottomContainer = styled.div`
  display: grid;
  width: 80%;
  margin: auto;
  margin-bottom: 4rem;
  grid-template-columns: 4.5fr 1.5fr;

  @media all and (max-width: 768px) {
    grid-template-columns: 12fr;
  }
`;

const BottomColumn = styled.div``;

const BottomContentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;
`;

const BottomColumnHeader = styled.div`
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2px;
`;

const BottomContent = styled.div`
  display: flex;
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

const BottomColumnSection = styled.div``;

// Infinite Scroll 때문에 여러번 요청을 보낸다...
const Links = ({
  categories,
  query,
  category,
  links,
  totalLinks,
  // linksLimit,
  // linkSkip,
  token,
  userLikes,
  allTypes,
  allLevels,
  allMedias,
}) => {
  // const [filteredLinks, setFilterLinks] = useState(links);
  const [options, setOptions] = useState({
    type: "",
    level: "",
    media: "",
  });
  const [allLinks, setAllLinks] = useState(links);
  // const [limit, setLimit] = useState(linksLimit);
  // const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalLinks);
  const [likes, setLikes] = useState(
    token !== null && userLikes ? userLikes : ""
  );
  const [sort, setSort] = useState(false);

  // useEffect(() => {
  //   filterLinks();
  // }, [options]);

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
              <span style={{ background: "#007BFF", color: "#FFFFFF" }}>
                {link.type.type}
              </span>
              <span style={{ background: "#6C757D", color: "#FFFFFF" }}>
                {link.media.media}
              </span>
              <span style={{ background: "#28A745", color: "#FFFFFF" }}>
                {link.level.level}
              </span>
              {link.categories.map((category, index) => (
                <span
                  style={{ background: "#DC3545", color: "#FFFFFF" }}
                  key={index}
                >
                  {category.name}
                </span>
              ))}
            </LinkDetails>
          </LinkDetailsWrapper>
        </LinkColumn>
      </LinkRow>
    ));

  const loadInterests = () =>
    categories.map((c, index) => (
      <Link href={`/links/${c.slug}`} key={c._id}>
        <BottomContent>
          <BottomColumnSection>
            <SmallImage src={c.image && c.image.url} alt={c.name} />
          </BottomColumnSection>
          <BottomColumnSection style={{ marginLeft: "20px" }}>
            <h4>{c.name}</h4>
          </BottomColumnSection>
        </BottomContent>
      </Link>
    ));

  const filterButton = () =>
    sort ? (
      <ColumnBodySort>
        <button style={{ color: "black" }} onClick={() => loadPopularLinks()}>
          <span>
            <i className="fas fa-arrow-up" />
            Upvote
          </span>
        </button>
        <button style={{ color: "#AEA6BA" }} onClick={() => loadRecentLinks()}>
          <i className="fas fa-arrow-up" />
          <span>Recent</span>
        </button>
      </ColumnBodySort>
    ) : (
      <ColumnBodySort>
        <button style={{ color: "#AEA6BA" }} onClick={() => loadPopularLinks()}>
          <span>
            <i className="fas fa-arrow-up" />
            Upvote
          </span>
        </button>
        <button style={{ color: "black" }} onClick={() => loadRecentLinks()}>
          <i className="fas fa-arrow-up" />
          <span>Recent</span>
        </button>
      </ColumnBodySort>
    );

  // function updateOptions(e) {
  //   // Check and Uncheck Logic을 위해
  //   if (options[e.target.name] == e.target.value) {
  //     return setOptions({ ...options, [e.target.name]: "" });
  //   } else {
  //     return setOptions({ ...options, [e.target.name]: e.target.value });
  //   }
  // }

  // function filterLinks() {
  //   let filtered = "";

  //   if (options.type == "" && options.level == "" && options.media == "") {
  //     return setAllLinks(filteredLinks);
  //   } else if (
  //     options.type != "" &&
  //     options.level == "" &&
  //     options.media == ""
  //   ) {
  //     filtered = allLinks.filter((link) => link.type._id == options.link);
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type == "" &&
  //     options.level != "" &&
  //     options.media == ""
  //   ) {
  //     filtered = allLinks.filter((link) => link.level._id == options.level);
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type == "" &&
  //     options.level == "" &&
  //     options.media != ""
  //   ) {
  //     filtered = allLinks.filter((link) => link.media._id == options.media);
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type != "" &&
  //     options.level != "" &&
  //     options.media == ""
  //   ) {
  //     filtered = allLinks.filter(
  //       (link) =>
  //         link.type._id == options.type && link.level._id == options.level
  //     );
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type != "" &&
  //     options.level == "" &&
  //     options.media != ""
  //   ) {
  //     filtered = allLinks.filter(
  //       (link) =>
  //         link.type._id == options.type && link.media._id == options.media
  //     );
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type == "" &&
  //     options.level != "" &&
  //     options.media != ""
  //   ) {
  //     filtered = allLink.filter(
  //       (link) =>
  //         link.level._id == options.level && link.media._id == options.media
  //     );
  //     return setAllLinks(filtered);
  //   } else if (
  //     options.type != "" &&
  //     options.level != "" &&
  //     options.media != ""
  //   ) {
  //     filtered = allLinks.filter(
  //       (link) =>
  //         link.type._id == options.type &&
  //         link.level._id == options.level &&
  //         options.media._id == options.media
  //     );
  //     return setAllLinks(filtered);
  //   }
  // }

  // const clickOptions = (e) => {
  //   console.log("e");
  //   updateOptions(e);
  // };

  const clickOptions = (e) => {
    console.log("clicked!...");
  };

  const filterByTypes = () =>
    allTypes.map((t, i) => (
      <RightColumnTypeSection key={t._id + i}>
        <label>
          <input
            onChange={clickOptions}
            type="checkbox"
            name="type"
            value={t._id}
            checked={t._id == options.type}
          />
          <span>{t.type}</span>
        </label>
      </RightColumnTypeSection>
    ));

  const filterByLevels = () =>
    allLevels.map((l, i) => (
      <RightColumnTypeSection key={l._id + i}>
        <label>
          <input
            onChange={clickOptions}
            type="checkbox"
            name="level"
            value={l._id}
          />
          <span>{l.level}</span>
        </label>
      </RightColumnTypeSection>
    ));

  const filterByMedias = () =>
    allMedias.map((m, i) => (
      <RightColumnTypeSection key={m._id + i}>
        <label>
          <input
            onChange={clickOptions}
            type="checkbox"
            name="media"
            value={m._id}
          />
          <span>{m.media}</span>
        </label>
      </RightColumnTypeSection>
    ));

  //   <InfiniteScroll
  //   pageStart={0}
  //   loadMore={loadMore}
  //   hasMore={size > 0 && size >= limit}
  //   loader={
  //     <img key={1} src="/static/images/loading.gif" alt="loading" />
  //   }
  // >
  //   <LinkContainer>{listOfLinks()}</LinkContainer>
  // </InfiniteScroll>

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
              {filterButton()}
            </LeftColumnBodyHeader>
            <LeftColumnBodyContent>
              <LinkContainer>{listOfLinks()}</LinkContainer>
            </LeftColumnBodyContent>
          </LeftColumn>
          <RightColumn>
            <RightColumnHeader>
              <h3>Filter Courses</h3>
            </RightColumnHeader>
            <RightColumnContent>
              <h3>Type of Courses</h3>
              {filterByTypes()}
              <h3>Level</h3>
              {filterByLevels()}
              <h3>Medium</h3>
              {filterByMedias()}
            </RightColumnContent>
          </RightColumn>
        </RowBody>
      </Container>
      <BottomContainer>
        <BottomColumn>
          <BottomColumnHeader>
            <h5>You might also be interested in...</h5>
          </BottomColumnHeader>
          <BottomContentRow>{loadInterests()}</BottomContentRow>
          <div>Advertisement</div>
        </BottomColumn>
      </BottomContainer>
    </React.Fragment>
  );
};

Links.getInitialProps = async ({ query, req }) => {
  // let skip = 0;
  // let limit = 2;

  let token = jwt.decode(getCookie("token", req));

  try {
    const allTypes = await axios.get(`${API}/types`);
    const allLevels = await axios.get(`${API}/levels`);
    const allMedias = await axios.get(`${API}/medias`);

    if (token !== null) {
      const categories = await axios.get(`${API}/categories/interested`);
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      // const response = await axios.post(`${API}/category/${query.slug}`, {
      //   skip,
      //   limit,
      // });

      const response = await axios.post(`${API}/category/${query.slug}`);

      const nonDuplicatedCategories = categories.data.filter(
        (c) => c._id != response.data.category._id
      );

      return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        // linksLimit: limit,
        // linkSkip: skip,
        token,
        userLikes: userResponse.data.likes,
        categories: nonDuplicatedCategories,
        allTypes: allTypes.data,
        allLevels: allLevels.data,
        allMedias: allMedias.data,
      };
    } else {
      const categories = await axios.get(`${API}/categories/interested`);
      // const response = await axios.post(`${API}/category/${query.slug}`, {
      //   skip,
      //   limit,
      // });
      const response = await axios.post(`${API}/category/${query.slug}`);

      const nonDuplicatedCategories = categories.data.filter(
        (c) => c._id != response.data.category._id
      );

      return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        // linksLimit: limit,
        // linkSkip: skip,
        token,
        userLikes: "",
        categories: nonDuplicatedCategories,
        allTypes: allTypes.data,
        allLevels: allLevels.data,
        allMedias: allMedias.data,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default Links;
