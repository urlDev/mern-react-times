import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const SearchModalContainer = styled.div `
  height: 200px;
  width: calc(250px - 20px);
  position: absolute;
  top: 40px;
  background: black;
  z-index: 99;
  overflow-y: scroll;
  padding: 10px;
`;

export const ResultsContainer = styled(Link)
`
  display: flex;
  justify-content: space-between;
  font-family: var(--font-text);
  font-size: 0.8rem;
  text-decoration: none;
  color: white;
`;

export const SearchModalAllPage = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 95vw;
  height: 95vh;
  background: transparent;
  z-index: 1000;
`;