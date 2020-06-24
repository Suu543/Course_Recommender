import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

const Wrapper = styled.div`
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

const HeaderContainer = styled.div`
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

const HeaderInnerContainer = styled.div`
  display: flex;
  flex-flow: row;
`;

const HeaderNestedContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Content = styled.div`
  color: #7b7b7b;
  font-size: 15px;
  margin-top: 4px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 9fr 3fr;

  @media all and (max-width: 768px) {
    grid-template-columns: 12fr;
  }
`;

const LinkElementsContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const LinkElementHeader = styled.div`
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const LinkParagraph = styled.p`
  color: #383838;
  padding: 0 0 0 20px;
`;

const LinkElementContent = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LinkElementContainer = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  background: #ffffff;
`;

const LinkElementWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const LinkNumOfClickContainer = styled.div`
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
    background: #a68f8f;
  }
`;

const LinkNumberOfClicked = styled.span`
  color: #464646;

  i {
    color: #007aff;
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

const Loading = styled.div`
  img {
    background-color: #fafafa;
  }
`;

const Links = ({
  query,
  category,
  links,
  totalLinks,
  linksLimit,
  linkSkip,
}) => {
  const [allLinks, setAllLinks] = useState(links);
  const [limit, setLimit] = useState(linksLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalLinks);

  const handleClick = async (linkId) => {
    const response = await axios.put(`${API}/click-count`, { linkId });
    loadUpdatedLinks();
  };

  const loadUpdatedLinks = async () => {
    const response = await axios.post(`${API}/category/${query.slug}`);
    setAllLinks(response.data.links);
  };

  const loadMore = async () => {
    let toSkip = skip + limit;
    console.log("toSkip", toSkip);
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

  // 5개가 있음면 5, 4, 3 - 2, 1,
  const listOfLinks = () =>
    allLinks.map((link, index) => (
      <LinkElementContainer key={link._id + index}>
        <LinkElementWrapper>
          <LinkNumOfClickContainer onClick={(e) => handleClick(link._id)}>
            <LinkNumberOfClicked>
              <i className="fa fa-thumbs-up"></i>
            </LinkNumberOfClicked>
            <LinkNumberOfClicked>{link.clicks}</LinkNumberOfClicked>
          </LinkNumOfClickContainer>
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
        </LinkElementWrapper>
      </LinkElementContainer>
    ));

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderInnerContainer>
          <Image src={category.image.url} alt={category.name} />
          <HeaderNestedContainer>
            <Title>{category.name} - URL/LINKS</Title>
            <Content>{renderHTML(category.content || "")}</Content>
          </HeaderNestedContainer>
        </HeaderInnerContainer>
      </HeaderContainer>
      <GridContainer>
        <LinkElementsContainer>
          <LinkElementHeader>
            <LinkParagraph>{category.name} Tutorials</LinkParagraph>
          </LinkElementHeader>
          <Loading>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={size > 0 && size >= limit}
              loader={
                <img key={1} src="/static/images/loading.gif" alt="loading" />
              }
            >
              <LinkElementContent>{listOfLinks()}</LinkElementContent>
            </InfiniteScroll>
          </Loading>
        </LinkElementsContainer>
        <div>Most Popular In {category.name}</div>
      </GridContainer>
    </Wrapper>
  );
};

Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 2;

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
  };
};

export default Links;
