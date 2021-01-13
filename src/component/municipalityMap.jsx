import React, {Component, createRef} from 'react';
import * as d3 from 'd3';

class MunicipalityMap extends Component {
  constructor(props) {
    super(props);
    this.thismap = React.createRef();
  }
  componentDidMount(error, info) {
    //reading map data
     d3.json('data/Mun-2.geojson').then(function (data) {
      const map = data;
      console.log(typeof(map))
      console.log(map)
      return map
    }).catch(err => console.log(err.message));

    
    // };
    // readingMapData('data/overijssel.json', function (mapp) {
    //   console.log(mapp.features);
    // });
    // readingMapData();
    // console.log(mmap.features);
    // console.log(readingMapData())
    // const mapp = readingMapData();
    // console.log(mapp.features)
    const mapWidth = 350,
      mapHeight = 400;

    const provinceMap = async (
      where = this.thismap.current,
      height,
      width,
      scale
    ) => {
      console.log('this is province map');
      const mapsvg = d3
        .select(where)
        .append('svg')
        .attr('width', `${mapHeight}px`)
        .attr('height', `${mapWidth}px`)
        .style('border', '1px solid black')
        .append('g');

      const myProj = d3
        .geoMercator()
        .center([6.0, 51.5])
        .scale(3500)
        .translate([mapWidth / 2, mapHeight / 2]);

      const svgpath = d3.geoPath().projection(myProj);
      //to load a file successfully it's coordinates should be transfered to wgs84 4326
      const map = await d3.json('data/Mun-2.geojson');
      mapsvg
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', 'white')
        .style('stroke', 'rgb(250, 200, 250)')
        .style('stroke-width', 2)
        //mouse events
        .on('mouseover', function(d, i) {
          d3.select(this).style('fill', 'red');
        })
        .on('mouseout', function(d, i) {
          d3.select(this).style('fill', 'white');
        })
        .on('click', clickHandler);
    };

    //mouse events functions
    const mouseOverHandler = (d, i) => {
      // d3.select(this).style('fill', 'red')
    };

    const clickHandler = () => {
      //1- remove the main map
      //2- change it to the up left
      //3- draw a new small map
      //4- draom a new map for the next level, based on the selected polygone
      console.log('click');

      d3.select(this.thismap.current).selectAll('path').remove();
      // mapsvg
      //   .append('rect')
      //   .attr('width', `${20}px`)
      //   .attr('height', `${20}px`)
      //   .style('border', '1px solid black')
      //   .attr('transform', `translate(${0}, ${0})`);
    };

    const mouseOutHandler = () => {
      console.log('mouseout');
    };

    // asynchronously load geojson:
    //reading data

    // console.log(map.features);
    const removeMap = (where) => {
      d3.select(where).selectAll('path').remove();
    };
    provinceMap();
  }

  render() {
    return (
      <div>
        <p>this is the map mun section</p>
        <div ref={this.thismap}></div>
      </div>
    );
  }
}

export default MunicipalityMap;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
