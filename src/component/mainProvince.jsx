import React, {Component, createRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';

class MainProvince extends Component {
  constructor(props) {
    super(props);
  }
  resizeObserver = null;
  thismap = createRef();
  state = {cit: ''};
  async componentDidMount(error, info) {
    // this.props.cityName('Enschede')
    //reading map data
    // d3.json('data/Mun-2.geojson')
    //   .then(function (data) {
    //     const map = data;
    //     console.log(typeof map);
    //     console.log(map);
    //     return map;
    //   })
    //   .catch((err) => console.log(err.message));
    const handle = (name) => {
      console.log(name);
      this.props.cityName(name);
    };
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

    const width = this.props.width;
    const height = this.props.height;

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

    var svgpath = d3.geoPath().projection(projection)

    const map = await d3.json('data/overijssel.json');
    projection.fitSize([height, width], map);


    const data = [{a: 'b', c: 1}, {a: 'b', c: 1}, {a: 'b', c: 1}, {a: 'b', c: 1}]
    
    // const x = d3.scaleBand()
    // .domain(data.map(d => d.a))
    // .range([10, width - 10])
    // .padding(0.1)

    // console.log(x)




    mapsvg
      .selectAll('path')
      .data(map.features)
      .enter()
      // for each d create an svgpath that uses the geoPath generator:
      .append('path')
      //   .attr('class', 'municipality')
      .attr('d', svgpath)
      .style('fill', 'rgb(30, 10, 10)')
      .style('stroke', 'white')
      .style('stroke-width', 1)
      //mouse events
      .on('mouseover', function (d, i) {
        d3.select(this).style('fill', 'rgb(60, 60, 60)');
        // console.log(x('Russia'))
        
      })
      .on('mouseout', function (d, i) {
        d3.select(this).style('fill', 'rgb(30, 10, 10)');
      })
      .on('click', function (d, i) {
        console.log(i.properties.gm_naam);
        handle(i.properties.gm_naam)
      });

    // provinceMap();
    console.log(map.features);
  }

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

  handleclick = (name) => {
    this.props.cityName(name);
  };
  handle = (name) => {
    console.log(name);
    this.handleclick(name);
  };
  render() {
    return <div ref={this.thismap}></div>;
  }
}

export default MainProvince;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
