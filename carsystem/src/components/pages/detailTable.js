import React, { Component } from "react";
import axios from "axios";
class tableContect extends Component {
  state = {
    tableData: []
  };
  async componentDidMount(){
    console.log("working.....")
    let groupId = 2;
    let data =  await axios.get(`http://localhost:4000/api/detials?assignType=${groupId}`);
    console.log(data.data.data.arrOfObj)
    this.setState({
      tableData:data.data.data.arrOfObj
    })

  }
  render() {
    return (
      <div style={{ marginTop: "28%" }}>
 
        <hr></hr>
        <div class="container">
          <h2>Detial Table</h2>
          <p>
            
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Average Speed</th>
                <th>Mileage (kms)</th>
                <th>Fuel Consumption</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map((item)=>(
              <tr>
                <td>{item.id}</td>
                <td>{item.speedAverage}</td>
                <td>{item.mileage}</td>
                <td>{item.fuelConsumptionDeviationPer100km}</td>
                
              </tr>
              ))}
              {/* <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default tableContect;
