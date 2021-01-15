import React from "react";
import * as d3 from "d3";
import { useSelector } from "utils/react-redux-hooks";

import drawChart from "utils/draw-chart";

import { ChartContainer } from "./Chart.styles";

const Chart = () => {
  const { chartData } = useSelector((chart) => chart.chart);
  const { width } = useSelector((news) => news.news);
  const d3Ref = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(d3Ref.current);

    drawChart({
      reDraw: true,
      chartData,
      width,
      svg,
      d3,
    });

    return () => {
      // clean the canvas for the next chart
      svg.selectAll("*").remove();
    };
  }, [chartData, width]);

  return (
    <ChartContainer>
      <svg ref={d3Ref}></svg>
    </ChartContainer>
  );
};

export default Chart;
