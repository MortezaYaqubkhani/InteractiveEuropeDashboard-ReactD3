import React, {Component} from 'react';
import * as d3 from 'd3';

class Map extends Component {
  componentDidMount(error, info) {
    const mapWidth = 500,
      mapHeight = 400;

    const mapsvg = d3
      .select(this.refs.thismap)
      .append('svg')
      .attr('width', `${mapHeight}px`)
      .attr('height', `${mapWidth}px`)
      .style('border', '1px solid black')
      .append('g');

    const myProj = d3
      .geoMercator()
      .center([6.0, 52.5])
      .scale(10000)
      .translate([mapWidth / 2, mapHeight / 2]);

    const svgpath = d3.geoPath().projection(myProj);
    // asynchronously load geojson:
    d3.json(
      'data/overijssel.json',
      function (geojson) {
        mapsvg
        .append('svg:g')
          .selectAll('path')
          .data(geojson.features)
          .enter()
          // for each d create an svgpath that uses the geoPath generator:
          .append('svg: path')
          .append('svg')
          //   .attr('class', 'municipality')
          .attr('d', svgpath)
          .style('background-color', 'red')
          .style('stroke', 'rgb(250, 200, 250)')
          .style('stroke-width', 2);
      } //end of callback function
    );
    console.log(mapsvg)
  }

  render() {
    return (
      <div>
        <p>this is the map section</p>
        <div ref="thismap"></div>
      </div>
    );
  }
}

export default Map;
