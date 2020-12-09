import styled from 'styled-components';

export const SearchIcon = styled.a `
  height: 100%;
  margin: auto;
  cursor: pointer;
  img {
    opacity: ${(props) => props.icon || 0};
    height: 15px;
  }
`;

export const NavSearchContainer = styled.div `
  transition: all 1.5s ease-in-out;
  width: ${({ open }) => (open ? '250px' : '0')};
  display: flex;

  input {
    transition: all 1.5s ease-in-out;
    width: ${({ open }) => (open ? '100%' : '0px')};
    margin-right: ${({ open }) => (open ? '5px' : '0')};
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    border: none;
    outline: none;
    font-family: var(--font-links);
    font-size: var(--size-sub-menu);
    color: black;
    background: none;
    padding: ${({ open }) => (open ? '5px' : '0')};
  }
`;