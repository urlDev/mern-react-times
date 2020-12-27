import styled from "styled-components";

export const MarketComponentsContainer = styled.footer`
  margin: 0px auto 0px auto;
  padding: 0 15px 15px 15px;
  position: absolute;
  bottom: 0;
  width: calc(100% - 30px);
  max-width: 1370px;
  min-height: 120px;
  background: var(--background);

  @media (max-width: 1150px) {
    position: sticky;
  }

  /* for Ipad pro */
  @media (min-height: 1100px) and (max-width: 1150px) {
    position: absolute;
  }
`;

export const MarketHeaderContainer = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  padding: 10px 0;

  @media (max-width: 830px) {
    display: block;
    padding-bottom: 0;
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
    margin: 10px 0;
    :nth-child(6) {
      padding-right: 0;
    }
  }

  @media (max-width: 350px) {
    font-size: var(--size-sub-menu);
  }
`;
