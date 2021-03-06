import styled from "styled-components";

export const StoryTopicContainer = styled.div`
  margin-top: 15px;

  h1 {
    font-family: var(--font-header);
    font-size: var(--size-category-selected);
    font-weight: 900;
    margin: 0;
    text-transform: capitalize;
  }

  img {
    height: 100%;
  }
`;

export const FavoriteButton = styled.button`
  padding: 0;
  border: 0;
  margin-top: auto;
  margin-left: 10px;
  background: transparent;
  cursor: pointer;
  height: 20px;
  animation: ${(props) => (props.favorite ? "spin 5s linear infinite" : null)};

  :focus {
    outline: none;
  }
`;

export const TimeFrame = styled.button`
  background: var(--background);
  color: black;
  padding: 7px 15px;
  text-transform: uppercase;
  font-family: var(--font-links);
  font-size: var(--size-text);
  font-weight: bold;
  border: 1px solid black;
  margin-right: 10px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
background: black;
color: white;
border: 1px solid transparent;
`}
  :focus {
    outline: none;
  }

  @media (max-width: 350px) {
    padding: 4px 11px;
  }
`;
