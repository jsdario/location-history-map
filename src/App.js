import React, { Component } from "react"
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl"
import DeckGL, { LineLayer, GridLayer } from "deck.gl"

import logo from "./logo.svg"
import "./App.css"

const locations = require("./location_history").locations
const locationHistory = locations.filter(
  (item, i) => i % Math.floor(locations.length / 300) === 0
)

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZnJhbnJpb3MiLCJhIjoiY2pibXM5Z2k5M3I4dTMzbHB4NWJkanNyNSJ9.24SqQxgDaPDZMS2YT51AFA"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { latitude: 40.416775, longitude: -3.70379, zoom: 3.5 } //Madrid location
  }

  onViewportChange(viewport) {
    const { latitude, longitude, zoom } = viewport
    this.setState({ latitude, longitude, zoom })
    // Optionally call `setState` and use the state to update the map.
  }

  render() {
    const { innerWidth: width, innerHeight: height } = window
    const { latitude, longitude, zoom } = this.state

    const viewport = {
      width,
      height,
      longitude,
      latitude,
      zoom,
      pitch: 0,
      bearing: 0
    }

    const data = locations.map(({ longitudeE7, latitudeE7 }) => ({
        position: [longitudeE7 / 1e7, latitudeE7 / 1e7]
      }))
      console.log(data)
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={(vp) => this.onViewportChange(vp)}
        >
          <div style={{ position: "absolute", right: 0, bottom: 0 }}>
            <NavigationControl onViewportChange={(vp) => this.onViewportChange(vp)} />
          </div>
          <DeckGL
            {...viewport}
            layers={[
              new GridLayer({
                id: "grid-layer",
                data,
                cellSize: 5000 / zoom
              })
            ]}
          />
        </ReactMapGL>
      </div>
    )
  }
}

export default App
