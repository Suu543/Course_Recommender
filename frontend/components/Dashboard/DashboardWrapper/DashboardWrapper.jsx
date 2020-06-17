import styled from "styled-components";

const Wrapper = styled.div`
  width: 90%;
  height: 90vh;
  margin: auto;
  margin-top: 2rem;
`;

const DashboardWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardContentWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const DashboardContent = styled.div`
  a {
    color: black;
    display: block;
    text-decoration: none;
  }
`;

export { Wrapper, DashboardWrapper, DashboardContentWrapper, DashboardContent };
