import styled from "styled-components";

import { Link } from "react-router-dom";

export const UserModalAllPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const UserModalContainer = styled.div`
  position: absolute;
  right: 16px;
  width: 114px;
  display: flex;
  flex-direction: column;
  z-index: 99999999999;
  padding-top: 20px;
  top: 30px;
  animation: modal 0.5s ease-in-out forwards;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

export const UserModalMenu = styled(Link)`
  border-bottom: 1px solid gray;
  padding: 20px 10px;
  text-decoration: none;
  font-size: var(--size-sub-menu);
  font-family: var(--font-text);
  color: white;
  background: black;
  transition: font-weight 0.3s linear;
  &:hover {
    font-weight: bold;
  }
`;
