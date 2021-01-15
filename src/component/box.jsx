import React, {Component, createRef} from 'react';
import * as d3 from 'd3';

class Box extends Component {
  constructor(props) {
    super(props);
  }
  resizeObserver = null;
  thismap = createRef();
  state = {};
  async componentDidMount(error, info) {
    if ('ResizeObserver' in window) {
      this.observe(ResizeObserver);
    } else {
      import('resize-observer-polyfill').then(this.observe);
    }
    async function Read() {}
    const width = 400
    const height = 400

    const mapsvg = d3
      .select(this.thismap.current)
      .append('svg')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`)
      .style('border', '3px solid black')
      .append('g');
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

  render() {
      console.log(this.state.height, this.state.width)
    return (
      
        <div ref={this.thismap} className="border border-dark">{this.mapsvg}</div>
      
    );
  }
}

export default Box;

//the next plan would be to add a mep of netherlands and assign it to the whole picture
