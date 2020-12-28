import styled from "styled-components";

import { Link } from "react-router-dom";

export const SearchModalContainer = styled.div`
  height: 200px;
  width: calc(250px - 20px);
  position: absolute;
  top: 0;
  left: 115px;
  background: black;
  z-index: 1000;
  overflow-y: scroll;
  padding: 10px;
  animation: modal 0.5s ease-in-out forwards;

  @media (max-width: 768px) {
    width: calc(100% - 50px);
    left: 15px;
    top: 86px;
  }
`;

export const ResultsContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-text);
  font-size: 0.8rem;
  text-decoration: none;
  color: white;
`;

export const SearchModalAllPage = styled.div`
  position: absolute;
  top: 40px;
  left: -100px;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 94vh;
  background: transparent;
  z-index: 999;

  @media (max-width: 768px) {
    left: 0;
    top: 0;
    width: 100%;
  }
`;
