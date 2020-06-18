import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerHeader = styled.h1``;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto, 180px);
  padding: 50px;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 668px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.a`
  text-decoration: none;
  padding: 20px;
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 150ms ease;
  width: 100%;

  :focus,
  :hover {
    border-color: #0094ff;
    box-shadow: 3px 3px 3px #bfbfbf;
  }
`;

const CategorySection = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
`;

const CategoryImage = styled.img``;

const CategoryName = styled.h1``;

export {
  Wrapper,
  Container,
  ContainerHeader,
  CategoryContainer,
  CategoryCard,
  CategorySection,
  CategoryImage,
  CategoryName,
};
