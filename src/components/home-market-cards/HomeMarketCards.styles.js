import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Styled all the cards depending on array length
// so that I can manage to put keyframes
// and they would also have same margin with the container
// For mobile, I might have to make them a grid, which would
// be easier to scale.

export const MarketCards = styled(Link)
`
  color: white;
  background: ${(props) =>
    props.percentage > 0 ? 'var(--green)' : 'var(--red)'};
  padding: 10px 10px;
  width: calc((100vw - 60px - 75px) / 6);
  margin-right: 15px;
  text-decoration: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  // height: 70px;
`;

const biggerThanSix = css `
  width: calc((((100vw - 60px - 75px) / 6) * 7) + 83px);
  animation: slide 20s infinite alternate ease-in-out;
  animation-delay: 2s;
`;

const equalsToSix = css `
  justify-content: space-between;
  width: 100%;
  ${MarketCards} {
    width: calc((100% - 60px - 75px) / 6);

    :last-child {
      margin-right: 0;
    }
  }
`;

export const MarketCardsContainer = styled.div `
  ${(props) => (props.array.length <= 6 ? equalsToSix : biggerThanSix)}
  display: flex;
  margin-top: 10px;
`;

export const Left = styled.div `
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1,
  h2 {
    margin: 2px;
  }
`;

export const Right = styled.div `
  grid-column: 3/ 6;
`;