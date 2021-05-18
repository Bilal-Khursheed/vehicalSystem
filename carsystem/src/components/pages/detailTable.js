import React, { Component } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
class tableContect extends Component {
  constructor(props) {
    super(props);
  this.state = {
    tableData: [],
    loading: true
  };
}
  async componentDidMount(){
    console.log("working.....")
    let groupId = this.props.groupId || 2;
    let data =  await axios.get(`http://localhost:4000/api/detials?assignType=${groupId}`);
    console.log(data.data.data.arrOfObj)
    this.setState({
      tableData:data.data.data.arrOfObj,
      loading: false
    })

  }
  render() {
    return (
      <div style={{ marginTop: "28%" }}>
 <LoadingOverlay active={this.state.loading} spinner={true} text="Loading your content...">
        <hr></hr>
        <div class="container">
          <h2>Detial Table</h2>
          <p>
            
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>NO</th>
                <th>ID</th>
                <th>Average Speed</th>
                <th>Mileage (kms)</th>
                <th>Fuel Consumption</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((item, index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{item.objectName}</td>
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
