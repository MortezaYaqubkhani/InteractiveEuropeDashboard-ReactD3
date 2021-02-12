import React, {useState, useEffect, useRef} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';
import CityChart from '../component/cityChart';
import CityBarChart from '../component/cityBarChart';

export default function MainCity({width, height, country, provinceName}) {
  const svgRef = useRef();

  useEffect(() => {
    const mouseOver = (province, tooltip) => {
      // handleCountryOver(country);
      console.log('tol');
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
    d3.json(`data/Enschede.geojson`).then((map) => {
      console.log(map);
      projection.fitSize([height, width], map);

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
          mouseOver(i.properties.BU_NAAM, tooltip);
          console.log(i);
        })
        .on('mousemove', (i, d) => {
          mouseMove(i, d.properties.BU_NAAM, tooltip);
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'rgb(30, 10, 10)');
          mouseOut(tooltip);
        })
        .on('click', function (d, i) {
          // console.log(i.properties.admin);
          //   handleClick(i.properties.BU_NAAM, tooltip);
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

  return (
    <Row>
      <Col xs={12}>
        <div id="svg-chart" ref={svgRef}></div>
      </Col>
      <Row>
        <Col xs={6}>
          <CityChart />
        </Col>
        <Col xs={6}>
          <CityBarChart />
        </Col>
      </Row>
    </Row>
  );
}
