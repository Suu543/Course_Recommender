import Link from "next/link";
import axios from "axios";
import { API } from "../config";

import {
  Wrapper,
  Container,
  ContainerHeader,
  CategoryContainer,
  CategoryCard,
  CategorySection,
  CategoryImage,
  CategoryName,
} from "../components/Category/CategoryElements";

const Home = ({ categories }) => {
  const listCategories = () =>
    categories.map((c, i) => (
      <Link href={`/links/${c.slug}`}>
        <CategoryCard>
          <CategorySection>
            <CategoryImage src={c.image && c.image.url} alt={c.name} />
            <CategoryName>{c.name}</CategoryName>
          </CategorySection>
        </CategoryCard>
      </Link>
    ));

  return (
    <Wrapper>
      <Container>
        <ContainerHeader>Programming Tutorials / Courses</ContainerHeader>
      </Container>
      <CategoryContainer>{listCategories()}</CategoryContainer>
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
