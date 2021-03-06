import React, {Component, createRef} from 'react';
import * as d3 from 'd3';

class Map extends Component {
  constructor(props) {
    super(props);
    this.thismap = React.createRef();
  }
  componentDidMount(error, info) {
    //reading map data
    d3.json('data/overijssel.json')
      .then(function (data) {
        const map = data;
        console.log(typeof map);
        console.log(map);
        return map;
      })
      .catch((err) => console.log(err.message));

    // };
    // readingMapData('data/overijssel.json', function (mapp) {
    //   console.log(mapp.features);
    // });
    // readingMapData();
    // console.log(mmap.features);
    // console.log(readingMapData())
    // const mapp = readingMapData();
    // console.log(mapp.features)
    const mapWidth = 600,
      mapHeight = 1200;

    // A function to set the projection
    const coordProjection = (
      translateX,
      translateY,
      scale = 27000,
      lat = 6,
      long = 52.5
    ) => {
      const myProjection = d3
        .geoMercator()
        .center([lat, long])
        .scale(scale)
        .translate([translateX, translateY]);
      return d3.geoPath().projection(myProjection);
    };

    const provinceMap = async (
      where = this.thismap.current,
      height,
      width,
      scale
    ) => {
      console.log('this is province map');

      let mapsvg2 = d3
      .select(where)
      .append('svg')
      .attr('width', `300px`)
      .attr('height', `300px`)
      .attr('transform', `translate(0, -10)`)
      .style('border', '2px solid black')
      .append('g')


      let mapsvg = d3
        .select(where)
        .append('svg')
        .attr('width', `${mapHeight}px`)
        .attr('height', `${mapWidth}px`)
        .style('border', '2px solid black')
        .append('g');

      let svgpath = coordProjection(mapWidth, mapHeight / 2 - 300);
      let svgpath1 = coordProjection(50, 80, 7000);
      const map = await d3.json('data/overijssel.json');

      let prov = mapsvg
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
        .on('mouseover', function (d, i) {
          d3.select(this).style('fill', 'red');
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'white');
        })

        .on('click', function (d, i) {
          //the layer shoud be off

          //this remove works but not perfect, and it works good to remove all the shapes
          // mapsvg.selectAll('path').remove();
          prov.remove();
          //this also works to change the whole color of the shape
          // mapsvg.selectAll('path').transition().style('fill', 'red');

          // .style('border', '20px solid black')
          //   .attr('width', `1000px`)
          // .attr('height', `1000px`)

          svgpath = coordProjection(50, 80, 7000);
          // const mapsvg = d3
          // .select(where)
          // .append('svg')
          // .attr('width', `${mapHeight}px`)
          // .attr('height', `${mapWidth}px`)
          // .style('border', '1px solid black')
          // .append('g');
          let mapsvg = d3
            .select(where)
            .append('svg')
            .attr('width', `200px`)
            .attr('height', `300px`)
            .style('border', '2px solid black')
            .append('g')
            .selectAll('path')
            .data(map.features)
            .enter()
            // for each d create an svgpath that uses the geoPath generator:
            .append('path')
            //   .attr('class', 'municipality')
            .attr('d', svgpath)
            .style('fill', 'white')
            .style('stroke', 'rgb(250, 200, 250)')
            .style('stroke-width', 2);

          // mapsvg.transition()
          // .duration(500).style('fill', 'white')
          //redraw the same layer in other place with the smaller scale
          // d3.select(this).scale(5000);
        });
      let mapsvg1 = d3
        .select(where)
        .append('svg')
        .attr('width', `200px`)
        .attr('height', `300px`)
        .attr('transform', `translate(0, -10)`)
        .style('border', '2px solid black')
        .append('g')
        .selectAll('path')
        .data(map.features)
        .enter()
        // for each d create an svgpath that uses the geoPath generator:
        .append('path')
        //   .attr('class', 'municipality')
        .attr('d', svgpath)
        .style('fill', 'white')
        .style('stroke', 'rgb(250, 200, 250)')
        .style('stroke-width', 2);
    };

    //mouse events functions
    const mouseOverHandler = (d, i) => {
      console.log('mouseover');
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
        <p>this is the map section</p>
        <div ref={this.thismap}></div>
      </div>
    );
  }
}

export default Map;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
