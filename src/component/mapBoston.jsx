import React, {Component} from 'react';
import * as d3 from 'd3';

class MapBoston extends Component {
  componentDidMount(error, info) {
    const bosNeighborhoods = d3.json(
      'https://gist.githubusercontent.com/jdev42092/5c285c4a3608eb9f9864f5da27db4e49/raw/a1c33b1432ca2948f14f656cc14c7c7335f78d95/boston_neighborhoods.json'
    );
    console.log(bosNeighborhoods);
    console.log(bosNeighborhoods.features);

    const height = 580;
    const width = 700;
    //basic svg definition
    const svg = d3
      .select(this.refs.thismapp)
      .append('svg')
      .attr('width', height)
      .attr('height', width)
      .style('border', '2px solid black');
    //group svgs
    let g = svg.append('g');
    //projection definition
    const bosProjection = d3
      .geoAlbers()
      .geoEquirectangular()
      .rotate([71.057, 0])
      .center([0, 42.313])
      .translate([width / 2, height / 2]);
    // Create GeoPath function that uses built-in D3 functionality to turn
    // lat/lon coordinates into screen coordinates
    let bos_geoPath = d3.geoPath().projection(bosProjection);
    // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
    g.selectAll('path') //this week using paths instead of "rects" to create bar charts
      .data(bosNeighborhoods.features) //using .features to bind the data this time. GeoJSON that is an object that has two features, features are what we actually want to access the array of objects
      .enter() //this then propogates into our group
      .append('path') //path per geoemtry
      .attr('fill', '#ccc') //then applying a fill color. can be hex colors or actual colors
      .attr('stroke', '#333') //defining the stroke color, in this case black
      .attr('d', bos_geoPath); //this element d is different from stuff from last week. this week just adding an attribute called d that corresponds to each element. will draw each of the states. it's a black box for us, will loop through for us wihtout us having to create a for loop
  }

  render() {
    return (
      <div>
        <p>this is the map section</p>
        <div ref="thismapp"></div>
      </div>
    );
  }
}

export default MapBoston;
