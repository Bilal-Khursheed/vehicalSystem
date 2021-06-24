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
    if (prevProps.groupId !== this.props.groupId ||prevProps.startDate !== this.props.startDate ) {
      this.setState({
        loading: true,
      });
      this.updateTable();
    }
  }
  updateTable = async () => {
    let groupId = this.props.groupId || 2;
    let data = await axios.get(
      `http://localhost:4000/api/detials?assignType=${groupId}&&startDate=${this.props.startDate}&&endDate=${this.props.endDate}`
    );
    this.setState({
      tableData: data.data.data.arrOfObj,
      loading: false,
    });
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateTable();
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <LoadingOverlay
          active={this.state.loading}
          spinner={true}
          text="Loading your content..."
        >
          <div class=" mb-5 ml-4 mr-4">
            <h2>Detial Table</h2>
            <p></p>
            <table class="table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Object Name</th>
                  <th>Delivery</th>
                  <th>Receival</th>
                  <th>Discharge</th>
                  <th>Load</th>
                  <th>Rail Discharge</th>
                  <th>Rail Load</th>
                  <th>Yard Move</th>
                  <th>Yard Shift</th>
                  <th>Total Moves</th>
                  <th>Average Speed</th>
                  <th>Mileage (kms)</th>
                  <th>Fuel Consumption</th>
                  <th>EngineIdlingTime</th>
                  <th>engineOperationTime</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData && this.state.tableData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.objectName}</td>
                    <td>{item.Delivery}</td>
                    <td>{item.Receival}</td>
                    <td>{item.Discharge}</td>
                    <td>{item.Load}</td>
                    <td>{item.railDischarge}</td>
                    <td>{item.RailLoad}</td>
                    <td>{item.yardMove}</td>
                    <td>{item.yardShift}</td>
                    <td>{item.totalMoves}</td>
                    <td>{item.speedAverage}</td>
                    <td>{item.mileage}</td>
                    <td>{item.fuelConsumptionActual}</td>
                    <td>{item.engineIdlingTime}</td>
                    <td>{item.engineOperationTime}</td>
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
