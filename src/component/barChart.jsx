import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default function BarChart({width, height}) {
  const svgRef = useRef();
  const margin = {left: 15, right: 15, bottom: 45, top: 15};

  useEffect(() => {
    //to update barchart
    d3.select(svgRef.current).select('*').remove();

    //to read the data
    d3.json('data/europe.json').then((data) => {
      //creating the range for the x values
      const x = d3
        .scaleBand()
        .domain(data.features.map((d) => d.properties.admin))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      //creating the range for the y values
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data.features, (d) => d.properties.pop_est)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      //creating the main svg element
      const svg = d3
        .select(svgRef.current)
        .append('svg')
        .attr('viewBox', [0, 0, width, height]);

      //call tooltip
      // tooltip;

      //creating barchart elements
      const bar = svg
        .append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(data.features)
        .enter()
        .append('rect')
        .style('mix-blend-mode', 'multiply')
        .attr('x', (d) => x(d.properties.admin))
        .attr('y', (d) => y(d.properties.pop_est))
        .attr('height', (d) => y(0) - y(d.properties.pop_est))
        .attr('width', x.bandwidth())
        .text((d) => d)
        .on('mouseover', function (i, d) {
          tooltip.style('visibility', 'visible').text(d.properties.admin);
          d3.select(this).attr('fill', '#FDE5BD');
        })
        .on('mousemove', (i, d) => {
          tooltip
            .style('top', i.clientY - 10 + 'px')
            .style('left', i.clientX + 10 + 'px')
            .text(d.properties.admin);
        })
        .on('mouseout', function (i, d) {
          tooltip.style('visibility', 'hidden');
          d3.select(this).attr('fill', 'steelblue');
        });
      

      //xaxis element of the barchart
      const xAxis = (g) =>
        g
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));

      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        // .call(yAxis)
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(90)')
        .style('text-anchor', 'start');

      //yaxis element of the barchart
      const yAxis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call((g) => g.select('.domain').remove());

      const gy = svg
        .append('g')
        .call(yAxis)
        .selectAll('text')
        .attr('y', 0)
        .attr('x', -30)
        .attr('dy', '.35em')
        .style('text-anchor', 'start');

      //to define the tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('font-family', "'Open Sans', sans-serif")
        .style('font-size', '15px')
        .style('z-index', '10')
        .style('background-color', '#A7CDFA')
        .style('color', '#B380BA')
        .style('border', 'solid')
        .style('border-color', '#A89ED6')
        .style('padding', '5px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden');
    });
  }, [height, width]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
