import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function MainWorld({width, height, countryName}) {
  const svgRef = useRef();

  useEffect(() => {
    const handleClick = (admin) => {
      console.log(admin);
      countryName(admin);
    };
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    console.log(height, width);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${height}px`)
      .attr('height', `${width}px`)
      // .style('border', '2px solid black')
      .append('g');

    //to add background color
    mapsvg
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'rgb(65, 83, 83)');
    //rgb(235, 240, 220)
    let mapfeatuer = {};
    d3.json('data/europe.json').then((map) => {
      const bounding_box = turf.bbox(map);
      console.log(map);
      const svgpath = PathProjection(
        turf.centroid(map).geometry.coordinates,
        700,
        [height / 2 + 270, width / 2 - 50]
      );

      d3.select('svgRef.current')
        .append('div')
        .attr('id', 'tooltip')
        .attr('style', 'position: absolute; opacity: 0;');

      //to load a file successfully it's coordinates should be transfered to wgs84 4326
      mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', 'rgb(30, 10, 10)')
        .style('stroke', 'white')
        .style('stroke-width', 1)
        .on('mouseover', function (d, i) {
          d3.select(this).style('fill', 'rgb(60, 60, 60)');
          console.log(i.properties.postal);
          tooltip.style('visibility', 'visible').text(i.properties.admin);
          //for adding the flags
          mapsvg
            .append('svg:image')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 50)
            .attr('height', 50)
            // .attr('xlink:href', "data/download.jpg");
            .attr(
              'xlink:href',
              `https://www.countryflags.io/${i.properties.wb_a2.toLowerCase()}/shiny/64.png`
            );
        })
        .on('mousemove', (i, d) => {
          tooltip
            .style('top', i.clientY - 10 + 'px')
            .style('left', i.clientX + 10 + 'px')
            .text(d.properties.admin);
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'rgb(30, 10, 10)');
          tooltip.style('visibility', 'hidden');
        })
        .on('click', function (d, i) {
          // console.log(i.properties.admin);
          handleClick(i.properties.admin);
        });

      //define the tooltip
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
