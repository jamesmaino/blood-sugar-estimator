// LineGraph.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineGraph({ data, width, height }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data.x), d3.max(data.x)])
      .range([50, width - 50]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data.y), d3.max(data.y)])
      .range([height - 50, 50]);

    const line = d3
      .line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));

    // Plotting the path
    svg
      .append("path")
      .datum(data.x.map((v, i) => [v, data.y[i]]))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 50})`)
      .call(d3.axisBottom(xScale));

    // Y-axis
    svg
      .append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft(yScale));

    // X-axis label
    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height - 10})`)
      .style("text-anchor", "middle")
      .text("Time (h)");

    // Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 20)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Blood sugard (mg/dL)");
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
}

export default LineGraph;
