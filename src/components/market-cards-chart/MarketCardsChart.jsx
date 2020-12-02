import React from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';

const MarketCardsChart = ({ index }) => {
  const { homeChartData, sortedHomeChartData } = useSelector(
    (chart) => chart.chart,
  );
  const d3HomeRef = React.useRef();

  React.useEffect(() => {
    const svg = d3.select(d3HomeRef.current);

    const width = 70;
    const height = 50;
    const padding = 5;

    svg.attr('width', width).attr('height', height);

    // const dates = homeChartData[index].map((value) => new Date(value.date));

    // // xScale
    // const xAxisScale = d3
    //   .scaleTime()
    //   .domain([d3.min(dates), d3.max(dates)])
    //   .range([padding, width - padding]);

    // // yScale
    // const yAxisScale = d3
    //   .scaleLinear()
    //   .domain([
    //     d3.min(homeChartData[index], (data) => data.close),
    //     d3.max(homeChartData[index], (data) => data.close),
    //   ])
    //   .range([height - padding, padding]);

    // //   create x Axes
    // const xAxes = d3
    //   .axisBottom(xAxisScale)
    //   .ticks(5)
    //   .tickFormat((date) => d3.timeFormat('%b %d, %I:%M')(date));

    // // draw x axes
    // svg
    //   .append('g')
    //   .call(xAxes)
    //   .attr('transform', `translate(0,${height - padding})`);

    // // create y axes
    // const yAxes = d3.axisLeft(yAxisScale).tickFormat((d) => `$ ${d}`);

    // // draw y axes
    // svg.append('g').call(yAxes).attr('transform', `translate(${padding},0)`);

    // // create line
    // const line = d3
    //   .line()
    //   .x((d) => xAxisScale(new Date(d.date)))
    //   .y((d) => yAxisScale(d.close));

    // // draw historical price path
    // const path = svg
    //   .append('path')
    //   .data([homeChartData[index]])
    //   .style('fill', ' none')
    //   .attr('stroke', 'black')
    //   .attr('stroke-width', '1.5')
    //   .attr('d', line);

    // // get the length of the path for line transition
    // const pathLength = path.node().getTotalLength();

    // // transition for the line
    // const transitionPath = d3
    //   .transition()
    //   .delay(700)
    //   .ease(d3.easeSin)
    //   .duration(2000);

    // // setting pathsLength for strokes attrs and using transition
    // // I made it minus pathLength because it was drawing it backwards
    // path
    //   .attr('stroke-dashoffset', -pathLength)
    //   .attr('stroke-dasharray', pathLength)
    //   .transition(transitionPath)
    //   .attr('stroke-dashoffset', 0);
    return () => {
      svg.selectAll('*').remove();
    };
  }, [homeChartData, index]);

  return (
    <>
      <svg ref={d3HomeRef}></svg>
    </>
  );
};

export default MarketCardsChart;
