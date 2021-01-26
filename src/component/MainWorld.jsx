import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function MainWorld({width, height, countryName}) {
  const svgRef = useRef();

  useEffect(() => {
    const handle = (admin) => {
      console.log(admin)
      countryName(admin)
    }
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    console.log(height, width);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${height}px`)
      .attr('height', `${width}px`)
      .style('border', '2px solid black')
      .append('g');

    let mapfeatuer = {};
    d3.json('data/europe.json').then((map) => {
      const svgpath = PathProjection(
        turf.centroid(map).geometry.coordinates,
        700,
        [height / 2 + 270, width / 2 - 50]
      );

      //to load a file successfully it's coordinates should be transfered to wgs84 4326
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
        .style('stroke-width', 2)
        .on('mouseover', function (d, i) {
          d3.select(this).style('fill', 'red');
          // console.log(i.properties.admin);
          // handle(i.properties.gm_naam);
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'white');
        })
        .on('click', function (d, i) {
          // console.log(i.properties.admin);
          handle(i.properties.admin);
          
        });;
    });
  }, [height, width]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
