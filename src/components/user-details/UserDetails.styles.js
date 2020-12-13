import styled from 'styled-components';

export const UserDetailContainer = styled.div `
  margin-top: 20px;
  height: 53vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`;

export const ImageAndButton = styled.div `
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

  button {
    margin-top: 10px;
    border: none;
    background: black;
    color: white;
    font-family: var(--font-text);
    font-size: var(--size-section-header);
    font-weight: bold;
    padding: 11px 0;
    cursor: pointer;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }
`;

export const UserDetailsForm = styled.div `
  grid-column: 2/4;
  width: 100%;

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
    margin-top: 20px;
    margin-right: auto;
    border: none;
    background: black;
    color: white;
    font-family: var(--font-text);
    font-size: var(--size-section-header);
    font-weight: bold;
    padding: 11px 0;
    width: 100%;
    cursor: pointer;
    text-transform: uppercase;
  }
`;