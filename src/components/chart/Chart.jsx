import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { ChartContainer } from './Chart.styles';

const Chart = () => {
  const { chartData, marketDetail } = useSelector((chart) => chart.chart);
  const d3Ref = React.useRef();

  React.useEffect(() => {
    const svg = d3.select(d3Ref.current);

    const width = 600;
    const height = 400;
    const padding = 40;

    svg.attr('width', width).attr('height', height);

    const dates = chartData.map(
      (value) =>
        //   moment(value.date).format('DD MMM | HH:mm'),
        new Date(value.date),
    );

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
    const xAxes = d3.axisBottom(xAxisScale);

    // draw x axes
    svg
      .append('g')
      .call(xAxes)
      .attr('transform', `translate(0,${height - padding})`);

    // create y axes
    const yAxes = d3.axisLeft(yAxisScale).tickFormat(d3.format('d'));

    // draw y axes
    svg.append('g').call(yAxes).attr('transform', `translate(${padding},0)`);

    // create line
    const line = d3
      .line()
      .x((d) => xAxisScale(new Date(d.date)))
      .y((d) => yAxisScale(d.close));

    // draw historical price path
    svg
      .append('path')
      .data([chartData])
      .style('fill', ' none')
      .attr('stroke', 'black')
      .attr('stroke-width', '1.5')
      .attr('d', line);

    return () => {
      // clean the canvas for the next chart
      svg.selectAll('*').remove();
    };
  }, [chartData]);

  return <svg style={{ width: '600px', height: '400px' }} ref={d3Ref}></svg>;
};

export default Chart;
