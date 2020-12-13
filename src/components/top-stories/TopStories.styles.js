import styled from 'styled-components';

export const TopStoriesContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* width will be changed to smaller number for smaller screens */
  width: 70vw;
  min-height: 53vh;
  margin-top: 20px;
  /* margin-bottom: 20px; */
`;

export const SubTitle = styled.h3 `
  font-family: var(--font-text);
  font-size: var(--size-sub-menu);
  color: var(--gray);
  margin: 10px 0;
`;

export const TagContainer = styled.div `
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

export const Title = styled.h1 `
  font-family: var(--font-header);
  /* 
  if header has more than 10 words, then I change the size of header.
  Due to the layout I want to keep.
  */
  font-size: ${(props) =>
    props.header.length > 10
      ? 'var(--size-header-long)'
      : 'var(--size-header)'};
`;

export const StoryContainer = styled.div `
  border-right: 1.3px solid lightgray;
  :not(:first-child) {
    padding: 0 40px;
    img {
      display: none;
    }

    ${SubTitle} {
      display: none;
    }

    ${TagContainer} {
      padding-top: 0;
    }

    ${Title} {
      font-size: var(--size-category-selected);
    }
  }

  :first-child {
    grid-row: span 2;
    padding-right: 40px;
  }

  :last-child {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 7px;
    margin-top: 15%;
  }

  :nth-child(2) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 7px;
  }
`;

export const Tag = styled.span `
  background: black;
  color: white;
  padding: 7px 15px;
  text-transform: uppercase;
  font-family: var(--font-links);
  font-size: var(--size-text);
  font-weight: 400;
`;