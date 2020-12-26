import styled from "styled-components";

import { StyledLink } from "../story-topic-headers/StoryTopicHeaders.styles";

export const MenuModalAllPage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 99vh;
  z-index: 100000;
`;

export const MenuModalContainer = styled.div`
  border: 1px solid lightgray;
  margin: 90px 15px 0 auto;
  width: 200px;
  padding: 20px;
  background: var(--background);
  animation: modal 0.5s ease-in-out forwards;

  ${StyledLink} {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 50px 0 0 0;
    border: none;
    padding: 20px 0;

    ${StyledLink} {
      margin-left: 0;
      font-size: var(--size-section-header);
    }
  }
`;
