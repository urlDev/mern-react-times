import React from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

import { ChartContainer } from './Chart.styles';

const Chart = () => {
  const { chartData } = useSelector((chart) => chart.chart);
  const d3Ref = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(d3Ref.current);

    const width = 550;
    const height = 345;
    const padding = 50;

    svg.attr('width', width).attr('height', height);

    const dates = chartData.map((value) => new Date(value.date));

    // xScale
    const xAxisScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([padding, width - padding]);

    // yScale
    const yAxisScale = d3
      .scaleLinear()
      .domain([
        d3.min(chartData, (data) => data.close),
        d3.max(chartData, (data) => data.close),
      ])
      .range([height - padding, padding]);

    //   create x Axes
    const xAxes = d3
      .axisBottom(xAxisScale)
      .ticks(5)
      .tickFormat((date) => d3.timeFormat('%b %d, %I:%M')(date));

    // draw x axes
    svg
      .append('g')
      .call(xAxes)
      .attr('transform', `translate(0,${height - padding})`);

    // create y axes
    const yAxes = d3.axisLeft(yAxisScale).tickFormat((d) => `$ ${d}`);

    // draw y axes
    svg.append('g').call(yAxes).attr('transform', `translate(${padding},0)`);

    // create line
    const line = d3
      .line()
      .x((d) => xAxisScale(new Date(d.date)))
      .y((d) => yAxisScale(d.close));

    // draw historical price path
    const path = svg
      .append('path')
      .data([chartData])
      .style('fill', ' none')
      .attr('stroke', 'black')
      .attr('stroke-width', '1.5')
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
    path.interrupt('stroke-dasharray');

    return () => {
      // clean the canvas for the next chart
      svg.selectAll('*').remove();
    };
  }, [chartData]);

  return (
    <ChartContainer>
      <svg ref={d3Ref}></svg>
    </ChartContainer>
  );
};

export default Chart;
