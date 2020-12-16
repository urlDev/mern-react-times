import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchGetFavorites } from "../../redux/actions/favorite";

import Nav from "../nav/Nav";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";

import LogoDarkSrc from "../../assets/logo.svg";

import { StoryTopicContainer } from "../story-topic/StoryTopic.styles.js";
import { UserFavoriteContainer } from "./UserFavorites.styles";

const UserFavorites = () => {
  const { favorites } = useSelector((favorite) => favorite.favorite);
  const { user } = useSelector((user) => user.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.name) {
      dispatch(fetchGetFavorites());
    }
  }, [user.name, dispatch]);

  return (
    <>
      <Nav logo={LogoDarkSrc} borderBottom="1px solid lightgray" icon="1" />
      <StoryTopicHeaders />
      <div style={{ margin: "0 30px" }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: "25px" }}>Your Favorites</h1>
        </StoryTopicContainer>
        <UserFavoriteContainer>
          {favorites.length ? (
            <h1>You have favorites</h1>
          ) : (
            <h1>No favorites added.</h1>
          )}
        </UserFavoriteContainer>
      </div>
    </> //
  );
};

export default UserFavorites;
