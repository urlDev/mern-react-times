import styled from "styled-components";

export const LoadingContainer = styled.div`
  width: 100%;
  height: ${(props) => props.height || "70px"};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    animation: loading 1s infinite ease-in-out;
    margin: 0 auto;
  }

  h1 {
    color: white;
    font-family: var(--font-links);
    font-size: var(--size-header-long);
  }

  @media (max-width: 1400px) {
    min-height: 100%;
  }
`;
