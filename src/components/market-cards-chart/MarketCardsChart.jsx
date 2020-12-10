import React from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const MarketCardsChart = ({ chart }) => {
  const { homeChartData } = useSelector((chart) => chart.chart);
  const d3HomeRef = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(d3HomeRef.current);
    const width = 100;
    const height = 70;
    const padding = 10;

    svg.attr('width', width).attr('height', height);

    const dates = chart[0].map((value) => new Date(value.date));

    // xScale
    const xAxisScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([padding, width - padding]);
    // yScale
    const yAxisScale = d3
      .scaleLinear()
      .domain([
        d3.min(chart[0], (data) => data.close),
        d3.max(chart[0], (data) => data.close),
      ])
      .range([height - padding, padding]);

    // create line
    const line = d3
      .line()
      .x((d) => xAxisScale(new Date(d.date)))
      .y((d) => yAxisScale(d.close));

    // draw historical price path
    const path = svg
      .append('path')
      .data([chart[0]])
      .style('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '1.2')
      .attr('d', line);

    // get the length of the path for line transition
    const pathLength = path.node().getTotalLength();

    // transition for the line
    const transitionPath = d3.transition().ease(d3.easeSin).duration(2000);

    // setting pathsLength for strokes attrs and using transition
    // I made it minus pathLength because it was drawing it backwards
    path
      .attr('stroke-dashoffset', -pathLength)
      .attr('stroke-dasharray', pathLength)
      .transition(transitionPath)
      .attr('stroke-dashoffset', 0);

    path.interrupt('stroke-dashoffset');

    return () => {
      svg.selectAll('*').remove();
    };
  }, [chart]);

  return <svg style={{ marginLeft: 'auto' }} ref={d3HomeRef}></svg>;
};

export default MarketCardsChart;
