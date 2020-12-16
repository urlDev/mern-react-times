import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchGetFavorites,
  fetchDeleteFavorite,
} from "../../redux/actions/favorite";
import { setMarketDetail, fetchRating } from "../../redux/actions/chart";

import Nav from "../nav/Nav";
import StoryTopicHeaders from "../story-topic-headers/StoryTopicHeaders";

import LogoDarkSrc from "../../assets/logo.svg";
import AddedSrc from "../../assets/bookmark.svg";

import {
  StoryTopicContainer,
  FavoriteButton,
} from "../story-topic/StoryTopic.styles.js";
import {
  UserFavoriteContainer,
  FavoriteCards,
  StockPercentage,
} from "./UserFavorites.styles";

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
          {favorites.length > 0 ? (
            favorites.map((stock) => (
              <div
                style={{
                  display: "flex",
                  border: "1px solid black",
                  padding: "10px 15px",
                }}
              >
                <FavoriteButton
                  style={{ margin: "auto 10px auto 0" }}
                  onClick={() => dispatch(fetchDeleteFavorite(stock.symbol))}
                >
                  <img src={AddedSrc} alt="favorite added, bookmark svg" />
                </FavoriteButton>
                <FavoriteCards
                  to={`/details/${stock.symbol.toLowerCase()}`}
                  percentage={stock.changesPercentage}
                  onClick={() => {
                    dispatch(setMarketDetail(stock));
                    dispatch(fetchRating(stock.symbol));
                  }}
                >
                  <h1>{stock.symbol.split("^").join("")}</h1>

                  <h1
                    style={{
                      fontWeight: "normal",
                      fontSize: "var(--size-sub-menu)",
                    }}
                  >
                    $ {stock.price.toFixed(2)}
                  </h1>
                  <StockPercentage percentage={stock.changesPercentage}>
                    <h1>{stock.changesPercentage} %</h1>
                  </StockPercentage>
                </FavoriteCards>
              </div>
            ))
          ) : (
            <h1>No favorites added.</h1>
          )}
        </UserFavoriteContainer>
      </div>
    </> //
  );
};

export default UserFavorites;