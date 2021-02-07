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
import MainProvince from './component/mainProvince';
import Boxfunction from './component/boxfunction';
import Boxfunction1 from './component/boxfunction1';
import SmallProvince from './component/smallProvince';
import MainWorld from './component/MainWorld';
import SmallWorld from './component/smallWorld';
import MainCountry from './component/mainCountry';
import SmallCountry from './component/smallCountry';
import BarChart from './component/barChart';

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
    province: '',
    city: '',
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

  handleProvince = (province) => {
    province = province;
    this.setState({province});
    console.log(province);
    //to change the main window map
    this.setState({mainWindow: 'provinceMap'});
    // this.setState({nameofcity: city});
  };

  handleCity = (city) => {
    city = city;
    this.setState({city});
    console.log(city);
    //to change the main window map
    this.setState({mainWindow: 'cityMap'});
    // this.setState({nameofcity: city});
  };

  handleSmallWorld = () => {
    //set the main window
    this.setState({mainWindow: 'worldMap'});
    //earse the country, province, and city names
    this.setState({country: '', province: '', city: ''});
    // this.setState({nameofcity: city});
  };

  handleSmallCountry = () => {
    //set the main window
    this.setState({mainWindow: 'countryMap'});
    //earse the small world window
    this.setState({province: '', city: ''});
    // this.setState({nameofcity: city});
  };

  render() {
    const window = {width: this.state.width, height: this.state.height};
    const country = this.state.country;
    const province = this.state.province;
    const city = this.state.city;
    const mainWindow = this.state.mainWindow;
    const mWidth = 490;
    const mHeight = 520;
    const sWidth = 170;
    const sHeight = 160;
    const cWidth = 660;
    const cHeight = 160;

    return (
      <div className="App">
        <Container
          className="container border"
          border="primary"
          ref={this.resizeSubject}
        >
          <Row>
            <Col id="small-maps" xs={3}>
              <Row id="world-small-map">
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
              <Row id="country-small-map">
                {country && province ? (
                  <SmallCountry
                    handleClick={this.handleSmallCountry}
                    country={country}
                    province={province}
                    width={sWidth}
                    height={sHeight}
                  />
                ) : (
                  <p>{province}</p>
                )}
              </Row>
              <Row id="province-small-map">
                {city && province && country ? (
                  <SmallProvince
                    province={province}
                    height={sHeight}
                    width={sWidth}
                    city={city}
                    handleClick={this.handleSmallCountry}
                  />
                ) : (
                  <p></p>
                )}
              </Row>
            </Col>
            <Col className="world" xs={9}>
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
                  provinceName={this.handleProvince}
                />
              ) : (
                <MainProvince
                  cityName={this.handleCity}
                  province={province}
                  height={mHeight}
                  width={mWidth}
                />
              )}
            </Col>
          </Row>

          <Row >
            <Col className="chart">
              <BarChart width={cWidth} height={cHeight} />
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
