import styled from "styled-components";

import { Link } from "react-router-dom";

export const UserFavoriteContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  img {
    height: 100%;
  }

  h1 {
    font-family: var(--font-links);
    font-size: var(--size-sub-menu);
  }
`;

export const FavoriteCards = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: var(--font-links);
`;

export const StockPercentage = styled.div`
  color: ${(props) => (props.percentage > 0 ? "var(--green)" : "var(--red)")};
`;
