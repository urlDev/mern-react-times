import styled from "styled-components";

import { DeleteAccount } from "../user-account-delete/UserAccountDelete.styles";
import { UserDetailsForm } from "../user-update/UserUpdate.styles";

export const UserDetailContainer = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 70px;
  grid-row-gap: 50px;

  @media (max-width: 1150px) {
    /* grid-column: 1/ 6;
    grid-row: 2/3; */
    grid-template-rows: repeat(2, 1fr);
  }
`;

export const UpdateAndDeleteContainer = styled.div`
  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    grid-column: 2 / 6;
    grid-row: 1 / 3;

    ${DeleteAccount} {
      /* grid-column: 2/ 6; */
      grid-row: 2/3;
      height: 100%;
      margin-top: 50px;
    }

    ${UserDetailsForm} {
      /* grid-column: 2/ 6; */
      grid-row: 1/2;
      height: 100%;
    }
  }
`;
