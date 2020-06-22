import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import styled from "styled-components";

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
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  flex-flow: row;
`;

const HeaderNestedContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Paragraph = styled.p`
  color: #7b7b7b;
  font-size: 15px;
  margin-top: 4px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
`;

const LinkElementsContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const LinkElementHeader = styled.div`
  border: 1px solid #eee;
  padding: 0.3rem;
  background: #ffffff;
`;

const LinkParagraph = styled.p`
  color: #383838;
  padding: 0 0 0 20px;
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

const LinkClicked = styled.div`
  align-self: center;
  justify-self: center;
  width: 62px;
  height: 68px;
  background: #f5f5f5;
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

const LoadMoreParagraph = styled.p`
  text-align: center;
  margin: 1rem;
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

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderInnerContainer>
          <Image src={category.image.url} alt={category.name} />
          <HeaderNestedContainer>
            <Title>{category.name} - URL/LINKS</Title>
            <Paragraph>{renderHTML(category.content || "")}</Paragraph>
          </HeaderNestedContainer>
        </HeaderInnerContainer>
      </HeaderContainer>
      <GridContainer>
        <div>Most Popular In {category.name}</div>
        <LinkElementsContainer>
          <LinkElementHeader>
            <LinkParagraph>{category.name} Tutorials</LinkParagraph>
          </LinkElementHeader>
          {allLinks.map((link, index) => (
            <LinkElementContainer>
              <LinkElementWrapper>
                <LinkClicked></LinkClicked>
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
                      <span>{category.name}</span>
                    ))}
                  </LinkDetails>
                </LinkDetailsWrapper>
              </LinkElementWrapper>
            </LinkElementContainer>
          ))}
          <LoadMoreParagraph>Load More</LoadMoreParagraph>
        </LinkElementsContainer>
      </GridContainer>
    </Wrapper>
  );
};

Links.getInitialProps = async ({ query, req }) => {
  let skip = 0;
  let limit = 2;

  const response = await axios.get(`${API}/category/${query.slug}`, {
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
