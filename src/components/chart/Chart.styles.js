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