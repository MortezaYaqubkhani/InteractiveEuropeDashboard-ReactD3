import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default function BarChart({width, height, selectedCountry, handleBarchartOver}) {
  const svgRef = useRef();
  const margin = {left: 15, right: 15, bottom: 45, top: 15};

  //to update barchart
  
  useEffect(() => {

    const mouseOver = (i, country, tooltip) => {
      tooltip.style('visibility', 'visible').text();
      handleBarchartOver(country)
    }
    //to read the data
    d3.json('data/europe.json').then((data) => {
      d3.select(svgRef.current).select('*').remove();
    //creating the range for the x values
    const x = d3
    .scaleBand()
    .domain(data.features.map((d) => d.properties.abbrev))
    .range([margin.left+45, width - margin.right + 10])
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
    .attr('viewBox', [0, 0, width, height])
    .style('background-color', 'rgb(242,242,242)');

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 15 )
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Population");
    
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
        .attr('x', (d) => x(d.properties.abbrev))
        .attr('y', (d) => y(d.properties.pop_est))
        .attr('height', (d) => y(0) - y(d.properties.pop_est))
        .attr('width', x.bandwidth())
        .attr('fill', (d) => d.properties.admin === selectedCountry? 'red': 'blue')
        // .attr('fill', (d,i) => d.properties.admin === selectedCountry? '#FDE5BD': 'white')
        .text((d) => d)
        .on('mouseover', function (i, d) {
          
          d3.select(this).attr('fill', '#FDE5BD');
          mouseOver(i, d.properties.admin, tooltip)
        })
        .on('mousemove', (i, d) => {
          console.log(d)
          tooltip
            .style('top', i.clientY - 10 + 'px')
            .style('left', i.clientX + 10 + 'px')
            .html(d.properties.admin + "<br>" + d.properties.pop_est);
        })
        .on('mouseout', function (i, d) {
          tooltip.style('visibility', 'hidden');
          d3.select(this).attr('fill', 'steelblue');
        });
      

      //xaxis element of the barchart
      const xAxis = (g) =>
        g
          .attr('transform', `translate(0,${height - margin.bottom })`)
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
          .attr('transform', `translate(60,0)`)
          .call(d3.axisRight(y))

          svg
          .append('g')
          .attr('class', 'y axis')
          // .attr('transform', `translate(${margin.left+50},0)`)
          .call(yAxis)
          // .call(yAxis)
          .selectAll('text')
          .attr('y', 0)
          .attr('x', -59)
          .attr('dy', '.35em')
          // .attr('transform', 'rotate(90)')
          .style('text-anchor', 'start');

    //       .call((g) => g.select('.domain').remove());



    //  svg
    //     .append('g')
    //     .call(yAxis)
    //     .selectAll('text')
    //     .attr('y', 0)
    //     .attr('x', -30)
    //     .attr('dy', '.35em')
    //     .style('text-anchor', 'start');

      //to define the tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('font-family', "'Open Sans', sans-serif")
        .style('font-size', '15px')
        .style('z-index', '10')
        .style('background-color', 'rgb(0,0,0)')
        .style('color', 'rgb(255,250,250')
        .style('border', 'solid')
        .style('border-color', 'rgb(255,255,255')
        .style('padding', '5px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden');
    });
  }, [height, width, selectedCountry]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
