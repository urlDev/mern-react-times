import styled from "styled-components";

export const ErrorContainer = styled.div`
  border-top: 1px solid lightgray;
  margin: 20px 15px;
  height: ${(props) => props.height || "120px"};
  h1 {
    font-size: var(--size-header-long);
    font-family: var(--font-text);
    color: var(--red);
  }

  p {
    font-size: var(--size-section-header);
    font-family: var(--font-links);
  }
`;
