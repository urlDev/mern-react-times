import styled from "styled-components";

export const UserPicture = styled.picture`
  margin-left: ${(props) => props.margin || "0"};
  img {
    width: ${(props) => props.width || "29px"};
    border-radius: ${(props) => props.border || "0"};
  }
`;
