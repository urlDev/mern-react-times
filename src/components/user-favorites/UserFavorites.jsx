import React from "react";
import { useSelector, useDispatch } from "utils/react-redux-hooks";

import { fetchGetFavorites, fetchDeleteFavorite } from "redux/actions/favorite";
import { setMarketDetail, fetchRating } from "redux/actions/chart";

import AddedSrc from "assets/bookmark.svg";

import {
  StoryTopicContainer,
  FavoriteButton,
} from "components/story-topic/StoryTopic.styles.js";

import ResponsiveNav from "components/responsive-nav/ResponsiveNav";
import {
  UserFavoriteContainer,
  FavoriteCards,
  StockPercentage,
} from "./UserFavorites.styles";

const UserFavorites = () => {
  const { favorites } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user.name) {
      dispatch(fetchGetFavorites());
    }
  }, [user.name, dispatch]);

  return (
    <>
      <ResponsiveNav />
      <div style={{ margin: "0 15px" }}>
        <StoryTopicContainer>
          <h1 style={{ marginTop: "25px" }}>Your Favorites</h1>
        </StoryTopicContainer>
        <UserFavoriteContainer>
          {favorites.length ? (
            favorites.map((stock) => {
              const { symbol, price, changesPercentage } = stock.symbol[0];

              return (
                <div
                  style={{
                    display: "flex",
                    border: "1px solid black",
                    padding: "10px 15px",
                  }}
                  key={symbol}
                >
                  <FavoriteButton
                    style={{ margin: "auto 10px auto 0" }}
                    onClick={() => dispatch(fetchDeleteFavorite(stock._id))}
                  >
                    <img src={AddedSrc} alt="favorite added, bookmark svg" />
                  </FavoriteButton>
                  <FavoriteCards
                    to={`/details/${symbol && symbol.toLowerCase()}`}
                    percentage={stock.changesPercentage}
                    onClick={() => {
                      dispatch(setMarketDetail(stock.symbol[0]));
                      dispatch(fetchRating(symbol));
                    }}
                  >
                    <h1>{symbol.split("^").join("")}</h1>

                    <h1
                      style={{
                        fontWeight: "normal",
                        fontSize: "var(--size-sub-menu)",
                      }}
                    >
                      $ {price.toFixed(2)}
                    </h1>
                    <StockPercentage percentage={changesPercentage}>
                      <h1>{changesPercentage} %</h1>
                    </StockPercentage>
                  </FavoriteCards>
                </div>
              );
            })
          ) : (
            <h1>No favorites added.</h1>
          )}
        </UserFavoriteContainer>
      </div>
    </> //
  );
};

export default UserFavorites;
