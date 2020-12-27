import styled from "styled-components";

export const ImageAndButton = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;

  h2 {
    text-align: center;
    font-family: var(--font-links);

    span {
      color: var(--red);
      text-decoration: underline;
    }
  }

  input[type="file"] {
    visibility: hidden;
    position: absolute;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    border: none;
    background: black;
    color: white;
    text-align: center;
    font-family: var(--font-links);
    font-size: var(--size-sub-menu);
    font-weight: bold;
    padding: 11px 0;
    cursor: pointer;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 770px) {
    grid-column: 2 / 4;
  }

  @media (max-width: 400px) {
    grid-column: 1 / 5;
  }
`;
