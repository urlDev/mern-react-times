import styled from "styled-components";

export const DetailsTableContainer = styled.div`
  padding-left: 40px;
  width: 100%;
  display: flex;

  table {
    height: 100%;
    width: 100%;
    :nth-child(2) {
      height: 100%;
      padding-left: 5%;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 5%;
        left: 0;
        width: 1px;
        height: 90%;
        background: lightgray;
      }
    }
  }

  td {
    font-size: var(--size-sub-menu);
    :nth-child(1) {
      font-family: var(--font-header);
      font-weight: 700;
    }
    :nth-child(2) {
      font-family: var(--font-text);
    }
  }

  @media (max-width: 1400px) {
    padding-left: 0;

    td {
      padding: 10px 0;
      :nth-child(2n) {
        width: 150px;
      }
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;

    table {
      :nth-child(2) {
        padding-left: 0;
        margin-top: 30px;
        &:after {
          display: none;
        }
      }
    }
  }
  @media (max-width: 400px) {
    td {
      :nth-child(2n) {
        width: 70px;
      }
    }
  }
`;
