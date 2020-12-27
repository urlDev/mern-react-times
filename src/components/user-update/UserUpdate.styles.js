import styled from "styled-components";

export const UserDetailsForm = styled.div`
  grid-column: 2/4;
  width: 100%;

  /* 
  to be able to fit the form inside the grid,
  I used flexbox
  */
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div {
    display: flex;
    justify-content: space-between;
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
    border: none;
    background: black;
    color: white;
    font-family: var(--font-links);
    font-size: var(--size-sub-menu);
    font-weight: bold;
    padding: 11px 0;
    width: calc((100% - 70px) / 2);
    margin-left: auto;
    cursor: pointer;
    text-transform: uppercase;
  }
`;
