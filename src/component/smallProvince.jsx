import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function SmallProvince({handleClick, province, width, height, city}) {
  const svgRef = useRef();

  useEffect(() => {
    const handle = () => {
      handleClick();
    };
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    // console.log(height, width, country);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`)
      // .style('border', '2px solid black')
      .append('g');

    //to add background color
    mapsvg
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'rgb(65, 83, 83)');

    var projection = d3
      .geoConicConformal()
      .scale(19000) // value I would like to which when the region changes
      .center([4.45, 50.53]) // value I would like to which when the region changes
      .translate([width / 2, height / 2]);

    var svgpath = d3.geoPath().projection(projection);

    d3.json(`data/${province.toLowerCase()}.geojson`).then((map) => {
      projection.fitSize([height, width], map);

      // const svgpath = PathProjection(turf.centroid(map).geometry.coordinates, 230,[height / 2 + 90, width / 2 - 30])

      //to load a file successfully it's coordinates should be transfered to wgs84 4326
      mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', (d, i) =>
          d.properties.gm_naam === city ? 'blue' : 'rgb(60, 60, 60)'
        )
        .style('stroke', 'white')
        .style('stroke-width', 0.5)
        .on('click', function (d, i) {
          console.log(i.properties.admin);
          handle();
        });
    });
  }, [height, width, city]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
