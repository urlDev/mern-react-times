import styled from 'styled-components';

export const NavContainer = styled.nav `
  /* width: 100%; */
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => (props.border ? '1px solid lightgray' : 'none')};
  margin: 0 30px;
  button {
    font-family: var(--font-links);
    font-size: var(--size-text);
    font-weight: bold;
    text-transform: uppercase;
    background: none;
    border: ${(props) => (props.color ? '1px solid white' : '1px solid black')};
    color: ${(props) => (props.color ? 'white' : 'black')};
    padding: 7px 15px;
    cursor: pointer;
    transition: all 0.3s ease-in;

    &:hover {
      background: ${(props) => (props.color ? 'white' : 'black')};
      color: ${(props) => (props.color ? 'black' : 'white')};
    }
  }
`;

export const SearchIcon = styled.img `
  opacity: ${(props) => (props.icon ? 1 : 0)};
  height: 15px;
`;