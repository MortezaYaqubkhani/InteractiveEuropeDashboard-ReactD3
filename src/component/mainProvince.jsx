import React, {Component, createRef} from 'react';
import * as d3 from 'd3';
import * as turf from '@turf/turf';

class MainProvince extends Component {
  constructor(props) {
    super(props);
    // this.mouseOver = this.MouseOver.bind(this);
  }
  resizeObserver = null;
  thismap = createRef();
  state = {cit: ''};
  async componentDidMount(error, info) {
    
    const mouseOver = (city, tooltip) => {
      console.log('tol');
      tooltip.style('visibility', 'visible').text(city);
    };

    const mouseMove = (i, city, tooltip) => {
      tooltip
        .style('top', i.clientY - 10 + 'px')
        .style('left', i.clientX + 10 + 'px')
        .text(city);
    };

    const mouseOut = (tooltip) => {
      tooltip.style('visibility', 'hidden');
    };

    const handleClick = (city, tooltip) => {
      // provinceName(province);
      tooltip.style('visibility', 'hidden');
      this.props.cityName(city);
    };

    const handle = (name) => {
      console.log(name);
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

    var svgpath = d3.geoPath().projection(projection);

    const map = await d3.json('data/overijssel.json');
    projection.fitSize([height, width], map);

    const data = [
      {a: 'b', c: 1},
      {a: 'b', c: 1},
      {a: 'b', c: 1},
      {a: 'b', c: 1},
    ];

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
        console.log(i.properties.gm_naam);
        mouseOver(i.properties.gm_naam, tooltip);
        // console.log(x('Russia'))
      })
      .on('mousemove', (i, d) => {
        mouseMove(i, d.properties.gm_naam, tooltip);
      })
      .on('mouseout', function (d, i) {
        d3.select(this).style('fill', 'rgb(30, 10, 10)');
        mouseOut(tooltip);
      })
      .on('click', function (d, i) {
        handleClick(i.properties.gm_naam, tooltip);
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

  // handleMouseOver = (name, tool) => {
  //   this.mouseOver(name, tool);
  // };

  // handleclick = (name) => {
  //   this.props.cityName(name);
  // };

  // handle = (name) => {
  //   console.log(name);
    
  // };
  render() {
    return <div ref={this.thismap}></div>;
  }
}

export default MainProvince;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
