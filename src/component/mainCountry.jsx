import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function MainCountry({width, height, country}) {
  const svgRef = useRef();

  useEffect(() => {
    // const handle = (admin) => {
    //   console.log(admin)
    //   countryName(admin)
    // }
    //removing svg
    d3.select(svgRef.current).select('*').remove();
    console.log(height, width);
    console.log('dfdf',country);
    //draw svg
    const mapsvg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', `${height}px`)
      .attr('height', `${width}px`)
      .style('border', '2px solid black')
      .append('g');


      var projection = d3.geoConicConformal()
    .scale(19000) // value I would like to which when the region changes
    .center([4.45, 50.53]) // value I would like to which when the region changes
    .translate([width/2,height/2]);

// var svg = d3.select( "#mapcontainer" )
//     .append( "svg" )
//     .attr("width", width)
//     .attr("height", height)
//     .style("border", "solid 1px black");

var svgpath = d3.geoPath()
    .projection(projection); 

    let mapfeatuer = {};
    d3.json(`data/${country}.geojson`).then((map) => {
      console.log(map)
      projection.fitSize([height,width], map);

      // const bbox_path = path.bounds(map);
      // console.log(bbox_path)
      // const scale = 0.95 / Math.max(
      //   (bbox_path[2] - bbox_path[0]) / width,
      //   (bbox_path[2] - bbox_path[1]) / height
      // );

      // var bbox_feature = d3.geo.bounds(map)
      // const center = [
      //   (bbox_feature[2] + bbox_feature[0]) / 2,
      //   (bbox_feature[3] + bbox_feature[1]) / 2];
      // console.log(scale)
      // console.log(turf.centroid(map).geometry.coordinates)
      // console.log(turf.bboxPolygon(bbox_path).geometry.coordinates[0])

      // const bbox_feature = turf.bboxPolygon(bbox_path).geometry.coordinates[0]
      // const center = [
      //   (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
      //   (bbox_feature[1][1] + bbox_feature[0][1]) / 2];

      //   console.log(center)

      // const svgpath = PathProjection(
      //   turf.center(map).geometry.coordinates,
      //   2000,
      //   [width / 2 + 420, height / 2 ]
      // );

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
          //   var mouse = d3.mouse(this);
          //for adding the flags
          mapsvg
            .append('svg:image')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 200)
            .attr('height', 204)
            // .attr('xlink:href', "data/download.jpg");
            .attr('xlink:href', "data/ff.gif");
          
        });
      // .on('mouseout', function (d, i) {
      //   d3.select(this).style('fill', 'white');
      // })
      // .on('click', function (d, i) {
      //   // console.log(i.properties.admin);
      //   handle(i.properties.admin);

      // });
    });
  }, [height, width]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
