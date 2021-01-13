import React, {Component, createRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import datamap from './component/data/overijssel.json';
import datamap1 from './component/data/geoserver.json';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import Map from './component/map';
import MapBoston from './component/mapBoston';
import Map2 from './component/data/map2';
import MunicipalityMap from './component/municipalityMap';

// for measuring size of the window
const measureElement = (element) => {
  const DOMNode = ReactDOM.findDOMNode(element);
  return {
    width: DOMNode.offsetWidth,
    height: DOMNode.offsetHeight,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  resizeObserver = null;
  resizeSubject = createRef();
  state = {
    worldData: {},
    country: {name: '', data: ''},
    province: {name: '', data: ''},
    city: {name: '', data: ''},
    //for screen size
    contentHeight: 0,
    contentWidht: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  componentDidMount(error, info) {
    //loading the world map data
    d3.json('component/data/overijssel.json')
      .then(function (data) {
        // const map = data;
        console.log(data);
        // console.log(typeof map);
        // console.log(map);
        // return map;
      })
      .catch((err) => console.log(err.message));
    this.setState({worldData: datamap1});
    // async function loadWorldData() {
    //   return await d3.json('component/data/overijssel.json');
    // }
    // this.setState({worldData: loadWorldData()});
    // console.log(this.state.worldData);
    this.content &&
      this.setState({
        contentHeight: measureElement(this.content).height,
        contentWidht: measureElement(this.content).width,
      });
    console.log(this.state.contentHeight);
    if ('ResizeObserver' in window) {
      this.observe(ResizeObserver);
    } else {
      import('resize-observer-polyfill').then(this.observe);
    }
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

    if (this.resizeSubject.current) {
      this.resizeObserver.observe(this.resizeSubject.current);
    }
  };

  render() {
    console.log(this.state.contentHeight);
    return (
      <div className="App">
        <Container className="border" border="primary">
          <Row>
            <Col xs={3}>
              <Row className="border small" ref={this.resizeSubject}>
                {this.state.width} x {this.state.height}
              </Row>
              <Row className="border small">Country</Row>
              <Row className="border small">Province</Row>
            </Col>
            <Col
              className="border world"
              xs={9}
              ref={(r) => (this.content = r)}
            >
              {this.state.contentWidht}
            </Col>
          </Row>
          <Row className="border">
            <Col className="border small" xs={3}>
              Country
            </Col>
            <Col className="border small" xs={3}>
              province
            </Col>
            <Col className="border small" xs={3}>
              City
            </Col>
            <Col className="border small" xs={3} border="primary">
              City-map
            </Col>
          </Row>
        </Container>
        <div className="world">{/* <Map data={this.state.worldData} /> */}</div>
        {/* <Map2 data={this.state.worldData} />
        <MunicipalityMap />
        <MapBoston /> */}
      </div>
    );
  }
}

export default App;
