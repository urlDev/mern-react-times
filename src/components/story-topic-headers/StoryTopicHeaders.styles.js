import styled from "styled-components";
import { Link } from "react-router-dom";

export const StoryTopicHeadersContainer = styled.div`
  margin: 10px 15px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const TopicContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Date = styled.p`
  margin: 0;
  margin-left: ${(props) => props.margin || 0};
  width: ${(props) => props.width || "20%"};
  font-family: var(--font-text);
  font-size: var(--size-sub-menu);
  /* font-weight: bold; */

  span {
    font-family: var(--font-header);
    font-weight: 900;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledLink = styled(Link)`
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
