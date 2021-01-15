import styled from "styled-components";

export const LoadingContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || "85px"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ login }) =>
    login &&
    `
      background: #0000008e
      height: 100%;
      
      div {
    border: 1px solid white;
    padding: 50px;
  }
      `}

  img {
    width: 40px;
    animation: loading 1s infinite ease-in-out;
    margin: 0 auto;
  }

  @media (max-width: 1400px) {
    min-height: 100%;
  }
`;
