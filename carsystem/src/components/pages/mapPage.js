import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
const mapStyles = {
  position: "fixed",
  width: "100%",
  height: "100%",
};
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        // { lat: 47.49855629475769, lng: -122.14184416996333 },
        // { latitude: 47.359423, longitude: -122.021071 },
        // { latitude: 47.2052192687988, longitude: -121.988426208496 },
        // { latitude: 47.6307081, longitude: -122.1434325 },
        // { latitude: 47.3084488, longitude: -122.2140121 },
        // { latitude: 47.5524695, longitude: -122.0425407 },
      ],
      loading: true
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.groupId !== this.props.groupId) {
      this.setState({
        loading: true
      })
      this.updateMap()
    }
  }
  updateMap = async () => {
    var groupId = this.props.groupId || 2,
      valueArry = [];
    let data = await axios.get(
      `http://localhost:4000/api/map?assignType=${groupId}`
    );

    console.log(data.data);
    data.data.data.map((item) => {
      var str = String(item.lastGPS).split(";");
      let obj = {
        longitude: parseFloat(str[0]),
        latitude: parseFloat(str[1]), //latitude
        name: item.address,
      };
      return (valueArry = [...valueArry, obj]);

      // console.log("data is ", String(item.lastGPS).split(";"))
    });
    console.log(this.props.groupId, valueArry);
    this.setState({
      stores: valueArry,
      loading: false
    });
  };
  componentDidMount() {
    this.updateMap()
  }
  displayMarkers = () => {
    console.log("hebflasibsf", this.state.stores);
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          title={store.name}
          name={"SOMA"}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          //   onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <div style={{ margin: "0" }}>
        <LoadingOverlay
        active={this.state.loading}
        spinner={true}
        text="Loading your map..."
      >
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles} //-19.8098866
          initialCenter={{ lat: 34.8344816, lng: -19.8098866 }}
        >
          {this.displayMarkers()}
        </Map>
        <div className="" style={{ height: "390px" }}></div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBLkwdLc1sWrx1fDiHLGf08UjawQR2632g",
})(MapContainer);
