import styled from "styled-components";

export const LoginRegisterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
  /* grid-template-rows: repeat(2, 1fr); */
  /* height: 100vh; */
  width: calc(100% - 30px);
  max-width: 1385px;
  margin: 0 15px;
  position: absolute;
  bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Login = styled.div`
  color: white;
  background: white;
`;

export const Background = styled.picture`
  img {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    object-fit: cover;
    transform: scaleX(-1);
    filter: grayscale(40%);
  }
`;
