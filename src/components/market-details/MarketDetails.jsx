import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setChartTimeFrame, fetchChartData } from "../../redux/actions/chart";
import {
  fetchAddFavorites,
  fetchDeleteFavorite,
  fetchGetFavorites,
} from "../../redux/actions/favorite";

import AddSrc from "../../assets/bookmarkEmpty.svg";
import AddedSrc from "../../assets/bookmark.svg";

import DetailsTable from "../details-table/DetailsTable";
import Chart from "../chart/Chart";
import {
  StoryTopicContainer,
  TimeFrame,
  FavoriteButton,
} from "../story-topic/StoryTopic.styles";

const MarketDetails = () => {
  const { marketDetail, chartTimeFrame } = useSelector((chart) => chart.chart);
  const { favorites } = useSelector((favorite) => favorite.favorite);
  const { user } = useSelector((user) => user.user);

  const timeFrames = ["5min", "15min", "30min", "1hour"];
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchChartData(marketDetail.symbol, chartTimeFrame));
  }, [dispatch, marketDetail.symbol, chartTimeFrame]);

  React.useEffect(() => {
    if (user.name && favorites.length) {
      dispatch(fetchGetFavorites());
    }
  }, [user.name, dispatch, favorites.length]);

  const add = <img src={AddSrc} alt="empty bookmark" />;
  const added = <img src={AddedSrc} alt="added favorite, filled bookmark" />;

  const handleClick = () => {
    // First, checking the length
    // if theres no favorites, then add
    // if there are, then check the index of the instrument clicked
    // if its not -1 (its inside the favorites array), then delete,
    // if its -1, then add
    // and goal! ⚽⚽⚽
    if (favorites.length > 0) {
      const stockIndex = favorites.findIndex(
        (favorite) => favorite.symbol[0].symbol === marketDetail.symbol
      );

      return stockIndex !== -1
        ? dispatch(fetchDeleteFavorite(favorites[stockIndex]._id))
        : dispatch(fetchAddFavorites(marketDetail));
    } else {
      return dispatch(fetchAddFavorites(marketDetail));
    }
  };

  return (
    <>
      <div style={{ margin: "0 30px" }}>
        <StoryTopicContainer>
          <div style={{ display: "flex" }}>
            <h1 style={{ marginTop: "10px" }}>{marketDetail.name}</h1>
            <FavoriteButton onClick={() => handleClick()}>
              {favorites.some(
                (favorite) => favorite.symbol[0].symbol === marketDetail.symbol
              )
                ? added
                : add}
            </FavoriteButton>
          </div>
          {timeFrames.map((time, i) => (
            <TimeFrame
              key={i}
              active={chartTimeFrame === time}
              onClick={() => {
                dispatch(setChartTimeFrame(time));
              }}
              style={{ marginTop: "10px" }}
            >
              {time}
            </TimeFrame>
          ))}
        </StoryTopicContainer>
        <div style={{ display: "flex" }}>
          <Chart />
          <DetailsTable />
        </div>
      </div>
    </> //
  );
};

export default MarketDetails;
