import React from 'react';
import { useSelector, useDispatch } from 'utils/react-redux-hooks';
import Slider from 'react-slick';

import { setMarketDetail, fetchRating } from 'redux/actions/chart';

import MarketCardsChart from 'components/market-cards-chart/MarketCardsChart';
import { MarketCards, Placeholder } from './HomeMarketCards.styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeMarketCards = () => {
  const { forex, homeChartData } = useSelector((state) => state.chart);
  const dispatch = useDispatch();

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    cssEase: 'linear',
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
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {forex.length > 4
        ? forex.map((data, index) => (
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
                  <h1>{data.symbol.split('^').join('')}</h1>
                  <h1
                    style={{
                      fontWeight: 'normal',
                      fontSize: 'var(--size-sub-menu)',
                    }}
                  >
                    $ {data.price.toFixed(2)}
                  </h1>
                  <h2> {data.changesPercentage}%</h2>
                </div>

                {homeChartData.length > 5 ? (
                  <MarketCardsChart index={index} />
                ) : (
                  // I added div here for first chart to wait for homeChartData
                  // Second, so that chart wouldn't glitch
                  <Placeholder />
                )}
              </MarketCards>
            </div>
          ))
        : null}
    </Slider>
  );
};

export default HomeMarketCards;
