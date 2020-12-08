import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MarketCards = styled(Link)
`
  color: white;
  background: ${(props) =>
    props.percentage > 0 ? 'var(--green)' : 'var(--red)'};
  padding: 5px 10px;
  margin-right: 15px;
  text-decoration: none;
  display: flex;
  width: 100%;
  font-family: var(--font-links);
`;

export const MarketCardsContainer = styled.div `
  display: flex;
  width: 100%;
  /* margin-top: 10px; */
  ${MarketCards} {
    :last-child {
      margin-right: 0;
    }
  }
`;