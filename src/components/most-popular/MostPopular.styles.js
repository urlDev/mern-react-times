import styled from "styled-components";

export const MostPopularContainer = styled.div`
  @media (max-width: 1400px) {
    width: 100%;
    min-width: 300px;
  }

  @media (max-width: 830px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 50px;
    /* grid-template-rows: repeat(2, 1fr); */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    min-width: 100%;
  }
`;

export const MostPopularWithHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
  padding: 0 0 0 40px;
  @media (max-width: 830px) {
    margin: 0;
    padding: 0;
  }
`;

export const PopularTitle = styled.h1`
  font-family: var(--font-header);
  font-size: var(--size-category-selected);
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  background: url(${(props) => props.background}) no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const PopularStoriesContainer = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
  grid-column-gap: 10px;

  @media (max-width: 830px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 0;
    margin: 0;

    :nth-child(n) ${ImageContainer} {
      grid-row: 2 / 4;
    }
  }

  @media (max-width: 600px) {
    /* width: calc(100% - 10px); */
    grid-template-rows: repeat(4, 1fr);
    :nth-child(n) ${ImageContainer} {
      grid-row: 2 / 5;
    }
  }
`;

export const StoryContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 30px);
  grid-row-gap: 10px;
  :nth-child(1) {
    grid-column: span 2;
  }
  @media (max-width: 830px) {
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 0;
  }
`;

export const StoryTitle = styled.h1`
  font-family: ${(props) => props.font || "var(--font-text)"};
  font-size: 1.2rem;
  color: ${(props) => props.color || "black"};
  margin: 0;
  width: 100%;
`;

export const SeeAll = styled.a`
  text-decoration: none;
  color: #707070;
  font-size: var(--size-sub-menu);
  font-family: var(--font-links);
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: color 0.3s ease-in;

  :hover {
    color: black;
  }

  :after {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 0;
    width: ${(props) => props.popular || "110px"};
    background: var(--gray);
    height: 2px;
  }
`;
