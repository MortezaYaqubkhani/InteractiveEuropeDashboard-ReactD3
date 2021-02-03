import React, {Component, createRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import datamap from './component/data/overijssel.json';
import datamap1 from './component/data/geoserver.json';
import Box from './component/box';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import Map from './component/map';
import MapBoston from './component/mapBoston';
import Map2 from './component/data/map2';
import MunicipalityMap from './component/municipalityMap';
import Boxfunction from './component/boxfunction';
import Boxfunction1 from './component/boxfunction1';
import SmallProvince from './component/smallProvince';
import MainWorld from './component/MainWorld';
import SmallWorld from './component/smallWorld';
import MainCountry from './component/mainCountry';

class App extends Component {
  constructor(props) {
    super(props);
  }
  resizeObserver = null;
  resizeSubject = createRef();
  state = {
    mainWindow: 'worldMap',
    worldData: {},
    country: '',
    province: {over: '', select: '', data: ''},
    city: {over: '', select: '', data: ''},
    // city: {name: '', data: ''},
    nameofcity: '',
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
    // this.content &&
    //   this.setState({
    //     contentHeight: measureElement(this.content).height,
    //     contentWidht: measureElement(this.content).width,
    //   });
    // console.log(this.state.contentHeight);
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

  handleCity = (city) => {
    this.setState({nameofcity: city});
  };

  handleCountry = (country) => {
    country = country;
    this.setState({country});
    console.log(country);
    //to change the main window map
    this.setState({mainWindow: 'countryMap'});
    // this.setState({nameofcity: city});
  };

  handleSmallWorld = (country) => {
    //set the main window
    this.setState({mainWindow: 'worldMap'});
    //earse the small world window
    this.setState({country: ''});
    // this.setState({nameofcity: city});
  };

  render() {
    const window = {width: this.state.width, height: this.state.height};
    const country = this.state.country;
    const mainWindow = this.state.mainWindow;
    const mWidth = 490;
    const mHeight = 520;
    const sWidth = 170;
    const sHeight = 160;

    return (
      <div className="App">
        <Container
          className="container border"
          border="primary"
          ref={this.resizeSubject}
        >
          <Row>
            <Col id="small-maps" xs={3}>
              <Row id="world-small-map" className="border small">
                {country ? (
                  <SmallWorld
                    handleClick={this.handleSmallWorld}
                    country={country}
                    width={sWidth}
                    height={sHeight}
                  />
                ) : (
                  <p></p>
                )}
                {/* <MunicipalityMap window={window.width/4, window.height/4} />

                <Boxfunction1
                  city={this.state.nameofcity}
                  height={1}
                  width={window.width / 4}
                /> */}
              </Row>
              <Row id="country-small-map" className="border small">
                {/* <Boxfunction height={this.height/4} width={window.width/4} /> */}
                {country === 'Netherlands' ? <p>Netherlands</p> : <p>another</p>}
              </Row>
              <Row id="province-small-map" className="border small">
                <SmallProvince
                  city={this.state.nameofcity}
                  height={1}
                  width={window.width / 4}
                />
              </Row>
            </Col>
            <Col className="border world" xs={9}>
              {mainWindow === 'worldMap' ? (
                <MainWorld
                  height={mHeight}
                  width={mWidth}
                  countryName={this.handleCountry}
                />
              ) : mainWindow === 'countryMap' ? (
                <MainCountry
                  height={mHeight}
                  width={mWidth}
                  country={country}
                  
                />
              ) : (
                <MunicipalityMap cityName={this.handleCity} />
              )}
            </Col>
          </Row>

          <Row className="border">
            <Col className="border small" xs={3}>
              {this.state.nameofcity}
            </Col>
            <Col className="border small" xs={3}>
              province
            </Col>
            <Col className="border small" xs={3}>
              {window.height}
            </Col>
            <Col className="border small" xs={3} border="primary">
              {window.width}
            </Col>
          </Row>
        </Container>

        {/* <Map2 data={this.state.worldData} />
        <MunicipalityMap />
        <MapBoston /> */}
      </div>
    );
  }
}

export default App;
