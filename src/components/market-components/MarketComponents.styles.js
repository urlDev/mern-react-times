import styled from 'styled-components';

export const MarketComponentsContainer = styled.div `
  margin: 30px;
  /* border: 30px solid var(--gray); */
  padding-top: 10px;
  border-top: 1px solid lightgray;
`;

export const MarketHeaderContainer = styled.div `
  display: flex;
`;

export const MarketTitle = styled.h1 `
  font-family: var(--font-links);
  text-transform: uppercase;
  margin-right: 20px;
`;

export const MarketMenu = styled.button `
  font-family: var(--font-text);
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;