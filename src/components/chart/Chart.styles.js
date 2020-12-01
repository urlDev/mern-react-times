import styled from 'styled-components';

export const ChartContainer = styled.div `
  padding-right: 40px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 5%;
    right: 0;
    width: 1px;
    height: 90%;
    background: lightgray;
  }
`;

export const Tooltip = styled.svg `
  border: 1px solid red;
  position: absolute;
  padding: 7px 11px;
  background: var(--gray);
  color: white;
  z-index: 1;
`;