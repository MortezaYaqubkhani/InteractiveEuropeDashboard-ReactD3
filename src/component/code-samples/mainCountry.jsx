import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function MainCountry({width, height, country, provinceName}) {
  const svgRef = useRef();

  useEffect(() => {

    const mouseOver = (province, tooltip) => {
      // handleCountryOver(country);
      console.log('tol')
      tooltip.style('visibility', 'visible').text(province);
    };

    const mouseMove = (i, country, tooltip) => {
      tooltip
        .style('top', i.clientY - 10 + 'px')
        .style('left', i.clientX + 10 + 'px')
        .text(country);
    };

    const mouseOut = (tooltip) => {
      tooltip.style('visibility', 'hidden');
    };

    const handleClick = (province, tooltip) => {
      provinceName(province);
      tooltip.style('visibility', 'hidden');
    };

    d3.select(svgRef.current).select('*').remove();
    console.log(height, width);
    console.log('dfdf', country);
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

    var projection = d3
      .geoConicConformal()
      .scale(19000) // value I would like to which when the region changes
      .center([4.45, 50.53]) // value I would like to which when the region changes
      .translate([width / 2, height / 2]);

    // var svg = d3.select( "#mapcontainer" )
    //     .append( "svg" )
    //     .attr("width", width)
    //     .attr("height", height)
    //     .style("border", "solid 1px black");

    var svgpath = d3.geoPath().projection(projection);

    let mapfeatuer = {};
    d3.json(`data/${country}.geojson`).then((map) => {
      console.log(map);
      projection.fitSize([height, width], map);

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
        .style('stroke', 'white')
        .style('fill', 'rgb(30, 10, 10)')
        .style('stroke-width', 1)
        .on('mouseover', function (d, i) {
          d3.select(this).style('fill', 'rgb(60, 60, 60)');
          mouseOver(i.properties.name, tooltip);
          console.log(i.properties.name)
          mapsvg
            .append('svg:image')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 80)
            .attr('height', 80)
            // .attr('xlink:href', "data/download.jpg");
            .attr('xlink:href', `data/pflags/${i.properties.name}.png`);
        })
        .on('mousemove', (i, d) => {
          mouseMove(i, d.properties.name, tooltip);
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'rgb(30, 10, 10)');
          mouseOut(tooltip);
        })
        .on('click', function (d, i) {
          // console.log(i.properties.admin);
          handleClick(i.properties.name, tooltip);
        });

        const tooltip = d3
        .select('body')
        .append('div')
        .style('position', 'absolute')
        .style('font-family', "'Open Sans', sans-serif")
        .style('font-size', '15px')
        .style('z-index', '10')
        .style('background-color', 'white')
        .style('color', 'black')
        .style('border', 'solid')
        .style('border-color', '#A89ED6')
        .style('padding', '5px')
        .style('opacity', 0.9)
        .style('border-radius', '2px')
        .style('visibility', 'hidden');
    });
  }, [height, width]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
