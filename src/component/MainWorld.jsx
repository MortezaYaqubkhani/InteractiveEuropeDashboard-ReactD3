import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';
import PathProjection from './tools/pathProjection';

export default function MainWorld({
  width,
  height,
  handleCountryName,
  handleCountryOver,
  selectedCountry,
}) {
  const svgRef = useRef();

  useEffect(() => {
    const handleClick = (admin, tooltip) => {
      handleCountryName(admin);
      handleCountryOver('');
      tooltip.style('visibility', 'hidden');
    };

    console.log(selectedCountry);
    const mouseOver = (country, tooltip) => {
      handleCountryOver(country);
      tooltip.style('visibility', 'visible').text(country);
    };

    const mouseOut = (tooltip) => {
      tooltip.style('visibility', 'hidden');
    };

    const mouseMove = (i, country, tooltip) => {
      tooltip
        .style('top', i.clientY - 10 + 'px')
        .style('left', i.clientX + 10 + 'px')
        .text(country);
    };

    //removing svg
    // console.log(height, width);
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
    selectedCountry === '' ? console.log('first') : d3.select(svgRef.current).select('*').remove();
    // selectedCountry !== '' ? d3.select(svgRef.current).select('*').remove() :console.log('first')  ;
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
        // .style('fill', 'white')
        .style('fill', (d, i) =>
          d.properties.admin === selectedCountry ? 'blue' : 'rgb(30, 10, 10)'
        )
        
        .style('stroke', 'white')
        .style('stroke-width', 1)
        .on('mouseover', function (i, d) {
          d3.select(this).style('fill', 'rgb(80, 60, 60)');
          mouseOver(d.properties.admin, tooltip);
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
              `https://www.countryflags.io/${d.properties.wb_a2.toLowerCase()}/shiny/64.png`
            );
        })
        .on('mousemove', (i, d) => {
          mouseMove(i, d.properties.admin, tooltip);
        })
        .on('mouseout', function (i, d) {
          d3.select(this).style('fill', 'rgb(30, 10, 10)');
          mouseOut(tooltip);
        })
        .on('click', function (i, d) {
          // console.log(i.properties.admin);
          handleClick(d.properties.admin, tooltip);
        });

      //define the tooltip
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
  }, [height, width, selectedCountry]);

  return <div id="svg-chart" ref={svgRef}></div>;
}
