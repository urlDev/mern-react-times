import React from "react";
import * as d3 from "d3";
import { useSelector } from "utils/react-redux-hooks";

import drawChart from "utils/draw-chart";

const MarketCardsChart = ({ index }) => {
  const { homeChartData } = useSelector((chart) => chart.chart);
  const d3HomeRef = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(d3HomeRef.current);

    if (homeChartData.length) {
      drawChart({
        reDraw: false,
        chartData: homeChartData,
        svg,
        d3,
        index,
      });
    }

    return () => {
      // clean the canvas for the next chart
      svg.selectAll("*").remove();
    };
  }, [homeChartData, index]);

  return (
    <div style={{ marginLeft: "auto" }}>
      <svg ref={d3HomeRef}></svg>
    </div>
  );
};

export default MarketCardsChart;
