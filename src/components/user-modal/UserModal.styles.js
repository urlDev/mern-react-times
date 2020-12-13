import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const UserModalContainer = styled.div `
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding-top: 20px;
  top: 20px;
`;

export const UserModalMenu = styled(Link)
`
  border-bottom: 1px solid gray;
  padding: 20px 10px;
  text-decoration: none;
  font-size: var(--size-sub-menu);
  font-family: var(--font-text);
  color: white;
  background: black;
  transition: font-weight 0.3s linear;
  &:hover {
    font-weight: bold;
  }
`;