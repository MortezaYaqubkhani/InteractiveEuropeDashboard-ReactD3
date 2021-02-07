import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {color} from 'd3';
// import useResizeObserver from 'use-resize-observer';

export default function Piechart({width, height}) {
  //   const [data, setData] = useState([7,8, 80, 9, 12, 13, 10, 11, 12]);
  //   const [wid, setWid] = React.useState(width);
  //   setWid = () => {
  //     wid = this.props.width;
  //   };
  const svgRef = useRef();
  //
  //a function for identifying the type of dataset
  //   const incomeExport = (object) => {
  //     console.log(data[0]);
  //     for (const key in data[0]) {
  //       if (key === 'reward') return 'reward';
  //       else if (key === 'expenditure') return 'expenditure';
  //       else if (key === 'title') return 'title';
  //     }
  //   };

  useEffect(() => {
    //   const {data} = this.props
    // const IncomeOrExpense = incomeExport(data[0]);
    const data = [
      {label: 'Assamese', count: 13},
      {label: 'Bengali', count: 83},
      {label: 'Bodo', count: 1.4},
      {label: 'Dogri', count: 2.3},
      {label: 'Gujarati', count: 46},
      {label: 'Hindi', count: 300},
      {label: 'Kannada', count: 38},
      {label: 'Kashmiri', count: 5.5},
      {label: 'Konkani', count: 5},
      {label: 'Maithili', count: 20},
      {label: 'Malayalam', count: 33},
      {label: 'Manipuri', count: 1.5},
      {label: 'Marathi', count: 72},
      {label: 'Nepali', count: 2.9},
      {label: 'Oriya', count: 33},
      {label: 'Punjabi', count: 29},
      {label: 'Sanskrit', count: 0.01},
      {label: 'Santhali', count: 6.5},
      {label: 'Sindhi', count: 2.5},
      {label: 'Tamil', count: 61},
      {label: 'Telugu', count: 74},
      {label: 'Urdu', count: 52},
    ];

    const radius = 50;

    // svg.append('g').attr('class', 'slices');
    // svg.append('g').attr('class', 'labels');
    // svg.append('g').attr('class', 'lines');

    // define color scale
    const color = d3.scaleOrdinal(d3.schemeAccent);
    // const {width} = this.props;
    // const colorScale = d3
    //   .scaleSequential()
    //   .interpolator(d3.interpolateCool)
    //   .domain([5, data.length]);

    //removing svg
    d3.select(svgRef.current).select('*').remove();

    //draw svg
    const svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${height}px`)
      .attr('height', `${width}px`)
      .style('border', '10px solid white')
      .append('g')
      .attr('transform', `translate(${width / 2}, ${width / 2})`);

    //arc  generator, one of the generators
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // pie generator
    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.count)
      .sort(null);

    //get information from data
    data.forEach(function (d) {
      d.count = +d.count; // calculate count as we iterate through the data
      d.enabled = true; // add enabled property to track which entries are checked
    });

    // creating the chart
    var path = svg
      .selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
      .data(pieGenerator(data)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
      .enter() //creates placeholder nodes for each of the values
      .append('path') // replace placeholders with path elements
      .attr('d', arcGenerator) // define d attribute with arc function above
      .attr('fill', function (d) {
        return color(d.data.label);
      }); // use color scale to define fill of each label in dataset
    // .each(function (d) {
    //   this._current - d;
    // }); // creates a smooth animation for each track

    // mouse event handlers are attached to path so they need to come after its definition
    // path.on('mouseover', function(d) {  // when mouse enters div
    // var total = d3.sum(dataset.map(function(d) { // calculate the total number of tickets in the dataset
    // return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase
    // }));
    //add the new svg
    // const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // // Append sectors
    // arc
    //   .append('path')
    //   .attr('d', arcGenerator)
    //   .style('fill', (_, i) => colorScale(i))
    //   .style('stroke', 'white')
    //   .style('stroke-width', 2);

    //append text
    // arc
    //   .append('text')
    //   .attr('text-anchor', 'middle')
    //   .attr('alignment-baseline', 'middle')
    //   .text((d, i) => i + 1)
    //   .style('fill', '#ffffff')
    //   .attr('transform', (d) => {
    //     const [x, y] = arcGenerator.centroid(d);
    //     return `translate(${x}, ${y})`;
    //   });
    // arc.exit().remove()
    // arc.transition().duration(500)
    //the last piece is actually about the re-rendering conditions
    console.log(typeof color);
  }, [width, height]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
