import styled from 'styled-components';

export const DetailsTableContainer = styled.div `
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
        content: '';
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
`;