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
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  @media (max-width: 770px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-row-gap: 0;
  }
`;

export const UpdateAndDeleteContainer = styled.div`
  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    grid-column: 2 / 4;
    grid-row: 1 / 3;

    ${DeleteAccount} {
      grid-row: 2/3;
      height: 100%;
      margin-top: 50px;
    }

    ${UserDetailsForm} {
      grid-row: 1/2;
      height: 100%;
    }
  }

  @media (max-width: 770px) {
    grid-column: 1 / 5;
    grid-row: 2 / 4;

    ${DeleteAccount} {
      grid-row: 3/4;
      margin-top: 50px;
    }

    ${UserDetailsForm} {
      grid-row: 2/3;
    }
  }

  @media (max-width: 400px) {
    padding-top: 70px;
    ${DeleteAccount} {
      margin: 0;
    }

    ${UserDetailsForm} {
      margin-bottom: 70px;
    }
  }
`;
