import React, { Component } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
class tableContect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      loading: true,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.groupId !== this.props.groupId) {
      this.setState({
        loading: true,
      });
      this.updateTable();
    }
  }
  updateTable = async () => {
    console.log("working.....");
    let groupId = this.props.groupId || 2;
    let seconddata = await axios.get('https://sheetdb.io/api/v1/7i3xr5c1f4kma');
    let data = await axios.get(
      `http://localhost:4000/api/detials?assignType=${groupId}`
    );
    console.log(seconddata.data);
    this.setState({
      tableData: data.data.data.arrOfObj,
      loading: false,
    });
  };
  async componentDidMount() {
    this.updateTable();
  }
  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.loading}
          spinner={true}
          text="Loading your content..."
        >
          <div class="container mb-5">
            <h2>Detial Table</h2>
            <p></p>
            <table class="table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>ID</th>
                  <th>Receival</th>
                  <th>Discharge</th>
                  <th>Load</th>
                  <th>Average Speed</th>
                  <th>Mileage (kms)</th>
                  <th>Fuel Consumption</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.objectName}</td>
                    <td>{item.Receival}</td>
                    <td>{item.Discharge}</td>
                    <td>{item.Load}</td>
                    <td>{item.speedAverage}</td>
                    <td>{item.mileage}</td>
                    <td>{item.fuelConsumptionDeviationPer100km}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

export default tableContect;
