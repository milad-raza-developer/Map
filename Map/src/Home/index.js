import React, { useState } from 'react';
import * as ResturantData from "../Data/Resturants.json";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import './style.css'

function Map() {
  const [selectedResturant, setSelectedResturant] = useState(null);
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: -33.948533, lng: 151.257187 }}
    >
      {ResturantData.features.map(resturant => (
        <Marker
          key={resturant.properties.KEY}
          position={{
            lat: resturant.geometry.coordinates[1],
            lng: resturant.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedResturant(resturant)

          }}
          icon={{
            url: "https://enuguwifi.com/r.ico",
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      ))}
      {selectedResturant && (
        <div className="rightPannel">
          <div className="banner">
            <span className="banner-heading">{selectedResturant.properties.NAME}</span>
            <span className="bar"></span>
            <span><img src={selectedResturant.properties.PICTURE} alt="Resturant Image" style={{ width: '100%', height: '400px' }} /></span>
          </div>
        </div>
        
      )}
    </GoogleMap>
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map));


export default class Home extends React.Component {
  state = {
    done: undefined
  }
  componentDidMount = () => {
    localStorage.setItem("key", 1)

    setTimeout(() => {
      this.setState({ done: true })
    }, 1200);

  }
  render() {
    return (
      <div className="wrapper">
        <div id="map" style={{ width: "100%", height: "100vh" }}>
          {!this.state.done ? (
            <div className="loader"></div>
          ) : (
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB41MGf9yFFTie-f-Liwg6-_IuVVX9BeKg`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            )}
        </div>
      </div >
    )
  }
}
