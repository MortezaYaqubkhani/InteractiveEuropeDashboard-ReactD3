import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf'

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
        for (let feature of map.features) {
          // console.log(feature)
          if (feature.properties.gm_naam === city) {
            mapfeatuer = feature
            var centroid = turf.centroid(mapfeatuer);
            console.log(centroid)
          }
        }
    const myProj = d3
      .geoMercator()
      .center(turf.centroid(map).geometry.coordinates)
      .scale(5800)
      .translate([width / 2, width / 2]);

    const svgpath = d3.geoPath().projection(myProj);
    //to load a file successfully it's coordinates should be transfered to wgs84 4326
        mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', '{rgb(250, 200, 250)}')
        .style('stroke', 'rgb(250, 200, 250)')
        .style('stroke-width', 2);
    })
    
  }, [height, width, city]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
