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
      stores: [],
      loading: true,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.groupId !== this.props.groupId) {
      this.setState({
        loading: true,
      });
      this.updateMap();
    }
  }
  updateMap = async () => {
    var groupId = this.props.groupId || 2,
      valueArry = [];
    console.log("working.....");
    let data = await axios.get(
      `http://localhost:4000/api/map?assignType=${groupId}`
    );

    // console.log(data.data);
    data.data.data.map((item) => {
      var str = String(item.lastGPS).split(";");
      let obj = {
        latitude: parseFloat(str[0]),
        longitude: parseFloat(str[1]),
        name: item.objectName,
      };
      return (valueArry = [...valueArry, obj]);
    });
    // console.log(this.props.groupId, valueArry);
    this.setState({
      stores: valueArry,
      loading: false,
    });
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateMap();
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  displayMarkers = () => {
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
            style={mapStyles}
            initialCenter={{ lat: -19.8098866, lng: 34.8344816 }}
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
