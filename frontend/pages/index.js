import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import { API } from "../config";
import styled from "styled-components";
import moment from "moment";
import { getCookie } from "../helpers/auth";

const Container = styled.div``;

const Header = styled.h1`
  margin: 1.5rem;
  text-align: center;
  font-size: 28px;
  color: #333333;

  @media all and (max-width: 500px) {
    font-size: 22px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-gap: 7px;
  margin: auto;

  @media all and (min-width: 1025px) {
    grid-template-columns: 4fr 4fr 4fr;
    width: 60%;
  }

  @media all and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: 6fr 6fr;
    width: 80%;
  }

  @media all and (max-width: 500px) {
    grid-template-columns: 12fr;
    width: 95%;
  }
`;

const TrendRow = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 12fr;
  margin: auto;
  width: 90%;

  @media all and (min-width: 1025px) {
    width: 60%;
  }

  @media all and (min-width: 768px) and (max-width: 1024px) {
    width: 80%;
  }

  @media all and (max-width: 500px) {
    grid-template-columns: 6fr;
    width: 90%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background: #ffffff;
  padding: 10px 0px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin: 1px 0 1px 0;
  width: 100%;
  margin: auto;

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -1px);
  }
`;

const Section = styled.div`
  a {
    text-decoration: none;
    color: black;
  }

  h5 {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 60px;
  height: 60px;

  margin: 0px 15px 0px 15px;
`;

const SectionTitle = styled.h3`
  cursor: pointer;

  @media all and (max-width: 500px) {
    font-size: 20px;
  }
`;

const TrendSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 11fr;

  @media all and (max-width: 500px) {
    width: 80%;
    grid-template-columns: 6fr;
    margin: auto;
  }
`;

const TrendLinkClicks = styled.div`
  align-self: center;
  justify-self: center;
  width: 84px;
  height: 88px;
  background: #f5f5f5;
  margin-left: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover,
  :active {
    background: #e6dbdb;
    color: #ffffff;
  }

  @media all and (max-width: 500px) {
    width: 64px;
    height: 68px;
    margin: 0%;
  }
`;

const TrendNumOfClicks = styled.div`
  color: #464646;

  i {
    color: #808080;
    font-size: 20px;
  }
`;

const TrendDetailsWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-left: 30px;
`;

const TrendTitle = styled.div`
  a {
    text-decoration: none;
  }

  span {
    color: #464646;
    font-size: 18px;
    font-weight: 500;
  }

  @media all and (max-width: 500px) {
    span {
      font-size: 15px;
    }
  }
`;

const TrendSubmitter = styled.div`
  margin-bottom: 9px;
  span {
    font-size: 15px;
    color: #7b7b7b;
  }

  @media all and (max-width: 500px) {
    span {
      font-size: 12px;
    }
  }
`;

const TrendDetails = styled.div`
  span {
    margin-right: 10px;
    border-radius: 5px;
    height: 3px;
    padding: 4px 8px;
    font-size: 10px;
    font-weight: bold;
  }

  @media all and (max-width: 500px) {
    display: flex;
    flex-flow: row wrap;

    span {
      display: inline-block;
      height: 25px;
      margin-top: 3px;
    }
  }
`;

const Home = ({ categories, userLikes, token, popularData }) => {
  const [popular, setPopular] = useState(popularData);
  const [likes, setLikes] = useState(
    token !== null && userLikes ? userLikes : ""
  );

  const handleClick = async (linkId) => {
    if (token !== null) {
      const userId = token._id;
      const response = await axios.put(`${API}/click-count`, {
        linkId,
        userId,
      });

      // 좋아요 증가 이후 업데이트된 데이터 요청의 목적
      loadPopular();
    } else {
      alert("Please Signin to hit the like button");
    }
  };

  const loadPopular = async () => {
    if (token !== null) {
      const response = await axios.get(`${API}/link/popular`);
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      setPopular(response.data);
      setLikes(userResponse.data.likes);
    } else {
      const response = await axios.get(`${API}/link/popular`);
      setPopular(response.data);
    }
  };

  const listOfLinks = () =>
    popular.map((link, index) => (
      <Column key={index}>
        <TrendSection>
          {token !== null && likes.includes(link._id) ? (
            <TrendLinkClicks
              style={{ background: "#55f257" }}
              onClick={(e) => handleClick(link._id)}
            >
              <TrendNumOfClicks>
                <i className="fa fa-caret-up" style={{ color: "#FFFFFF" }} />
              </TrendNumOfClicks>
              <TrendNumOfClicks>{link.clicks}</TrendNumOfClicks>
            </TrendLinkClicks>
          ) : (
            <TrendLinkClicks onClick={(e) => handleClick(link._id)}>
              <TrendNumOfClicks>
                <i className="fa fa-caret-up"></i>
              </TrendNumOfClicks>
              <TrendNumOfClicks>{link.clicks}</TrendNumOfClicks>
            </TrendLinkClicks>
          )}
          <TrendDetailsWrapper>
            <TrendTitle>
              <a href={link.url} target="_blank">
                <span>{link.title}</span>
              </a>
            </TrendTitle>
            <TrendSubmitter>
              <span>
                {moment(link.createdAt).fromNow()} Submitted By{" "}
                {link.postedBy.name}
              </span>
            </TrendSubmitter>
            <TrendDetails>
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
            </TrendDetails>
          </TrendDetailsWrapper>
        </TrendSection>
      </Column>
    ));

  const listCategories = () =>
    categories.map((category, index) => (
      <Link key={category._id} href={`/links/${category.slug}`}>
        <Column>
          <Section>
            <Image
              src={category.image && category.image.url}
              alt={category.name}
            />
          </Section>
          <Section>
            <SectionTitle>{category.name}</SectionTitle>
          </Section>
        </Column>
      </Link>
    ));

  return (
    <Container>
      <Header>Programming Tutorials / Courses</Header>
      <Row>{listCategories()}</Row>
      <Header>Trending- Top 5 Links</Header>
      <TrendRow>{listOfLinks()}</TrendRow>
    </Container>
  );
};

Home.getInitialProps = async ({ req }) => {
  let token = jwt.decode(getCookie("token", req));

  if (token !== null) {
    try {
      const response = await axios.get(`${API}/categories`);
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      const popular = await axios.get(`${API}/link/popular`);

      // console.log("popular", popular.data);

      return {
        categories: response.data,
        userLikes: userResponse.data.likes,
        popularData: popular.data,
        token,
      };
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      const response = await axios.get(`${API}/categories`);
      const popular = await axios.get(`${API}/link/popular`);

      // console.log("response", response);

      return {
        categories: response.data,
        userLikes: "",
        popularData: popular.data,
        token,
      };
    } catch (error) {
      console.log("error", error);
    }
  }
};

export default Home;
