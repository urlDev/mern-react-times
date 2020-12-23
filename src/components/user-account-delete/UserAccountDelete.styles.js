import styled from "styled-components";

export const DeleteAccount = styled.div`
  grid-column: 4 / 6;

  div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 67%;
    border: 1px solid var(--red);
  }

  h1 {
    align-self: center;
    font-family: var(--font-header);
    font-size: var(--size-section-header);
    font-weight: 700;
    margin-bottom: 30px;
  }

  button {
    border: none;
    background: var(--red);
    color: white;
    font-family: var(--font-text);
    font-size: var(--size-section-header);
    font-weight: bold;
    padding: 11px 0;
    width: calc((100% - 70px) / 2);
    margin: 0 auto;
    cursor: pointer;
    text-transform: uppercase;
  }
`;
