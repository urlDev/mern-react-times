import styled from "styled-components";

export const UserDetailsForm = styled.div`
  grid-column: 2/4;
  width: 100%;

  form {
    height: 100%;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  label {
    display: flex;
    align-self: center;
    width: 50%;
    font-family: var(--font-header);
    font-size: var(--size-section-header);
    font-weight: 700;
  }

  input {
    width: 100%;
    border: 1px solid black;
    background-color: transparent;
    outline: none;
    color: black;
    padding: 11px 5px;
    font-size: var(--size-section-header);
    font-family: var(--font-text);
    &::placeholder {
      color: black;
    }
  }

  button {
    /* margin-top: 20px; */
    border: none;
    background: black;
    color: white;
    font-family: var(--font-text);
    font-size: var(--size-section-header);
    font-weight: bold;
    padding: 11px 0;
    width: calc((100% - 70px) / 2);
    margin-left: auto;
    cursor: pointer;
    text-transform: uppercase;
  }
`;
