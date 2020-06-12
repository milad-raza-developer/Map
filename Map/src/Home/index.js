import React, { useState } from 'react';
import * as ResturantData from "../Data/Resturants.json";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Media from 'react-media';
import './style.css';
import Gif from '../images/animation.gif'

function Map() {
  const [selectedResturant, setSelectedResturant] = useState(ResturantData.features[0]);
  const [selectedZoom, setSelectedZoom] = useState(11.5);
  const [selectedMarker, setSelectedMarker] = useState({ lat: ResturantData.features[0].geometry.coordinates[1], lng: ResturantData.features[0].geometry.coordinates[0] })
  return (
    <GoogleMap

      zoom={selectedZoom}
      center={selectedMarker}
      mapTypeId={'satellite'}
    >
      {ResturantData.features.map(resturant => (
        <Marker
          position={{
            lat: resturant.geometry.coordinates[1],
            lng: resturant.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedResturant(resturant)
            setSelectedZoom(15)
            setSelectedMarker({ lat: resturant.geometry.coordinates[1], lng: resturant.geometry.coordinates[0] })

          }}
          icon={{
            url: "https://enuguwifi.com/r.ico",
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      ))}
      {selectedResturant && (
        <Media query={{ maxWidth: 1100 }}>
          {matches =>
            matches ? (
              <div className="mdq-rightpannel">
                <div className="mdq-banner">
                    <span className="mdq-banner-heading">{selectedResturant.properties.NAME}</span>
                    <button className="mdq-banner-btn" id="allRestBtn" onClick={() => {
                      setSelectedZoom(11.5);
                      setSelectedMarker({ lat: ResturantData.features[0].geometry.coordinates[1], lng: ResturantData.features[0].geometry.coordinates[0] })
                    }}>
                      All Resturants
                    </button>
                  <span className="bar"></span>
                  <span><img src={selectedResturant.properties.PICTURE} alt="Resturant Image" style={{ width: '100%', height: '400px' }} /></span>
                </div>
              </div>
            ) : (
                <div className="rightPannel">
                  <div className="banner">
                    <span className="banner-heading">{selectedResturant.properties.NAME}</span>
                    <span className="bar"></span>
                    <span><img src={selectedResturant.properties.PICTURE} alt="Resturant Image" style={{ width: '100%', height: '400px' }} /></span>
                    <button className="banner-btn" id="allRestBtn" onClick={() => {
                      setSelectedZoom(11.5);
                      setSelectedMarker({ lat: ResturantData.features[0].geometry.coordinates[1], lng: ResturantData.features[0].geometry.coordinates[0] })

                    }}>
                      Show All Resturants
              </button>
                  </div>
                </div>
              )
          }
        </Media>


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

    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    setTimeout(() => {
      this.setState({ done: true })
    }, 7000);

  }
  render() {
    return (
      <div className="wrapper">
        <div id="map" style={{ width: "100%", height: "100vh", backgroundRepeat: "no-repeat" }}>
          {!this.state.done ? (
            <div><img src={Gif} alt={"not running"} className="gif"/></div>
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

