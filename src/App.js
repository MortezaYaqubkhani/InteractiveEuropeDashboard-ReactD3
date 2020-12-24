import React from 'react';
import './App.css';

import Map from './component/map';
import MapBoston from './component/mapBoston';
import Map2 from './component/data/map2';
import MunicipalityMap from './component/municipalityMap';

function App() {
  return (
    <div className="App">
      <Map />
      <Map2 />
      <MunicipalityMap />
      {/* <MapBoston /> */}
    </div>
  );
}

export default App;
