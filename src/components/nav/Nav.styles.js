import styled from "styled-components";

export const NavContainer = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => props.borderBottom || "none"};
  margin: 0 15px;
`;

export const Button = styled.button`
  font-family: var(--font-links);
  font-size: var(--size-text);
  font-weight: bold;
  text-transform: uppercase;
  background: none;
  border: ${(props) => props.border || "1px solid black"};
  color: ${(props) => props.color || "black"};
  padding: 7px 15px;
  cursor: pointer;
  transition: all 0.3s ease-in;

  &:hover {
    background: ${(props) => props.background || "black"};
    color: ${(props) => props.hoverColor || "white"};
  }

  :focus {
    outline: none;
  }

  @media (max-width: 400px) {
    padding: 4px 11px;
  }
`;
