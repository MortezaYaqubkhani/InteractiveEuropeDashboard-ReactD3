import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function SmallProvince({city, width, height}) {
  const svgRef = useRef();

  useEffect(() => {
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    console.log(height, width, city);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${width}px`)
      .attr('height', `${width}px`)
      .style('border', '2px solid black')
      .append('g');

      let mapfeatuer = {}
      d3.json('data/overijssel.json').then((map) => {
        

    const svgpath = PathProjection(turf.centroid(map).geometry.coordinates, 5800,[width / 2, width / 2])

    //to load a file successfully it's coordinates should be transfered to wgs84 4326
        mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', (d, i) => d.properties.gm_naam===city ? 'black': 'red')
        .style('stroke', 'rgb(250, 200, 250)')
        .style('stroke-width', 2);
    })
    
  }, [height, width, city]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
