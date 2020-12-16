import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setChartTimeFrame, fetchChartData } from "../../redux/actions/chart";
import { fetchAddFavorites } from "../../redux/actions/favorite";

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
  const dispatch = useDispatch();
  const timeFrames = ["5min", "15min", "30min", "1hour"];

  React.useEffect(() => {
    dispatch(fetchChartData(marketDetail.symbol, chartTimeFrame));
  }, [dispatch, marketDetail.symbol, chartTimeFrame]);

  const add = <img src={AddSrc} alt="empty bookmark" />;
  const added = <img src={AddedSrc} alt="added favorite, filled bookmark" />;

  return (
    <>
      <div style={{ margin: "0 30px" }}>
        <StoryTopicContainer>
          <div style={{ display: "flex" }}>
            <h1 style={{ marginTop: "10px" }}>{marketDetail.name}</h1>
            <FavoriteButton
              onClick={() => dispatch(fetchAddFavorites(marketDetail))}
            >
              {favorites.some(
                (favorite) => favorite.symbol === marketDetail.symbol
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
    </>
  );
};

export default MarketDetails;
