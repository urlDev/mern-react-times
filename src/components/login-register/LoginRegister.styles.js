import styled from "styled-components";

export const LoginRegisterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(4, 1fr); */
  /* height: calc(100vh- 70px); */
  width: 100%;
  max-width: 1390px;
  margin: 0 auto;
  position: absolute;
  bottom: 30px;
`;

export const Login = styled.div`
  color: white;
  background: white;
`;

export const Background = styled.img`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
  transform: scaleX(-1);
  filter: grayscale(40%);
`;
