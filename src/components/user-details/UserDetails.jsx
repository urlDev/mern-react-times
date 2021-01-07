import React from "react";
import { useSelector } from "utils/react-redux-hooks";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "components/error-fallback/ErrorFallback";
import MarketComponents from "components/market-components/MarketComponents";
import DeleteModal from "components/delete-modal/DeleteModal";
import UserUpdate from "components/user-update/UserUpdate";
import UserAvatar from "components/user-avatar/UserAvatar";
import UserAccountDelete from "components/user-account-delete/UserAccountDelete";
import ResponsiveNav from "components/responsive-nav/ResponsiveNav";

import { StoryTopicContainer } from "components/story-topic/StoryTopic.styles.js";
import {
  UpdateAndDeleteContainer,
  UserDetailContainer,
} from "./UserDetails.styles";

const UserDetails = () => {
  const { user, deleteModal } = useSelector((user) => user.user);
  const { width } = useSelector((news) => news.news);

  return (
    <>
      <ResponsiveNav />
      <div style={{ margin: "0 15px" }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: "25px" }}>Profile</h1>
        </StoryTopicContainer>
        {user.name ? (
          <UserDetailContainer>
            <UserAvatar />
            {width < 1150 ? (
              <UpdateAndDeleteContainer>
                <UserUpdate />
                <UserAccountDelete />
              </UpdateAndDeleteContainer>
            ) : (
              <>
                <UserUpdate />
                <UserAccountDelete />
              </> //
            )}
          </UserDetailContainer>
        ) : null}
        {deleteModal ? <DeleteModal /> : null}
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MarketComponents />
      </ErrorBoundary>
    </> //
  );
};

export default UserDetails;
