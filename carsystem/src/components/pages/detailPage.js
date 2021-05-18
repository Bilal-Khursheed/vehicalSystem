import React, { Component } from "react";
import MapContainer from "./mapPage";
import TableContect from "./detailTable";

class detailPage extends Component {
  state = {
    groupId: 2
  };
  render() {
    return (
      <div>
        <div>
        <MapContainer groupId= {this.state.groupId}/>
        </div>
        <hr></hr>
        <div>
        <select
                className=""
              >
                <option>Choose a Group</option>
                <option value="1">QC1</option>
                <option value="2">QC2</option>
                <option value="3">QC3</option>
                <option value="4">QC4</option>
                <option value="5">landSide</option>
                <option value="6">houseKeeping</option>
                <option value="7">Rail</option>
              </select>
          </div><div>
        <TableContect groupId= {this.state.groupId}/>
        </div>
      </div>
    );
  }
}

export default detailPage;
