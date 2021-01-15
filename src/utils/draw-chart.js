// Reusable function to draw historical price chart in different components
const drawChart = ({ width, reDraw, chartData, svg, d3, index }) => {
  // reDraw => Charts in market details
  // because they are drawn according to screen sizes

  let height;
  let padding;
  let chartWidth;
  let dates;

  // reDraw is for when marketDetails page is shown
  // Chart is constantly redrawn then so thats why I made a separation
  if (reDraw) {
    // changing chart width according to screen width
    chartWidth = width < 1400 ? (width < 700 ? width - 30 : width - 200) : 550;
    height = width < 1400 ? chartWidth * 0.65 : 345;
    padding = 50;
  } else {
    // when its used in market components, width and height
    chartWidth = 100;
    height = 70;
    padding = 10;
  }

  svg.attr("width", chartWidth).attr("height", height);

  if (reDraw) {
    dates = chartData.map((value) => new Date(value.date));
  } else {
    // In market components, there are more than one chart
    // So I get their indexes from the component
    dates = chartData[index].map((value) => new Date(value.date));
  }

  // xScale
  const xAxisScale = d3
    .scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range(
      // Depending if its reDrawn or width changes,
      // In smaller screens, I don't put any padding
      reDraw
        ? width < 500
          ? [0, chartWidth]
          : [padding, chartWidth - padding]
        : [padding, chartWidth - padding]
    );

  // yScale
  const yAxisScale = d3
    .scaleLinear()
    .domain([
      // Chart is drawn from close data on each dataset
      // So in here I am checking where the function is being used
      d3.min(reDraw ? chartData : chartData[index], (data) => data.close),
      d3.max(reDraw ? chartData : chartData[index], (data) => data.close),
    ])
    .range([height - padding, padding]);

  // Charts in market cards don't use axes
  if (reDraw) {
    //   create x Axes
    const xAxes = d3
      .axisBottom(xAxisScale)
      .ticks(width < 700 ? d3.timeDay.every(10) : 5)
      .tickFormat((date) => d3.timeFormat("%b %d, %I:%M")(date));

    // draw x axes
    width > 500 &&
      svg
        .append("g")
        .call(xAxes)
        .attr("transform", `translate(0,${height - padding})`);

    // create y axes
    const yAxes = d3.axisLeft(yAxisScale).tickFormat((d) => `$ ${d}`);

    // draw y axes
    width > 500 &&
      svg.append("g").call(yAxes).attr("transform", `translate(${padding},0)`);
  }

  // create line
  const line = d3
    .line()
    .x((d) => xAxisScale(new Date(d.date)))
    .y((d) => yAxisScale(d.close));

  // draw historical price path
  const path = svg
    .append("path")
    .data(reDraw ? [chartData] : [chartData[index]])
    .style("fill", " none")
    .attr("stroke", reDraw ? "black" : "white")
    .attr("stroke-width", reDraw ? "1.5" : "1.2")
    .attr("d", line);

  // get the length of the path for line transition
  const pathLength = path.node().getTotalLength();

  // transition for the line
  const transitionPath = d3.transition().ease(d3.easeSin).duration(2000);

  // setting pathsLength for strokes attrs and using transition
  // I made it minus pathLength because it was drawing it backwards
  path
    .attr("stroke-dashoffset", -pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .attr("stroke-dashoffset", 0);

  path.interrupt("stroke-dashoffset");
  path.interrupt("stroke-dasharray");
};

export default drawChart;
