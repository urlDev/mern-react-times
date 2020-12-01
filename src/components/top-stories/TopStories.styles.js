import styled from 'styled-components';

import { StyledLink } from '../story-topic-headers/StoryTopicHeaders.styles';

export const TopStoriesContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 70vw;
  height: 20vh;
  margin-top: 20px;
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
  font-size: var(--size-header);
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

export const StoryLink = styled(StyledLink)
`
  :after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 0;
    width: ${(props) => (props.popular ? '43px' : '110px')};
    background: var(--gray);
    height: 2px;
  }
`;