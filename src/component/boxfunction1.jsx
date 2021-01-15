import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

export default function Boxfunction1({width, height}) {
  const svgRef = useRef();

  useEffect(() => {
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    console.log(height, width);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${width}px`)
      .attr('height', `${width}px`)
      .style('border', '2px solid black')
      .append('g');

    const myProj = d3
      .geoMercator()
      .center([6.0, 51.5])
      .scale(3000)
      .translate([width / 2, width / 2]);

    const svgpath = d3.geoPath().projection(myProj);
    //to load a file successfully it's coordinates should be transfered to wgs84 4326
    d3.json('data/overijssel.json').then((map) => {
        mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', 'black')
        .style('stroke', 'rgb(250, 200, 250)')
        .style('stroke-width', 2);
    })
    
  }, [height, width]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
