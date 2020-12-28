import styled from "styled-components";

export const UserImageContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const UserImageButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: relative;
  top: 2px;
  :focus {
    outline: none;
    border: none;
  }
`;
