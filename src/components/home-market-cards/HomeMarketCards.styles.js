import { Link } from "react-router-dom";
import styled from "styled-components";

export const MarketCards = styled(Link)`
  color: white;
  background: ${(props) =>
    props.percentage > 0 ? "var(--green)" : "var(--red)"};
  padding: 5px 10px;
  text-decoration: none;
  display: flex;
  width: 100%;
  font-family: var(--font-links);
`;
