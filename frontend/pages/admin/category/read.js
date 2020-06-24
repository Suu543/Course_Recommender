import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import Link from "next/link";
import withAdmin from "../../withAdmin";
import styled from "styled-components";

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
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  align-items: center;
  background: #ffffff;
  padding: 10px 0px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin: 5px 0 5px 0;

  :hover {
    box-shadow: 0px 13px 20px -15px rgba(0, 0, 0, 0.2);
    transform: translate(0px, -1px);
  }
`;

const CategorySection = styled.div``;

const CategoryFuncs = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-self: end;
  margin-right: 15%;

  span {
    padding: 8px 8px;
    margin: 2px;
    border-radius: 5px;

    button {
      background: none;
      font-size: 17px;
      text-decoration: none;
      color: white;
      border: none;

      :hover,
      :active {
        color: black;
      }

      :active,
      :focus {
        outline: none;
      }
    }
  }
`;

const CategoryImage = styled.img`
  cursor: pointer;
  width: 70px;
  height: 70px;

  margin: 0px 15px 0px 15px;
`;

const CategoryName = styled.h3`
  cursor: pointer;
`;

const Read = ({ user, token }) => {
  const [state, setState] = useState({
    error: "",
    success: "",
    categories: [],
  });

  const { error, success, categories } = state;

  useEffect(() => {
    loadCategories();
  }, []);

  const confirmDelete = (e, slug) => {
    e.preventDefault();
    // console.log("Delete > ", slug);
    let answer = window.confirm("Are you sure you want to delete?");
    if (answer) {
      handleDelete(slug);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const response = await axios.delete(`${API}/category/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Category Delete Success", response);
      loadCategories();
    } catch (error) {
      console.log("Category Delete", error);
    }
  };

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, categories: response.data });
  };

  const listCategories = () =>
    categories.map((category, index) => (
      <CategoryCard key={category._id}>
        <CategorySection>
          <Link href={`/links/${category.slug}`}>
            <CategoryImage
              src={category.image && category.image.url}
              alt={category.name}
            />
          </Link>
        </CategorySection>
        <CategorySection>
          <Link href={`/links/${category.slug}`}>
            <CategoryName>{category.name}</CategoryName>
          </Link>
        </CategorySection>
        <CategoryFuncs>
          <span style={{ background: "#1781EB" }}>
            <Link href={`/admin/category/${category.slug}`}>
              <button>Update</button>
            </Link>
          </span>
          <span style={{ background: "#E00B2E" }}>
            <button onClick={(e) => confirmDelete(e, category.slug)}>
              Delete
            </button>
          </span>
        </CategoryFuncs>
      </CategoryCard>
    ));

  return (
    <Wrapper>
      <Header>All Categories</Header>
      <Container>{listCategories()}</Container>
    </Wrapper>
  );
};

export default withAdmin(Read);
