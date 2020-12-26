import styled from "styled-components";

export const ChartContainer = styled.div`
  padding-right: 40px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 5%;
    right: 0;
    width: 1px;
    height: 90%;
    background: lightgray;
  }

  @media (max-width: 1400px) {
    display: flex;
    justify-content: center;
    padding: 0;
    &:after {
      display: none;
    }
  }
`;
