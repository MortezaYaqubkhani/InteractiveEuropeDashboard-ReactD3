import React, {Component, createRef} from 'react';
import * as d3 from 'd3';

class MunicipalityMap extends Component {
  constructor(props) {
    super(props);
  }
  resizeObserver = null;
  thismap = createRef();
  state = {};
  async componentDidMount(error, info) {
    //reading map data
    // d3.json('data/Mun-2.geojson')
    //   .then(function (data) {
    //     const map = data;
    //     console.log(typeof map);
    //     console.log(map);
    //     return map;
    //   })
    //   .catch((err) => console.log(err.message));

    if ('ResizeObserver' in window) {
      this.observe(ResizeObserver);
    } else {
      import('resize-observer-polyfill').then(this.observe);
    }
    // };
    // readingMapData('data/overijssel.json', function (mapp) {
    //   console.log(mapp.features);
    // });
    // readingMapData();
    // console.log(mmap.features);
    // console.log(readingMapData())
    // const mapp = readingMapData();
    // console.log(mapp.features)

    const width = 400;
    const height = 400

    // const provinceMap = async (
    //   where = this.thismap.current,
    //   height = mapHeight,
    //   width = mapWidth
    // ) => {
    //   console.log('this is province map');
      const mapsvg = d3
        .select(this.thismap.current)
        .append('svg')
        .attr('width', `${height}px`)
        .attr('height', `${width}px`)
        .style('border', '1px solid black')
        .append('g');

      const myProj = d3
        .geoMercator()
        .center([6.0, 51.5])
        .scale(3500)
        .translate([width / 2, height / 2]);

      const svgpath = d3.geoPath().projection(myProj);
      //to load a file successfully it's coordinates should be transfered to wgs84 4326
      const map = await d3.json('data/overijssel.json');
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
        .on('mouseover', function (d, i) {
          d3.select(this).style('fill', 'red');
        })
        .on('mouseout', function (d, i) {
          d3.select(this).style('fill', 'white');
        });
      // provinceMap();
      console.log(width)
    };
  
  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  observe = (RO) => {
    this.resizeObserver = new RO((entries) => {
      const {width, height, top, right, bottom, left} = entries[0].contentRect;
      this.setState({width, height, top, right, bottom, left});
    });

    if (this.thismap.current) {
      this.resizeObserver.observe(this.thismap.current);
    }
  };

  render() {
    return (
      
        <div ref={this.thismap}></div>
      
    );
  }
}

export default MunicipalityMap;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
