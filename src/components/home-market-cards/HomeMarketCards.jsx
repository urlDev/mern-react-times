import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

import { setMarketDetail, fetchRating } from "../../redux/actions/chart";

import MarketCardsChart from "../market-cards-chart/MarketCardsChart";
import { MarketCards } from "./HomeMarketCards.styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeMarketCards = () => {
  const { forex, homeChartData } = useSelector((chart) => chart.chart);
  const dispatch = useDispatch();

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // className: "center",
    // centerMode: true,
    // centerPadding: "-70px",
    // centerPadding: '150px',
    autoplay: true,
    speed: 5000,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {forex.map((data, index) => (
        <div key={index}>
          <MarketCards
            to={`/details/${data.symbol.toLowerCase()}`}
            percentage={data.changesPercentage}
            onClick={() => {
              dispatch(setMarketDetail(data));
              dispatch(fetchRating(data.symbol));
            }}
          >
            <div>
              <h1>{data.symbol.split("^").join("")}</h1>
              <h1
                style={{
                  fontWeight: "normal",
                  fontSize: "var(--size-sub-menu)",
                }}
              >
                $ {data.price.toFixed(2)}
              </h1>
              <h2> {data.changesPercentage}%</h2>
            </div>

            {homeChartData.length ? (
              <MarketCardsChart index={index} />
            ) : (
              // I added div here for first chart to wait for homeChartData
              // Second, so that chart wouldnt glitch
              <div style={{ width: "100px", height: "70px" }}></div>
            )}
          </MarketCards>
        </div>
      ))}
    </Slider>
  );
};

export default HomeMarketCards;
