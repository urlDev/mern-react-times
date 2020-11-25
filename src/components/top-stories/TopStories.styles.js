import styled from 'styled-components';

import { StyledLink } from '../story-topic-headers/StoryTopicHeaders.styles';

export const TopStoriesContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  grid-column-gap: 50px;
`;

export const SubTitle = styled.h3 `
  font-family: var(--font-text);
  font-size: var(--size-sub-menu);
  color: var(--gray);
  margin: 20px 0;
`;

export const TagContainer = styled.div `
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.h1 `
  font-family: var(--font-header);
  font-size: var(--size-header);
`;

export const StoryContainer = styled.div `
  margin-top: 30px;

  :not(:first-child) {
    img {
      display: none;
    }

    ${SubTitle} {
      border: 1px solid red;
      display: none;
    }

    ${TagContainer} {
      margin-top: auto;
    }

    ${Title} {
      font-size: var(--size-category-selected);
    }
  }

  :first-child {
    grid-row: span 2;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      transform: rotate(90deg);
      background: lightgray;
      height: 1.2px;
      width: 120%;
      left: 45%;
      top: 50%;
    }
  }

  :last-child {
    ${TagContainer} {
      margin-top: 20px;
    }
  }
`;

export const Tag = styled.span `
  background: black;
  color: white;
  padding: 7px 15px;
  text-transform: uppercase;
  font-family: var(--font-links);
  font-weight: 400;
`;

export const StoryLink = styled(StyledLink)
`
  :after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 100%;
    background: var(--gray);
    height: 1.3px;
  }
`;