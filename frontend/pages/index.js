import Link from "next/link";
import axios from "axios";
import { API } from "../config";
import styled from "styled-components";

// import {
//   Wrapper,
//   Container,
//   ContainerHeader,
//   CategoryContainer,
//   CategoryCard,
//   CategorySection,
//   CategoryImage,
//   CategoryName,
// } from "../components/Category/CategoryElements";

const Wrapper = styled.div``;

const Header = styled.h1`
  margin: 1.5rem;
  text-align: center;
  font-size: 34px;
`;

const Container = styled.div`
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

const CategoryCard = styled.div`
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

const CategorySection = styled.div``;

const CategoryImage = styled.img`
  cursor: pointer;
  width: 60px;
  height: 60px;

  margin: 0px 15px 0px 15px;
`;

const CategoryName = styled.h3`
  cursor: pointer;
`;

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((category, index) => (
      <Link key={category._id} href={`/links/${category.slug}`}>
        <CategoryCard>
          <CategorySection>
            <CategoryImage
              src={category.image && category.image.url}
              alt={category.name}
            />
          </CategorySection>
          <CategorySection>
            <CategoryName>{category.name}</CategoryName>
          </CategorySection>
        </CategoryCard>
      </Link>
    ));

  return (
    <Wrapper>
      <Header>Programming Tutorials / Courses</Header>
      <Container>{listCategories()}</Container>
    </Wrapper>
  );
};

Home.getInitialProps = async () => {
  const response = await axios.get(`${API}/categories`);

  return {
    categories: response.data,
  };
};

export default Home;
