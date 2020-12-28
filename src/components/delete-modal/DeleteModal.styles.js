import styled from "styled-components";

export const ModalContainerAllPage = styled.div`
  position: fixed;
  /* top: ${(props) => props.top}px; */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 120;
`;

export const DeleteModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #0000008e;
  height: 100%;
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
`;

export const DeleteTextAndButtons = styled.div`
  /* border: 1px solid white; */
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background: black;

  h1 {
    font-family: var(--font-header);
    font-size: var(--size-header);
    margin-top: 0;
    margin-bottom: 50px;
    text-align: center;
  }

  button {
    border: none;
    background: black;
    color: white;
    font-family: var(--font-text);
    font-size: var(--size-sub-menu);
    font-weight: bold;
    padding: 11px 40px;
    cursor: pointer;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }

    :nth-of-type(2n) {
      margin-bottom: 0;
      background: var(--red);
      color: white;
    }
  }
`;
