import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const NavContainer = styled.nav `
  /* width: 100%; */
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  margin: 0 30px;
  button {
    font-family: var(--font-links);
    font-size: var(--size-text);
    font-weight: bold;
    text-transform: uppercase;
    background: none;
    border: 1px solid black;
    padding: 7px 15px;
    cursor: pointer;
    transition: all 0.3s ease-in;
    
    &:hover {
        background: black;
        color: white;  
    }
  }
`;

export const Logo = styled(Link)
`
  text-decoration: none;
`;

export const SearchIcon = styled.img `
  height: 15px;
`;