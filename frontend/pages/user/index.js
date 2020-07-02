// import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { API } from "../../config";
import Link from "next/link";
import withUser from "../withUser";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
  background: linear-gradient(#99b898, #feceab, #ff847c, #e84a5f);
`;

const Row = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 12fr;

  @media all and (min-width: 768px) {
    grid-template-columns: 4fr 8fr;
  }
`;

const Heading = styled.h2`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;

  span {
    color: #383838;
    font-size: 20px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const RightColumn = styled.div``;

const FeatureContainer = styled.div`
  height: 10vh;
  background: #16acf2;
  border-radius: 10px;
  width: 80%;
  margin-bottom: 1rem;
  padding: 1.5rem;

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -5px);
  }

  a {
    font-size: 1rem;
    color: #ffffff;
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const LinkWrapper = styled.div`
  min-height: 20vh;
  margin-bottom: 1rem;
  background: #ffffff;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 10px;

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -1px);
  }

  :hover,
  :active {
    background: #eee;
  }
`;

const LinkHeader = styled.div`
  a {
    color: #464646;
    text-decoration: none;
  }
`;

const LinkBody = styled.div`
  color: #7b7b7b;
  font-size: 12px;
`;

const LinkBadge = styled.div`
  margin-top: 8px;

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

const ParagraphHeading = styled.h2`
  margin-bottom: 1rem;
  margin-left: 1rem;
  align-self: flex-start;
`;

const User = ({ user, userLinks, token }) => {
  const confirmDelete = (e, id) => {
    e.preventDefault();

    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) handleDelete(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/link/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("LINK DELETE SUCCESS", response);
      Router.replace("/user");
    } catch (error) {
      console.log("LINK DELETE", error);
    }
  };

  const listOfLinks = () =>
    userLinks.map((link, index) => (
      <LinkWrapper key={index} target="_blank">
        <LinkHeader>
          <a href={link.url}>
            <h5>{link.title}</h5>
          </a>
        </LinkHeader>
        <LinkBody>
          <span>
            {moment(link.createdAt).fromNow()} by {link.postedBy.name}
          </span>
          <LinkBadge>
            <span style={{ background: "#E84A5F", color: "white" }}>
              {link.type.type}
            </span>
            <span style={{ background: "#FECEA8", color: "white" }}>
              {link.media.media}
            </span>
            {link.categories.map((category, index) => (
              <span
                style={{ background: "#FF847C", color: "white" }}
                key={index}
              >
                {category.name}
              </span>
            ))}
            <LinkBadge>
              <span style={{ background: "#99B89B", color: "white" }}>
                {link.clicks} clicks
              </span>

              <Link href={`/user/link/${link._id}`}>
                <span
                  style={{
                    background: "#D1ECF1",
                    color: "#36757F",
                  }}
                >
                  Update
                </span>
              </Link>
              <span
                onClick={(e) => confirmDelete(e, link._id)}
                style={{ background: "#F8D7DA", color: "#E33F4E" }}
              >
                Delete
              </span>
            </LinkBadge>
          </LinkBadge>
        </LinkBody>
      </LinkWrapper>
    ));

  return (
    <Container>
      <Heading>
        {user.name}'s <span>Dashboard</span> <br />
        <span>{user.role}</span>
      </Heading>
      <Row>
        <LeftColumn>
          <ParagraphHeading>Features</ParagraphHeading>
          <FeatureContainer>
            <Link href="/user/link/create">
              <a>Submit a link</a>
            </Link>
          </FeatureContainer>
          <FeatureContainer>
            <Link href="/user/profile/update">
              <a>Update Profile</a>
            </Link>
          </FeatureContainer>
        </LeftColumn>
        <RightColumn>
          <ParagraphHeading>Your Links</ParagraphHeading>
          <LinkContainer>{listOfLinks()}</LinkContainer>
        </RightColumn>
      </Row>
    </Container>
  );
};

export default withUser(User);
