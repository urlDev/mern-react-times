import React from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../error-fallback/ErrorFallback";
import MarketComponents from "../market-components/MarketComponents";
import Nav from "../nav/Nav";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";
import DeleteModal from "../delete-modal/DeleteModal";
import UserUpdate from "../user-update/UserUpdate";
import UserAvatar from "../user-avatar/UserAvatar";

import LogoDarkSrc from "../../assets/logo.svg";

import { StoryTopicContainer } from "../story-topic/StoryTopic.styles.js";
import { UserDetailContainer } from "./UserDetails.styles";
import UserAccountDelete from "../user-account-delete/UserAccountDelete";

const UserDetails = () => {
  const { deleteModal } = useSelector((user) => user.user);

  return (
    <>
      <Nav logo={LogoDarkSrc} borderBottom="1px solid lightgray" icon="1" />
      <StoryTopicHeaders />
      <div style={{ margin: "0 30px" }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: "25px" }}>Profile</h1>
        </StoryTopicContainer>

        <UserDetailContainer>
          <UserAvatar />
          <UserUpdate />
          <UserAccountDelete />
        </UserDetailContainer>
        {deleteModal ? <DeleteModal /> : null}
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MarketComponents />
      </ErrorBoundary>
    </> //
  );
};

export default UserDetails;
