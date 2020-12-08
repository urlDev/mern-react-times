import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StoryTopicHeadersContainer = styled.div `
  margin: 10px 30px;
  display: flex;
  justify-content: space-between;
`;

export const TopicContainer = styled.div `
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Date = styled.p `
  margin: 0;
  margin-left: ${(props) => props.margin || 0};
  width: ${(props) => props.width || '20%'};
  font-family: var(--font-text);
  font-size: var(--size-sub-menu);
  /* font-weight: bold; */

  span {
    font-family: var(--font-header);
    font-weight: 900;
  }
`;

export const StyledLink = styled(Link)
`
  text-decoration: none;
  color: #707070;
  font-size: var(--size-sub-menu);
  font-family: var(--font-links);
  font-weight: bold;
  position: relative;
  transition: color 0.3s ease-in;

  :hover {
    color: black;
  }
`;