import styled from "styled-components";

export const MarketComponentsContainer = styled.div`
  margin: 15px 30px 0px 30px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding: 10px 0;
  border-top: 1px solid lightgray;
  position: absolute;
  bottom: 0;
  width: calc(100% - 60px);
  max-width: 1340px;
  min-height: 120px;
  background: var(--background);
  @media (max-width: 1400px) {
    position: sticky;
  }

  /* for Ipad pro */
  @media (min-height: 1100px) and (max-width: 1400px) {
    position: absolute;
  }
`;

export const MarketHeaderContainer = styled.div`
  display: flex;

  @media (max-width: 830px) {
    display: block;
  }
`;

export const MarketTitle = styled.h1`
  font-family: var(--font-links);
  text-transform: uppercase;
  margin-right: 20px;
  @media (max-width: 830px) {
    margin: 0;
  }
`;

export const MarketMenu = styled.button`
  font-family: var(--font-text);
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
font-weight: bold;
`}

  :focus {
    outline: none;
  }

  @media (max-width: 830px) {
    padding-left: 0;
    padding-right: 15px;
    margin-bottom: 10px;
  }
`;
