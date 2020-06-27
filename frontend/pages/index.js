import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import jwt from "jsonwebtoken";
import { API } from "../config";
import styled from "styled-components";
import moment from "moment";
import { getCookie } from "../helpers/auth";

const Container = styled.div``;

const Header = styled.h1`
  margin: 1.5rem;
  text-align: center;
  font-size: 34px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 12fr;
  margin: auto;
  width: 90%;

  @media all and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: 6fr 6fr;
    width: 80%;
  }

  @media all and (min-width: 1025px) {
    grid-template-columns: 4fr 4fr 4fr;
    width: 60%;
  }
`;

const TrendRow = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: 12fr;
  margin: auto;
  width: 90%;

  @media all and (min-width: 768px) and (max-width: 1024px) {
    width: 80%;
  }

  @media all and (min-width: 1025px) {
    width: 60%;
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
`;

const TrendSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 11fr;
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
`;

const TrendSubmitter = styled.div`
  margin-bottom: 9px;
  span {
    font-size: 15px;
    color: #7b7b7b;
  }
`;

const TrendDetails = styled.div`
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

const Home = ({ categories, userLikes, token }) => {
  const [popular, setPopular] = useState([]);
  const [likes, setLikes] = useState(
    token !== null && userLikes ? userLikes : ""
  );

  useEffect(() => {
    loadPopular();
  }, []);

  const handleClick = async (linkId) => {
    if (token !== null) {
      const userId = token._id;
      const response = await axios.put(`${API}/click-count`, {
        linkId,
        userId,
      });

      loadPopular();
    } else {
      alert("Please Signin to hit the like button");
    }
  };

  const loadPopular = async () => {
    if (token !== null) {
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      const response = await axios.get(`${API}/link/popular`);
      setLikes(userResponse.data.likes);
      setPopular(response.data);
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
              <span>{link.type}</span>
              <span>{link.medium}</span>
              {link.categories.map((category, index) => (
                <span key={index}>{category.name}</span>
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
      const userResponse = await axios.post(`${API}/user/likes/${token._id}`);
      const response = await axios.get(`${API}/categories`);

      // console.log("response", response);
      return {
        categories: response.data,
        userLikes: userResponse.data.likes,
        token,
      };
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      const response = await axios.get(`${API}/categories`);

      // console.log("response", response);
      return {
        categories: response.data,
        userLikes: "",
        token,
      };
    } catch (error) {
      console.log("error", error);
    }
  }
};

export default Home;
