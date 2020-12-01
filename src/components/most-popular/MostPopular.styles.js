import styled from 'styled-components';

export const MostPopularContainer = styled.div `
  margin-top: 55px;
  padding: 0 0 0 40px;
`;

export const PopularTitle = styled.h1 `
  font-family: var(--font-header);
  font-size: var(--size-category-selected);
  font-weight: 900;
  margin-top: 0;
  margin-bottom: 20px;
`;

export const PopularStoriesContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 15px;
  grid-column-gap: 10px;
`;

export const StoryContainer = styled.div `
  display: grid;
  grid-template-rows: repeat(2, 30px);
  grid-row-gap: 10px;
  :nth-child(1) {
    grid-column: span 2;
  }
`;

export const StoryTitle = styled.h1 `
  font-family: ${(props) =>
    props.font ? 'var(--font-header)' : 'var(--font-text)'};
  font-size: 1.2rem;
  color: ${(props) => (props.color ? 'var(--gray)' : 'black')};
  margin: 0;
  width: 100%;
`;

export const ImageContainer = styled.div `
  background: url(${(props) => props.background}) no-repeat;
  background-size: cover;
  background-position: center left;
`;