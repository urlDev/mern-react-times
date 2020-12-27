import styled from "styled-components";

export const HamburgerMenu = styled.div`
  margin-left: auto;
  cursor: pointer;
  display: ${(props) => props.icon || "none"};
  img {
    width: 20px;
  }
`;
