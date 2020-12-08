import styled from 'styled-components';

export const LoadingContainer = styled.div `
  width: 100%;
  height: ${(props) => props.height || '70px'};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    animation: loading 1s infinite ease-in-out;
  }
`;